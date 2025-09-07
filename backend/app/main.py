from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.common.database import init_db

app = FastAPI()

origins = [
    "http://localhost:5173",  # frontend dev URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

# Import your routers here
from app.auth.routes import router as auth_router
from app.tenders.routes import router as tenders_router
from app.company_profiles.routes import router as company_profiles_router

app.include_router(company_profiles_router)
app.include_router(tenders_router, prefix="/api", tags=["Tenders"])
app.include_router(auth_router,  tags=["Auth"])
