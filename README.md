# SmartTender

#Week 6 (Sprint 5) — Readiness Scoring Epic

## Epic Overview
This sprint focuses on implementing and integrating the **Tender Readiness Scoring** feature — enabling teams to assess their suitability for specific tenders based on their company profiles and AI summarization data.

The sprint includes backend model design, API development, frontend integration.

---

## Sprint Timeline & Assignments

### **Backend: Define Scoring Model & Database Setup**
**Assignees:** Gift Mbatha & Refiloe Baloyi  
**Objectives:**
- Design PostgreSQL tables for readiness scores, matched criteria, and recommendations.  
- Define relationships between `CompanyProfile`, `Tender`, and `ReadinessScore` models.  
- Prepare SQLAlchemy models and migrations.

**Deliverables:**
- `readiness/models.py`
- DB migration script
- Documentation of scoring model schema in `/docs/api-contract.md`

---

### **Backend: Implement Scoring Service & Endpoints**
**Assignee:** Gift Mbatha  
**Objectives:**
- Implement business logic in `readiness/service.py`:
  - Compare tender requirements with company profile attributes.
  - Calculate a readiness score (0–100).
  - Generate a short recommendation summary.
- Create FastAPI endpoints in `readiness/routes.py`:
  - `POST /api/readiness/check`
  - `GET /api/readiness/history`

**Deliverables:**
- `readiness/service.py`
- `readiness/routes.py`
- Unit tests for readiness logic

---

### **Frontend: Add “Check Readiness” Button & Modal**
**Assignee:** Monthati Gaosekwe  
**Objectives:**
- Add a “Check Readiness” button on each tender card.  
- On click, open a modal that calls the readiness API.  
- Display score, matched/unmatched criteria, and recommendation message.

**Deliverables:**
- `frontend/src/components/Tender/ReadinessModal.jsx`
- `frontend/src/pages/Dashboard.jsx` (button integration)

---

### **Frontend: Build Readiness History Page**
**Assignee:** Monthati Gaosekwe  
**Objectives:**
- Create a page to display historical readiness checks.  
- Fetch data from `GET /api/readiness/history`.  
- Sort results by highest match score.

**Deliverables:**
- `frontend/src/pages/ReadinessHistory.jsx`
- `readinessService.js` 

---

### **AI Integration: Natural-Language Explanations (Optional)**
**Assignee:** Lentswe Kunene  
**Objectives:**
- Enhance readiness scoring with natural-language reasoning using an AI model.  
- Integrate HuggingFace transformer or local LLM to produce an explanation field in the readiness result.  

**Deliverables:**
- `ai_explanations/service.py`
- Integrated AI output into readiness API response

---

### **Testing & Quality Assurance**
**Team-wide effort**  
**Objectives:**
- Run unit and integration tests across backend and frontend.  
- Verify scoring accuracy, response formatting, and frontend data rendering.  
- Perform manual API tests using Postman.  

**Deliverables:**
- `tests/test_readiness_service.py`
- `tests/test_readiness_routes.py`
- QA checklist report in `/docs/testing-report.md`

---

## Sprint Deliverables Summary
| Area | Deliverable | Owner |
|------|--------------|--------|
| Backend | Scoring model, DB schema, service, endpoints | Gift & Refiloe |
| Frontend | Readiness modal & history page | Monthati |
| AI | Explanations  | Lentswe |
| QA | Testing report & validation | Entire Team |
|Documentation | Document | Nthabeleng Moleko |
---

**Prepared by:** Nthabeleng Moleko 
**Module:** Software Engineering & Design  
**Project:** SmartTender SaaS Web Application  
**Sprint:** 5 – Readiness Scoring Epic

