# app/auth/service.py
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
import os

from app.auth import repository
from app.auth.models import RegisterRequest, UserResponse, LoginRequest, TokenResponse, User, Plan
from app.common import utils
from app.common.database import get_db

# For JWT
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"


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


def authenticate_user(request: LoginRequest, db: Session) -> TokenResponse:
    user = repository.get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not utils.verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # ✅ Correctly get the plan
    plan = None
    if user.team and user.team.plan_id:
        plan = db.query(Plan).filter(Plan.id == user.team.plan_id).first()

    # ✅ Create JWT
    token = utils.create_access_token({"sub": str(user.id), "email": user.email})

    return TokenResponse(
        access_token=token,
        plan_name=plan.name if plan else "Unknown",
        max_users=plan.max_users if plan else 0,
        can_ai_summary=plan.can_ai_summary if plan else False,
        can_readiness_check=plan.can_readiness_check if plan else False,
        can_export=plan.can_export if plan else False,
        weekly_search_limit=plan.weekly_search_limit if plan else 0
    )


# ✅ NEW: Get current user (for plan restrictions, protected routes, etc.)
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """
    Decode JWT token and return the current logged-in user.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise credentials_exception

    return user
