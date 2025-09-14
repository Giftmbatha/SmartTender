from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
import httpx
import logging
from typing import Optional
from datetime import datetime, timedelta
from app.common.database import get_db
from app.common.utils import get_current_user

router = APIRouter()

# Logger
logger = logging.getLogger(__name__)

# Official OCDS API
OCDS_API_URL = "https://ocds-api.etenders.gov.za/api/OCDSReleases"

@router.get("/search")
async def search_tenders(
    q: Optional[str] = Query(None, description="Keyword search"),
    buyer: Optional[str] = Query(None, description="Buyer / procuring entity"),
    procurement_category: Optional[str] = Query(None, alias="procurementCategory", description="Main procurement category"),
    date_from: Optional[str] = Query(None, alias="dateFrom", description="Release date from (ISO8601)"),
    date_to: Optional[str] = Query(None, alias="dateTo", description="Release date to (ISO8601)"),
    page: int = Query(1, description="Page number"),
    limit: int = Query(20, description="Page size"),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """
    Search tenders from the eTenders OCDS API.
    Supported filters:
    - q (keyword search)
    - buyer
    - procurementCategory
    - dateFrom, dateTo
    - pagination
    """

    params = {
        "q": q,
        "buyer": buyer,
        "procurementCategory": procurement_category,
        "dateFrom": date_from,
        "dateTo": date_to,
        "page": page,
        "limit": limit
    }

    if q:
        params["q"] = q
    if buyer:
        params["buyer"] = buyer
    if procurement_category:
        params["procurementCategory"] = procurement_category

    # Handle dates properly
    now = datetime.utcnow()
    if date_to:
        params["dateTo"] = date_to
    else:
        params["dateTo"] = now.isoformat()

    if date_from:
        params["dateFrom"] = date_from
    else:
        params["dateFrom"] = (now - timedelta(days=365)).isoformat()

    params = {k: v for k, v in params.items() if v not in [None, ""]}

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            logger.info(f"Calling OCDS API with params: {params}")
            response = await client.get(OCDS_API_URL, params=params)
            response.raise_for_status()
            data = response.json()

        releases = data.get("releases", [])
        if not releases:
            releases = data.get("results", [])
        if not releases:
            releases = data.get("data", [])

        logger.info(f"Retrieved {len(releases)} releases")

        tenders = [normalize_ocds_release(r) for r in releases if normalize_ocds_release(r)]
        return {"count": len(tenders), "results": tenders}

    except httpx.HTTPStatusError as e:
        logger.error(f"OCDS API error: {e.response.status_code} - {e.response.text[:200]}")
        raise HTTPException(status_code=502, detail="eTenders API returned an error")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


def normalize_ocds_release(release: dict):
    """Convert OCDS release to simplified tender format"""
    try:
        tender = release.get("tender", {})
        parties = release.get("parties", [])

        # Buyer info
        buyer_name = "Unknown Buyer"
        procuring_entity = tender.get("procuringEntity", {}).get("id")
        if procuring_entity and parties:
            for p in parties:
                if p.get("id") == procuring_entity:
                    buyer_name = p.get("name", buyer_name)
                    break

        # Value
        value = tender.get("value", {})
        amount = value.get("amount")
        currency = value.get("currency", "ZAR")
        formatted_value = f"{currency} {amount:,.2f}" if amount else "N/A"

        # Dates
        deadline = tender.get("tenderPeriod", {}).get("endDate")

        return {
            "id": release.get("id"),
            "title": tender.get("title", "Untitled Tender"),
            "description": tender.get("description", ""),
            "buyer": buyer_name,
            "category": tender.get("mainProcurementCategory", "General"),
            "value": formatted_value,
            "deadline": deadline,
        }
    except Exception as e:
        logger.warning(f"Error normalizing release: {e}")
        return None
