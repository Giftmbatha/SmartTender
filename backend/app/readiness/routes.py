from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.common.database import get_db
from app.company_profiles.models import Company
from app.readiness.service import save_readiness_score, calculate_readiness_score
from app.readiness.models import ReadinessScore

router = APIRouter()

@router.post("/calculate")
def calculate_readiness(company_id: str, data: dict, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    score = save_readiness_score(db, company, data)
    return {"message": "Readiness score calculated successfully", "data": score}

@router.get("/{company_id}")
def get_readiness_scores(company_id: str, db: Session = Depends(get_db)):
    scores = db.query(ReadinessScore).filter(ReadinessScore.company_id == company_id).all()
    if not scores:
        raise HTTPException(status_code=404, detail="No readiness scores found for this company")
    return {"company_id": company_id, "scores": scores}