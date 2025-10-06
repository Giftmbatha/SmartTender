# app/readiness/schemas.py
from pydantic import BaseModel, Field
from typing import Optional, Any, Dict, List

class TenderSnapshot(BaseModel):
    id: Optional[str]
    title: Optional[str]
    description: Optional[str]
    value: Optional[Any]
    deadline: Optional[str]
    province: Optional[str]
    buyer: Optional[str]

class ReadinessBreakdownItem(BaseModel):
    score: float
    weight: int
    weighted_score: float

class ReadinessResponse(BaseModel):
    score_percent: float
    breakdown: Dict[str, ReadinessBreakdownItem]
    tender_snapshot: Optional[Dict[str, Any]]

class ReadinessRequest(BaseModel):
    # either pass company_id to fetch profile from DB OR pass company_profile directly
    company_id: Optional[str] = None
    company_profile: Optional[Dict[str, Any]] = None
    tender: Dict[str, Any]
    save: Optional[bool] = True
    weights: Optional[Dict[str, int]] = None