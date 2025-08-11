from fastapi import APIRouter, Depends
from app.common.plan_restriction import require_feature

router = APIRouter()

@router.get("/tenders/export")
def export_tenders(allowed=Depends(require_feature("can_export"))):
    return {"message": "Tenders exported successfully!"}
