from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.common.database import get_db
from app.auth.service import get_current_user
from app.company_profiles.schemas import CompanyCreate, CompanyUpdate, CompanyResponse
from app.company_profiles.service import create_company, get_company, get_companies, update_company, delete_company
from typing import List
from app.auth.models import User  # Add this import for User

# Mock auth dependency → replace with real JWT later

router = APIRouter(prefix="/api/companies", tags=["Companies"])

@router.post("/", response_model=CompanyResponse)
def create_company_endpoint(
    company: CompanyCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)  # returns User object
):
    # Get plan name from team → plan
    user_plan = user.team.plan.name if user.team and user.team.plan else "Free"

    return create_company(
        db,
        company,
        user_id=user.id,
        team_id=user.team_id,
        user_plan=user_plan
    )
    


@router.get("/", response_model=List[CompanyResponse])
def get_companies_endpoint(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return get_companies(
        db, 
        user_id=user.id, 
        team_id=user.team_id
        )


@router.get("/{company_id}", response_model=CompanyResponse)
def get_company_endpoint(company_id: int, db: Session = Depends(get_db)):
    return get_company(db, company_id)

@router.put("/{company_id}", response_model=CompanyResponse)
def update_company_endpoint(company_id: int, company: CompanyUpdate, db: Session = Depends(get_db)):
    return update_company(db, company_id, company)

@router.delete("/{company_id}")
def delete_company_endpoint(company_id: int, db: Session = Depends(get_db)):
    return delete_company(db, company_id)
