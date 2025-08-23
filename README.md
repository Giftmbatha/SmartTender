# SmartTender

## Code Review Feedback – Sprint 2 

**Sprint Duration**: Week 3 
**Sprint Goal**:  Keyword Search, Filtering, and Match Ranking
**Team Size**: 5 members
---

### Team Performance
| Team Member | Tasks Assigned | Tasks Completed | Completion % |
|-------------|----------------|-----------------|--------------|
| Gift Mbatha | 9 | 9 | 100% |
| Nthabeleng Moleko | 6 | 6 | 100% |
| Lentswe Kunene | 6 | 6 | 100% |
| Monthati Gaosekwe | 7 | 7 | 100% |
| Refiloe Baloyi | 3 | 3 | 100% |

---

## Sprint Achievements

**This review covers the Sprint 2 tasks:**  
- Backend: OCDS API integration, /api/search endpoint, filtering, caching.  
- Frontend: Search bar, filter UI, tender results display, API integration.  
⦁	Overall, great progress on connecting backend and frontend for tender search. Below are detailed notes.


**Primary Goals met:**
- Backend endpoint /api/search implemented and returns clean JSON.  
- Proper use of query parameters (province, deadline, buyer, budget).  
- Good use of Axios in frontend to call the backend API.  
- UI for search + filters is clean and intuitive.  
- Results are displayed in a readable card format.  


**What we can improve:**

**⦁	 In backend :**
1. Validation
   - Add Pydantic models for query parameters (e.g., enforce budget_min and budget_max to be integers).  
2. Error Handling
   - If OCDS API is down or returns no results, return a JSON response like:  
     json
     { "error": "No tenders found", "status": 404 }
       
3. Caching
   - Consider adding a caching mechanism (Redis/Mongo) for repeated searches instead of hitting OCDS API every time.  
4. Testing
   - Add unit tests for filter combinations (e.g., province + buyer, budget range).  


**⦁	 In Frontend**
1. Error States
   - Display a friendly message when no results are found.  
   - Show an error toast if API fails.  
2. Loading State
   - Add a spinner or skeleton loader while fetching tenders.  
3. Filter Validation
   - Disable the "Search" button until at least one keyword is entered.  
4. Pagination
   - Implement pagination or infinite scroll if the results are too long.  

**⦁	 Next Steps:**
- Refactor backend filters into service layer (not inside route).  
- Add Redis caching for common searches.  
- Implement loading + error handling states on frontend.  
- Update API documentation (docs/api-contract.md) with examples of filtered queries.  


**Review Decision**
- Changes required before merge  
- Looks good, minor fixes  
- Approved for merge after improvements)
