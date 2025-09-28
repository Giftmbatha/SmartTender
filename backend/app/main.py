from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD
from app.ai_summarization import routes as ai_routes
=======
from app.common.database import init_db
>>>>>>> d6ce10c4bae5e682813c354891a0bae0bbef4736

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
from app.ai_summarization.routes import router as ai_summarization_router

<<<<<<< HEAD
app.include_router(tenders_router)
app.include_router(auth_router,  tags=["Auth"])
app.include_router(ai_routes.router)

=======
app.include_router(company_profiles_router)
app.include_router(tenders_router, prefix="/tenders", tags=["Tenders"])
app.include_router(auth_router,  prefix="/auth", tags=["Authentication"])
app.include_router(ai_summarization_router, prefix="/api", tags=["AI Summarization"])
>>>>>>> d6ce10c4bae5e682813c354891a0bae0bbef4736
