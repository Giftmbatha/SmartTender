from app.readiness.models import ReadinessScore
from app.company_profiles.models import Company
from sqlalchemy.orm import Session

# Define weights
WEIGHTS = {
    "budget": 0.30,
    "compliance": 0.25,
    "location": 0.20,
    "experience": 0.15,
    "capacity": 0.10
}

def calculate_readiness_score(company: Company, data: dict) -> dict:
    """Calculate readiness score based on given criteria."""
    budget = data.get("budget_score", 0)
    compliance = data.get("compliance_score", 0)
    location = data.get("location_score", 0)
    experience = data.get("experience_score", 0)
    capacity = data.get("capacity_score", 0)

    total_score = (
        budget * WEIGHTS["budget"] +
        compliance * WEIGHTS["compliance"] +
        location * WEIGHTS["location"] +
        experience * WEIGHTS["experience"] +
        capacity * WEIGHTS["capacity"]
    )

    remarks = "Excellent readiness" if total_score >= 80 else \
              "Moderate readiness" if total_score >= 50 else \
              "Low readiness"

    return {
        "company_id": str(company.id),
        "budget_score": budget,
        "compliance_score": compliance,
        "location_score": location,
        "experience_score": experience,
        "capacity_score": capacity,
        "total_score": round(total_score, 2),
        "remarks": remarks
    }

def save_readiness_score(db: Session, company: Company, data: dict):
    """Save readiness score to the database."""
    score_data = calculate_readiness_score(company, data)
    score = ReadinessScore(**score_data)
    db.add(score)
    db.commit()
    db.refresh(score)
    return score