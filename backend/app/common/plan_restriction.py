# app/common/plan_restriction.py

from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.common.database import get_db
from app.common.utils import get_current_user
from app.ai_summarization import models as summarization_models
from app.tenders import models as tender_models


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

        plan = db.query(Plan).filter(Plan.id == team.plan_id).first()
        if not plan or not getattr(plan, feature, False):
            raise HTTPException(status_code=403, detail=f"Feature '{feature}' not available in your plan.")

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
