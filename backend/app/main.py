from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

# Import your routers here
from app.auth.routes import router as auth_router
from app.tenders.routes import router as tenders_router

app.include_router(tenders_router)
app.include_router(auth_router,  tags=["Auth"])
