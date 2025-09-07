# SmartTender

## Code Review Feedback – Epic 3

**Epic Duration**: Week 4  
**Epic Goal**: Company Profile Management (Create, Update, Validate, Store)  
**Team Size**: 5 members
---

### Team Performance
| Team Member | Tasks Assigned | Tasks Completed | Completion % |
|-------------|----------------|-----------------|--------------|
| Gift Mbatha | 8 | 8 | 100% |
| Nthabeleng Moleko | 6 | 6 | 100% |
| Lentswe Kunene | 6 | 6 | 100% |
| Monthati Gaosekwe | 5 | 5 | 100% |
| Refiloe Baloyi | 3 | 3 | 100% |

---
## Epic Achievements

**This review covers the Epic 3 tasks:**  
- Backend: `/api/companies` endpoint group, SQL database integration, Pydantic models, validation, plan restrictions.  
- Frontend: Company profile form, update UI, API integration.  
⦁ Overall, great progress on managing company profiles with proper validation and persistence. Below are detailed notes.

**Primary Goals met:**
- Created `/api/companies` endpoints:  
  - `POST /companies` → Create new company profile  
  - `GET /companies/{id}` → Retrieve profile by ID  
  - `PUT /companies/{id}` → Update profile  
  - `DELETE /companies/{id}` → Delete profile  
- Defined Pydantic models for requests and responses, enforcing field types and optional fields.  
- Updated SQL database schema with a `companies` table and linked `user/team` via foreign key.  
- Implemented plan restrictions (Free plan: only 1 company profile).  
- Frontend form allows users to create and update profiles with validations.  

---

**What we can improve:**

**⦁ Backend**
1. Validation
   - Ensure strict validation of registration numbers, email format, and phone number patterns.  
2. Error Handling
   - Return friendly JSON error responses when validation fails or a profile is not found:  
     ```json
     { "error": "Company profile not found", "status": 404 }
     ```
3. Testing
   - Add unit tests for create, update, delete, and get operations.  
4. Plan Restrictions
   - Enforce restrictions in middleware or service layer to avoid bypass.  

**⦁ Frontend**
1. Error States
   - Display clear messages when validation fails or API returns an error.  
2. Loading State
   - Add spinner or skeleton loader when fetching or submitting company data.  
3. Form Validation
   - Disable "Save Profile" until all required fields are entered.  

**⦁ Next Steps:**
- Refactor company profile logic into a dedicated service layer.  
- Implement logging for backend operations.  
- Add more frontend features like viewing all profiles for paid plans.  
- Update API documentation (docs/api-contract.md) with request/response examples for company endpoints.  

---

**Review Decision**
- Changes required before merge  
- Looks good, minor fixes  
- Approved for merge after improvements
