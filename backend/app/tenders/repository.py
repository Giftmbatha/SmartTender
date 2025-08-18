from sqlalchemy.orm import Session
from app.tenders.models import TenderSearchCache
from datetime import datetime, timedelta, timezone

CACHE_EXPIRY_HOURS = 24

def get_cached_results(db: Session, team_id: str, keyword: str, filters: dict):
    cutoff = datetime.now(timezone.utc) - timedelta(hours=CACHE_EXPIRY_HOURS)
    return (
        db.query(TenderSearchCache)
        .filter(
            TenderSearchCache.team_id == team_id,
            TenderSearchCache.keyword == keyword,
            TenderSearchCache.filters == filters,
            TenderSearchCache.created_at >= cutoff
        )
        .first()
    )

def save_search_results(db: Session, team_id: str, keyword: str, filters: dict, results: dict):
    cache_entry = TenderSearchCache(
        team_id=team_id,
        keyword=keyword,
        filters=filters,
        results=results
    )
    db.add(cache_entry)
    db.commit()
    db.refresh(cache_entry)
    return cache_entry
