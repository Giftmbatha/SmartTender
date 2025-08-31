# app/common/plan_restriction.py
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.auth.service import get_current_user
from app.common.database import get_db
from app.auth.models import Plan, User
from app.tenders.models import TenderSearchCache


# Config
FREE_PLAN_LIMIT = 3  
FREE_PLAN_WINDOW_DAYS = 7  # weekly limit


def check_search_limit(db: Session, team_id: str) -> bool:
    """
    Check if a team has exceeded their search limit based on plan.
    Returns True if allowed, False otherwise.
    """
    from app.auth.models import Team  # lazy import to avoid circular import
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team or not team.plan_id:
        raise HTTPException(status_code=400, detail="Team or plan not found.")

    plan = db.query(Plan).filter(Plan.id == team.plan_id).first()
    if not plan:
        raise HTTPException(status_code=400, detail="Plan not found.")

    # Enforce free plan restrictions
    if plan.name.lower() == "free":
        cutoff = datetime.utcnow() - timedelta(days=FREE_PLAN_WINDOW_DAYS)
        searches_count = (
            db.query(TenderSearchCache)
            .filter(
                TenderSearchCache.team_id == team_id,
                TenderSearchCache.created_at >= cutoff
            )
            .count()
        )
        if searches_count >= FREE_PLAN_LIMIT:
            return False  # blocked

    # Paid plans = no limit
    return True


def require_feature(feature_name: str):
    """
    Dependency generator to restrict route access
    based on the user's subscription plan features.
    Example: @router.get("/tenders/export", dependencies=[Depends(require_feature("can_export"))])
    """
    def dependency(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
    ):
        if not current_user.team or not current_user.team.plan_id:
            raise HTTPException(status_code=403, detail="No plan assigned to your team.")

        plan = db.query(Plan).filter(Plan.id == current_user.team.plan_id).first()
        if not plan:
            raise HTTPException(status_code=403, detail="Plan not found.")

        # ✅ NEW: feature map fallback for plans
        # Useful if your Plan model does not have individual feature columns.
        plan_features = {
            "free": {
                "can_ai_summary": False,
                "can_export": False,
                "can_match": False,
            },
            "basic": {
                "can_ai_summary": True,
                "can_export": False,
                "can_match": True,
            },
            "pro": {
                "can_ai_summary": True,
                "can_export": True,
                "can_match": True,
            },
        }

        # If the plan has attributes (columns), check them first
        if hasattr(plan, feature_name):
            if not getattr(plan, feature_name, False):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Your plan does not allow {feature_name.replace('_', ' ')}."
                )
        else:
            # Fallback to static feature map
            plan_name = getattr(plan, "name", "").lower()
            if plan_name not in plan_features or not plan_features[plan_name].get(feature_name, False):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Your plan does not allow {feature_name.replace('_', ' ')}."
                )

        return True

    return dependency
