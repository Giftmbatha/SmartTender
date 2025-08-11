from fastapi import APIRouter, Depends
from app.common.plan_restriction import require_feature

router = APIRouter()

@router.post("/summary/extract")
def extract_summary(allowed=Depends(require_feature("can_ai_summary"))):
    return {"message": "AI Summary generated successfully!"}
