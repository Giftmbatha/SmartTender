## Project Architecture: Modular Monolith with Clean Architecture

This system is designed using a **Modular Monolithic Architecture** guided by **Clean Architecture** principles. This approach ensures high modularity, testability, and scalability while keeping the codebase manageable for a small team.

---

###Visual Architecture Diagram

┌──────────────────────┐
│     API Layer        │  ← FastAPI routers/controllers
├──────────────────────┤
│  Service Layer       │  ← Business logic, scoring, plan restrictions
├──────────────────────┤
│  Data Access Layer   │  ← PostgreSQL, Redis
└──────────────────────┘


###Architecture Layers Explained

#### 1. **Presentation Layer**
- Built with **FastAPI**
- Handles HTTP requests, routing, request validation, and response formatting.

#### 2. **Service Layer**
- Contains business logic for:
  - Authentication & Team Management
  - Company Profiles
  - Tender Search
  - AI Summarization & Readiness Scoring
- Coordinates between the API and data layers.

#### 3. **Data Access Layer**
- Interacts with:
  - **PostgreSQL** (for users, teams, tenders)
  - **Redis** (for AI summaries, readiness scores, caching)

#### 4. **Databases**
- **PostgreSQL**: Structured data (users, plans, tenders)
- **Redis**: Unstructured data and caching (AI results, logs)


