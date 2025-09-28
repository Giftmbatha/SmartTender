READINESS_CRITERIA = {
    "budget": {
        "weight": 0.35,   # 35%
        "description": "Does the company's budget meet or exceed the tender budget?"
    },
    "compliance": {
        "weight": 0.30,   # 30%
        "description": "Does the company meet mandatory compliance/legal requirements?"
    },
    "location": {
        "weight": 0.20,   # 20%
        "description": "Is the company within the required geographic area?"
    },
    "experience": {
        "weight": 0.15,   # 15%
        "description": "Does the company have prior experience in similar tenders?"
    }
}

TOTAL_WEIGHT = sum(v["weight"] for v in READINESS_CRITERIA.values())
assert abs(TOTAL_WEIGHT - 1.0) < 1e-6, "Weights must sum to 1.0"
