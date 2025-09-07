from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func, UUID
from uuid import uuid4
from sqlalchemy.orm import relationship
from app.common.database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4, nullable=False)
    name = Column(String, nullable=False)
    registration_number = Column(String, unique=True, nullable=False)
    industry = Column(String, nullable=False)
    location = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    website = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))   # who created the company
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"))   # team that owns it

    owner = relationship("User", back_populates="companies")
