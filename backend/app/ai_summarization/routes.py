from fastapi import APIRouter, Depends
from app.common.plan_restriction import require_feature

router = APIRouter()

@router.post("/summary/extract")
def extract_summary(allowed=Depends(require_feature("can_ai_summary"))):
    return {"message": "AI Summary generated successfully!"}

@router.post("/summarize")
def summarize_tender(
    tender_id: Optional[str] = None,
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    team_id = current_user.team_id

    # ✅ Plan restriction check
    if not can_summarize(db, team_id):
        raise HTTPException(
            status_code=403,
            detail="Plan limit reached: upgrade your plan for more summaries."
        )

    # Extract text (from file or DB tender)
    extracted_text, metadata = extract_tender_text(tender_id, file)

    # AI Summarization
    ai_summary = run_ai_summary(extracted_text)

    # ✅ Log usage
    log_summary_usage(db, team_id, tender_id)

    # ✅ Build response
    return build_summary_response(extracted_text, ai_summary, metadata)
