from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class CompanyBase(BaseModel):
    name: str
    registration_number: str
    industry: str
    location: str
    email: EmailStr
    phone: str
    website: Optional[str] = None

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(BaseModel):
    name: Optional[str]
    industry: Optional[str]
    location: Optional[str]
    phone: Optional[str]
    website: Optional[str]

class CompanyResponse(CompanyBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True
