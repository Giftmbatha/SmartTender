from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.tenders import service
from app.common.database import get_db
from app.common.utils import get_current_user
from app.auth.models import User  # or your user model

router = APIRouter(prefix="/api", tags=["Tenders"])

@router.get("/search")
def search_tenders(
    keyword: Optional[str] = Query(None),
    province: Optional[str] = Query(None),
    submission_deadline: Optional[str] = Query(None),
    buyer: Optional[str] = Query(None),
    budget_min: Optional[int] = Query(None),
    budget_max: Optional[int] = Query(None),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
    
):
    """
    Search tenders with caching.
    Cache results per team for 24 hours.
    """
    team_id = current_user.team_id if current_user else None
    if not team_id:
        raise HTTPException(status_code=403, detail="User not assigned to a team")

    filters = {
        "province": province,
        "submission_deadline": submission_deadline,
        "buyer": buyer,
        "budget_min": budget_min,
        "budget_max": budget_max,
        "page": page,
        "size": size,
    }

    # Check cache
    cached = service.get_cached_results(db, team_id, keyword or "", filters)
    if cached:
        return {"source": "cache", "results": cached.results}

    # Fetch fresh data
    results = service.fetch_tenders(
        keyword, province, submission_deadline, buyer, budget_min, budget_max, page, size
    )

    # Save in cache
    service.save_search_results(db, team_id, keyword or "", filters, results)

    return {"source": "api", "results": results}
