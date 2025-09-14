from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.common.database import get_db
from app.auth import service
from app.auth.models import RegisterRequest, LoginRequest, TokenResponse
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    return service.register_user(request, db)

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    auth_result = service.authenticate_user(request, db)
    return JSONResponse(content=auth_result.dict())

@router.get("/me")
def get_current_user(user: dict = Depends(service.get_current_user)):
    return user

