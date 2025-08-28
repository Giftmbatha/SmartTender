from fastapi import APIRouter, Depends, Query
from app.tenders.service import fetch_tenders
from app.common.plan_restriction import require_feature
from typing import Optional

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
    allowed=Depends(require_feature("can_search"))  #Plan restriction applied
):
    """
    Search tenders with filters.
    Free plan: limited to 3 searches per week.
    Paid plans: unlimited.
    """
    return fetch_tenders(
        keyword, province, submission_deadline, buyer,
        budget_min, budget_max, page, size
    )
