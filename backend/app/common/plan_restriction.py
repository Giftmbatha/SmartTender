from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from app.common.database import get_db
from app.auth import repository
from datetime import datetime, timedelta

def check_search_limit(user_id: str, db: Session = Depends(get_db)):
    user = repository.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    plan = user.team.plan.name if user.team and user.team.plan else "free"

    if plan.lower() == "free":
        # Count searches in the last 7 days
        one_week_ago = datetime.utcnow() - timedelta(days=7)
        search_count = (
            db.query(SearchLog)
            .filter(SearchLog.user_id == user.id, SearchLog.timestamp >= one_week_ago)
            .count()
        )

        if search_count >= 3:
            raise HTTPException(
                status_code=403,
                detail="Free plan limit reached (3 searches per week). Upgrade your plan."
            )
