
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.company_profiles import repository, schemas
from app.auth.models import Team

def create_company_with_restrictions(db: Session, company_data: schemas.CompanyCreate, team_id: int):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    # Plan restriction: Free plan = only 1 company
    if team.plan == "Free":
        existing_count = len(repository.get_companies_by_team(db, team_id))
        if existing_count >= 1:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Free plan allows only 1 company profile. Upgrade plan to add more."
            )

    return repository.create_company(db, company_data, team_id)
