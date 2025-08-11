from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from app.common.database import get_db
from app.common.utils import get_current_user
from app.auth.models import Plan, User

from datetime import datetime, timedelta

def require_feature(feature_name: str, limit_check: bool = False):
    def checker(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
        if not current_user.team or not current_user.team.plan_id:
            raise HTTPException(status_code=403, detail="No plan assigned to your team")

        plan = db.query(Plan).filter(Plan.id == current_user.team.plan_id).first()
        if not plan:
            raise HTTPException(status_code=403, detail="Plan not found")

        if not getattr(plan, feature_name, False):
            raise HTTPException(status_code=403, detail=f"Your plan does not allow {feature_name.replace('_', ' ')}")

        if limit_check and plan.weekly_search_limit is not None:
            # TODO: Implement usage tracking in Redis/PostgreSQL
            searches_used = 0  # Example placeholder
            if searches_used >= plan.weekly_search_limit:
                raise HTTPException(status_code=403, detail="Weekly search limit reached")
        return True
    return checker
