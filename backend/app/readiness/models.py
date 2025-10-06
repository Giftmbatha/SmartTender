from sqlalchemy import Column, Float, String, DateTime, ForeignKey, func, UUID
from sqlalchemy.orm import relationship
from uuid import uuid4
from app.common.database import Base

class ReadinessScore(Base):
    __tablename__ = "readiness_scores"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)
    
    budget_score = Column(Float, nullable=False)
    compliance_score = Column(Float, nullable=False)
    location_score = Column(Float, nullable=False)
    experience_score = Column(Float, nullable=False)
    capacity_score = Column(Float, nullable=False)

    total_score = Column(Float, nullable=False)
    remarks = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    company = relationship("Company", backref="readiness_scores")