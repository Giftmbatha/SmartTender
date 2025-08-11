from sqlalchemy.orm import Session
from app.auth import models
from app.common import utils

def get_team_by_name(db: Session, name: str):
    return db.query(models.Team).filter(models.Team.name == name).first()

def create_team(db, team_name: str):
    from app.auth.models import Team
    from app.auth.repository import get_plan_by_name

    # Default plan for new teams
    free_plan = get_plan_by_name(db, "Free")
    team = Team(name=team_name, plan_id=free_plan.id if free_plan else None)
    db.add(team)
    db.commit()
    db.refresh(team)
    return team

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, full_name: str, email: str, password: str, team_id: int):
    user = models.User(
        full_name=full_name,
        email=email,
        password_hash=utils.hash_password(password),
        team_id=team_id,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_plan_by_name(db, plan_name: str):
    from app.auth.models import Plan
    return db.query(Plan).filter(Plan.name == plan_name).first()


def create_default_plans(db):
    from app.auth.models import Plan
    default_plans = [
        {"name": "Free", "max_users": 3, "can_ai_summary": False, "can_readiness_check": False, "can_export": False, "weekly_search_limit": 5},
        {"name": "Basic", "max_users": 10, "can_ai_summary": True, "can_readiness_check": True, "can_export": False, "weekly_search_limit": 20},
        {"name": "Pro", "max_users": 50, "can_ai_summary": True, "can_readiness_check": True, "can_export": True, "weekly_search_limit": None}
    ]
    for plan in default_plans:
        if not db.query(Plan).filter(Plan.name == plan["name"]).first():
            db.add(Plan(**plan))
    db.commit()
