from sqlalchemy.orm import Session
from app.auth import models
from app.common import utils

def get_team_by_name(db: Session, name: str):
    return db.query(models.Team).filter(models.Team.name == name).first()

def create_team(db: Session, name: str):
    team = models.Team(name=name)
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
