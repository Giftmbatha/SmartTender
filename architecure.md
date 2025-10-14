## Project Architecture: Modular Monolith with Clean Architecture

This system is designed using a **Modular Monolithic Architecture** guided by **Clean Architecture** principles. This approach ensures high modularity, testability, and scalability while keeping the codebase manageable for a small team.

---

**Visual Architecture Diagram**

graph TD
  A[API Layer<br>FastAPI Routers/Controllers] --> B[Service Layer<br>Business Logic & AI Scoring]
  B --> C[Data Access Layer<br>SQLAlchemy Repositories]
  C --> D1[(PostgreSQL 🐘)]
  C --> D2[(Redis ⚡)]

  style A fill:#cce5ff,stroke:#004085,stroke-width:2px
  style B fill:#d4edda,stroke:#155724,stroke-width:2px
  style C fill:#fff3cd,stroke:#856404,stroke-width:2px
  style D1 fill:#f8d7da,stroke:#721c24,stroke-width:2px
  style D2 fill:#f8d7da,stroke:#721c24,stroke-width:2px


**Architecture Layers Explained**

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


