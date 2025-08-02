from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.common.database import get_db
from app.auth.models import RegisterRequest, UserResponse
from app.auth import service

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    return service.register_user(request, db)
