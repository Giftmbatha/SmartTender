## Project Architecture: Modular Monolith with Clean Architecture

This system is designed using a **Modular Monolithic Architecture** guided by **Clean Architecture** principles. This approach ensures high modularity, testability, and scalability while keeping the codebase manageable for a small team.

---

**Visual Architecture Diagram**

graph TD
    A[External Interfaces: FastAPI, PostgreSQL, Redis]
    B[Interface Adapters: Data Access Layer & Controllers/Routers]
    C[Business Rules: Service Layer / Use Cases]
    D[Enterprise Business Rules: Entities/Models]

    A -- depends on --> B
    B -- depends on --> C
    C -- depends on --> D

    style A fill:#f9f,stroke:#333
    style B fill:#ccf,stroke:#333
    style C fill:#9c9,stroke:#333
    style D fill:#ff9,stroke:#333

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


