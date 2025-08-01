# Week 2 – Sprint 1 Task List  
**Sprint Goal:** Implement user authentication (register + login) and basic SaaS plan setup with frontend and backend integration.

---

## 🔧 Backend Tasks (FastAPI + PostgreSQL)

### Authentication --> **Asigned to:** Gift Mbatha
- [ ] Create `/register` endpoint to allow user sign-up  
- [ ] Create `/login` endpoint that returns a JWT token  
- [ ] Implement password hashing with bcrypt

### Database & Plan Setup --> **Asigned to:** Nthabeleng Moleko
- [ ] Design and create PostgreSQL tables:
  - `users`
  - `teams`
  - `plans`
  - `user_plans`
- [ ] Seed Free, Basic, and Pro plan data  
- [ ] Write logic to assign team to a default plan on registration  

### Plan Restrictions --> **Asigned to:** Gift Mbatha
- [ ] Write middleware/service logic to restrict API access based on plan  
- [ ] Apply basic search limit or feature blocking for Free plan users  

### Testing & Validation --> **Asigned to:** Gift Mbatha
- [ ] Write test cases for user registration and login  
- [ ] Validate JWT token on protected endpoints  

---

## Frontend Tasks (React.js + Vite)

### Project Setup --> **Asigned to:** Gift Mbatha
- [ ] Initialize frontend project using Vite  
- [ ] Set up folder structure:
  - `src/components`
  - `src/pages`
  - `src/services`

### UI Forms --> **Asigned to:** Lentswe Kunene
- [ ] Build Login page UI with email + password fields  
- [ ] Build Register page UI with team name, email, password, and plan selection  
- [ ] Add basic input validation for both forms  

### Routing & Navigation --> **Asigned to:** Lentswe Kunene
- [ ] Set up React Router with routes:
  - `/login`
  - `/register`
  - `/dashboard`

### 📡 API Integration --> **Asigned to:** Monthati Gaosekwe
- [ ] Set up Axios for API calls  
- [ ] Create `authService.js` to connect to backend `/register` and `/login` endpoints  
- [ ] Store JWT token in `localStorage` after login  
- [ ] Simulate login success with token check on dashboard  

---
 
## Documentation & Code Review --> **Asigned to:** Refiloe Baloyi

- [ ] Update `README.md` with:
  - Tech stack
  - Project structure
  - Sprint 1 focus   
- [ ] Review Code 

---

## Sprint Duration
**Start:** Monday, 4 August  
**End:** Friday, 8 August  

---
