
from sqlalchemy.orm import Session
from app.company_profiles.models import Company
from app.company_profiles.schemas import CompanyCreate
from app.auth.models import Team

def create_company(db: Session, company_data: CompanyCreate, team_id: int):
    new_company = Company(**company_data.dict(), team_id=team_id)
    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return new_company

def get_companies_by_team(db: Session, team_id: int):
    return db.query(Company).filter(Company.team_id == team_id).all()
