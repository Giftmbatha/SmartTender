from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.company_profiles.models import Team, Plan
from app.ai_summarization.models import TenderSummaryLog

PLAN_LIMITS = {
    "free": 1,
    "basic": 5,
    "pro": None  # unlimited
}

def can_summarize(db: Session, team_id: str) -> bool:
    team = db.query(Team).filter(Team.id == team_id).first()
    plan = db.query(Plan).filter(Plan.id == team.plan_id).first()

    cutoff = datetime.utcnow() - timedelta(days=7)

    summaries_count = (
        db.query(TenderSummaryLog)
        .filter(TenderSummaryLog.team_id == team_id,
                TenderSummaryLog.created_at >= cutoff)
        .count()
    )

    limit = PLAN_LIMITS.get(plan.name.lower())
    if limit is None:
        return True  # Pro plan = unlimited

    return summaries_count < limit


def log_summary_usage(db: Session, team_id: str, tender_id: str = None):
    log = TenderSummaryLog(team_id=team_id, tender_id=tender_id)
    db.add(log)
    db.commit()
    return log


def build_summary_response(extracted_text: str, ai_summary: str, metadata: dict):
    """
    metadata should include buyer, deadlines, budget, etc.
    """

    return {
        "summary": ai_summary,
        "key_deadlines": metadata.get("deadlines", []),
        "budget_highlights": metadata.get("budget", None),
        "buyer_details": metadata.get("buyer", None),
    }
