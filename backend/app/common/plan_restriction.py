# app/common/plan_restriction.py

from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.common.database import get_db
<<<<<<< HEAD
from app.auth.models import Plan, User
from app.tenders.models import TenderSearchCache


# Config
FREE_PLAN_LIMIT = 3  
FREE_PLAN_WINDOW_DAYS = 7  # weekly limit
=======
from app.common.utils import get_current_user
from app.ai_summarization import models as summarization_models
from app.tenders import models as tender_models
>>>>>>> d6ce10c4bae5e682813c354891a0bae0bbef4736


from app.auth.models import Plan

def require_feature(feature: str):
    """
    Returns a dependency that checks if the current user's team plan allows a feature.
    Usage: Depends(require_feature("can_ai_summary"))
    """
    def dependency(
        db: Session = Depends(get_db),
        current_user=Depends(get_current_user),
    ):
        team = current_user.team
        if not team or not team.plan_id:
            raise HTTPException(status_code=403, detail="No plan associated with team.")

<<<<<<< HEAD
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
=======
        plan = db.query(Plan).filter(Plan.id == team.plan_id).first()
        if not plan or not getattr(plan, feature, False):
            raise HTTPException(status_code=403, detail=f"Feature '{feature}' not available in your plan.")
>>>>>>> d6ce10c4bae5e682813c354891a0bae0bbef4736

        return True

    return dependency

def require_search_limit(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """
    Restrict number of searches per week based on user's plan.
    """
    plan = current_user.team.plan if current_user.team else None
    if not plan:
        raise HTTPException(status_code=403, detail="No active plan associated with your team")

    if plan.weekly_search_limit == 0:  # unlimited
        return

    one_week_ago = datetime.utcnow() - timedelta(days=7)
    searches_count = (
        db.query(tender_models.TenderSearchCache)
        .filter(
            tender_models.TenderSearchCache.user_id == current_user.id,
            tender_models.TenderSearchCache.timestamp >= one_week_ago
        )
        .count()
    )

    if searches_count >= plan.weekly_search_limit:
        raise HTTPException(status_code=403, detail="Weekly search limit reached")


def require_ai_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """
    Restrict number of AI summaries per week based on user's plan.
    """
    plan = current_user.team.plan if current_user.team else None
    if not plan:
        raise HTTPException(status_code=403, detail="No active plan associated with your team")

    # Free: 1 summary/week
    # Basic: 5 summaries/week
    # Pro: unlimited
    if plan.summary_limit == 0:  # unlimited
        return

    one_week_ago = datetime.utcnow() - timedelta(days=7)
    summary_count = (
        db.query(summarization_models.SummaryUsage)
        .filter(
            summarization_models.SummaryUsage.user_id == current_user.id,
            summarization_models.SummaryUsage.timestamp >= one_week_ago
        )
        .count()
    )

    if summary_count >= plan.summary_limit:
        raise HTTPException(status_code=403, detail="Weekly summarization limit reached")

    # log usage
    usage = summarization_models.SummaryUsage(user_id=current_user.id)
    db.add(usage)
    db.commit()
