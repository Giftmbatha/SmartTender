from sqlalchemy.orm import Session
from app.company_profiles.models import Company
from app.company_profiles.schemas import CompanyCreate, CompanyUpdate
from fastapi import HTTPException, status
from uuid import UUID


def get_companies(db: Session, user_id: UUID, team_id: UUID):
    """Return all companies linked to the team of the current user"""
    companies = db.query(Company).filter(Company.team_id == team_id).all()
    return companies

def create_company(db: Session, company_data: CompanyCreate, user_id: UUID, team_id: UUID, user_plan: str):
    # Plan restriction: Free plan teams can only create 1 company
    if user_plan == "Free":
        existing = db.query(Company).filter(Company.id == team_id).count()
        if existing >= 1:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Free plan allows only 1 company profile."
            )

    new_company = Company(**company_data.dict(), user_id=user_id, team_id=team_id)
    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return new_company


def get_company(db: Session, company_id: int):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

def update_company(db: Session, company_id: int, company_data: CompanyUpdate):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    
    for key, value in company_data.dict(exclude_unset=True).items():
        setattr(company, key, value)
    
    db.commit()
    db.refresh(company)
    return company

def delete_company(db: Session, company_id: int):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    
    db.delete(company)
    db.commit()
    return {"message": "Company deleted successfully"}
