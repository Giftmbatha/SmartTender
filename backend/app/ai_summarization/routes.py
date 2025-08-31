from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from uuid import uuid4
from app.common.plan_restriction import require_feature

router = APIRouter(prefix="/ai/summarize", tags=["ai_summarization"])

# Temporary in-memory store (replace with DB/Redis later)
summaries = {}

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    allowed=Depends(require_feature("can_ai_summary"))
):
    # Validate supported file types
    if not file.filename.lower().endswith((".pdf", ".doc", ".docx")):
        raise HTTPException(status_code=400, detail="File not supported")

    # TODO: Extract text + call HuggingFace summarizer here
    summary_id = str(uuid4())
    summaries[summary_id] = {
        "text": "Generated summary goes here...",
        "key_info": {
            "budget": "R100 000",
            "deadline": "2025-09-15",
            "buyer": "Dept. of Transport"
        },
    }
    return {"id": summary_id}

@router.get("/{summary_id}")
async def get_summary(
    summary_id: str,
    allowed=Depends(require_feature("can_ai_summary"))
):
    if summary_id not in summaries:
        raise HTTPException(status_code=404, detail="Summary not found")
    return summaries[summary_id]

