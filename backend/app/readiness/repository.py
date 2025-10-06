from sqlalchemy.orm import Session
from app.readiness.models import ReadinessScore
from typing import List
from app.company_profiles.models import Company  # adjust import as needed
from uuid import UUID

def save_score(db: Session, company_id: UUID, score_percent: float, breakdown: dict, tender_id: str = None, tender_snapshot: dict = None) -> ReadinessScore:
    entry = ReadinessScore(
        company_id=company_id,
        tender_id=tender_id,
        score_percent=score_percent,
        breakdown=breakdown,
        tender_snapshot=tender_snapshot
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

def get_scores_for_company(db: Session, company_id: UUID, limit: int = 20):
    return db.query(ReadinessScore).filter(ReadinessScore.company_id == company_id).order_by(ReadinessScore.created_at.desc()).limit(limit).all()


def get_company_by_id(db: Session, company_id: UUID) -> Company:
    return db.query(Company).filter(Company.id == company_id).first()