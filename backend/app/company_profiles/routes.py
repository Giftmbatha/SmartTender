
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.common.database import get_db
from app.company_profiles import service, schemas
from app.dependencies import get_current_team

router = APIRouter(prefix="/companies", tags=["companies"])

@router.post("/", response_model=schemas.CompanyOut)
def create_company(company: schemas.CompanyCreate, db: Session = Depends(get_db), team=Depends(get_current_team)):
    return service.create_company_with_restrictions(db, company, team.id)

@router.get("/", response_model=list[schemas.CompanyOut])
def list_companies(db: Session = Depends(get_db), team=Depends(get_current_team)):
    return service.repository.get_companies_by_team(db, team.id)
