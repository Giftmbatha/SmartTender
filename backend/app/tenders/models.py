# app/tenders/models.py
from sqlalchemy import Column, String, DateTime, Integer, func
from sqlalchemy.dialects.postgresql import JSONB
from app.common.database import Base  # assuming you already have Base from your DB setup


class TenderSearchCache(Base):
    __tablename__ = "tender_search_cache"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(String, nullable=False, index=True)
    keyword = Column(String, nullable=True)
    filters = Column(JSONB, nullable=True)   # store filters as JSON
    results = Column(JSONB, nullable=False)  # store tender results as JSON
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
