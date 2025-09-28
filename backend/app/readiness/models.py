from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class ReadinessScore(SQLModel, table=True):
    __tablename__ = "readiness_scores"

    id: Optional[int] = Field(default=None, primary_key=True)
    company_id: int = Field(index=True, foreign_key="companies.id")
    tender_id: int = Field(index=True, foreign_key="tenders.id")

    budget_score: float
    compliance_score: float
    location_score: float
    experience_score: float
    capacity_score: float

    total_score: float

    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
