from fastapi import APIRouter, Depends
from app.common.plan_restriction import require_feature

router = APIRouter()

@router.post("/readiness/check")
def readiness_check(allowed=Depends(require_feature("can_readiness_check"))):
    return {"message": "Readiness check completed!"}
