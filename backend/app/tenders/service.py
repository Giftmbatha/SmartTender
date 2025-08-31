# app/tenders/tender_service.py
import requests
import json
from typing import Optional
from sqlalchemy.orm import Session
from app.tenders.models import TenderSearchCache
from datetime import datetime, timedelta

CACHE_EXPIRY_HOURS = 24
BASE_URL = "https://ocds-api.etenders.gov.za"


def fetch_tenders(
    keyword: Optional[str] = None,
    province: Optional[str] = None,
    submission_deadline: Optional[str] = None,
    buyer: Optional[str] = None,
    budget_min: Optional[int] = None,
    budget_max: Optional[int] = None,
    page: int = 1,
    size: int = 100
) -> dict:
    """
    Fetch tender releases from the eTenders OCDS API with optional filters and pagination.
    """
    endpoint = f"{BASE_URL}/api/OCDSReleases"
    params = {"PageNumber": page, "PageSize": size}

    if keyword:
        params["q"] = keyword
    if province:
        params["province"] = province
    if submission_deadline:
        params["dateTo"] = submission_deadline
    if buyer:
        params["buyer"] = buyer
    if budget_min is not None:
        params["budgetMin"] = budget_min
    if budget_max is not None:
        params["budgetMax"] = budget_max

    try:
        response = requests.get(endpoint, params=params, timeout=10)

        if response.status_code == 404:
            return {"error": "No tenders found for the given criteria."}

        if not response.ok:
            return {"error": f"Failed to fetch tenders: {response.status_code}", "details": response.text}

        return response.json()

    except requests.exceptions.ConnectionError as e:
        return {"error": "Could not connect to the eTenders API", "details": str(e)}

    except requests.exceptions.Timeout:
        return {"error": "The eTenders API took too long to respond. Please try again."}

    except Exception as e:
        return {"error": "An unexpected error occurred", "details": str(e)}


def get_cached_results(db: Session, team_id: str, keyword: str, filters: dict):
    """
    Retrieve cached results if they exist and are not expired.
    """
    cutoff = datetime.utcnow() - timedelta(hours=CACHE_EXPIRY_HOURS)
    filters_json = json.dumps(filters, sort_keys=True)

    cache = (
        db.query(TenderSearchCache)
        .filter(
            TenderSearchCache.team_id == team_id,
            TenderSearchCache.keyword == keyword,
            TenderSearchCache.filters == filters_json,
            TenderSearchCache.created_at >= cutoff
        )
        .first()
    )

    return cache.results if cache else None


def save_search_results(db: Session, team_id: str, keyword: str, filters: dict, results: dict):
    """
    Save new search results to the cache.
    """
    filters_json = json.dumps(filters, sort_keys=True)

    cache_entry = TenderSearchCache(
        team_id=team_id,
        keyword=keyword,
        filters=filters_json,
        results=results
    )
    db.add(cache_entry)
    db.commit()
    db.refresh(cache_entry)

    return cache_entry.results
