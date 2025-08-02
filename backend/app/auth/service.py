from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.auth import repository, models
from app.auth.models import RegisterRequest, UserResponse

def register_user(request: RegisterRequest, db: Session) -> UserResponse:
    if repository.get_user_by_email(db, request.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    team = repository.get_team_by_name(db, request.team_name)
    if not team:
        team = repository.create_team(db, request.team_name)

    user = repository.create_user(
        db,
        full_name=request.full_name,
        email=request.email,
        password=request.password,
        team_id=team.id
    )

    return UserResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        team_name=team.name,
        is_admin=user.is_admin
    )
