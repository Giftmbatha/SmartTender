import os
import shutil
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from app.common.database import get_db
from app.common.plan_restriction import require_feature

router = APIRouter()

# Directory to store uploads temporarily
UPLOAD_DIR = "/tmp"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post(
    "/summarize",
    dependencies=[Depends(lambda: require_feature("can_ai_summary"))]
)
async def summarize_tender(
    db: Session = Depends(get_db),
    file: UploadFile = File(None),
    tender_id: int = None
):
    """
    Summarize a tender document.
    - Accepts uploaded file (PDF/Word)
    - Or future: fetch tender by ID from DB
    """

    try:
        # Case 1: File uploaded
        if file:
            file_path = os.path.join(UPLOAD_DIR, file.filename)

            # Save file to disk
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            # TODO: replace this with real extraction + AI summarization
            extracted_text = f"Dummy extracted text from {file.filename}"
            summary = f"Summary of {file.filename}"
            deadlines = ["2025-10-01"]
            budget = "R 500,000"
            buyer = "Department of Works"

            return {
                "summary": summary,
                "deadlines": deadlines,
                "budget": budget,
                "buyer": buyer
            }

        # Case 2: Tender ID provided (future enhancement)
        if tender_id:
            tender = db.query(Tender).filter(Tender.id == tender_id).first()
            if not tender:
                raise HTTPException(status_code=404, detail="Tender not found")

            return {
                "summary": f"Summary of tender {tender_id}",
                "deadlines": ["2025-10-15"],
                "budget": "R 1,200,000",
                "buyer": tender.buyer
            }

        raise HTTPException(status_code=400, detail="No file or tender_id provided")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
