from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, UUID, Boolean, Text
from uuid import uuid4
from uuid import UUID as uuid_type
from sqlalchemy.orm import relationship
from app.common.database import Base
from datetime import datetime

class Team(Base):
    __tablename__ = "teams"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String(100), nullable=False)
    plan_id = Column(Integer, ForeignKey("plans.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="team")

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id", ondelete="CASCADE"))
    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    team = relationship("Team", back_populates="users")

class Plan(Base):
    __tablename__ = "plans"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    max_users = Column(Integer, nullable=False)
    can_ai_summary = Column(Boolean, default=False)
    can_readiness_check = Column(Boolean, default=False)
    can_export = Column(Boolean, default=False)
    weekly_search_limit = Column(Integer, nullable=True)

# Pydantic schemas
from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    team_name: str

class UserResponse(BaseModel):
    id: uuid_type
    full_name: str
    email: EmailStr
    team_name: str
    is_admin: bool

    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserInfo(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    is_admin: bool
    plan_name: Optional[str]

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserInfo
    
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    plan_name: str
    max_users: int
    can_ai_summary: bool
    can_readiness_check: bool
    can_export: bool
    weekly_search_limit: Optional[int]

    class Config:
        orm_mode = True


