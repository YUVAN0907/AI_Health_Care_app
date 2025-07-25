# AI Health Care App

## Prerequisites
- Node.js & npm
- MongoDB (running locally on default port 27017)

## Setup

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
- The backend runs on http://localhost:5000

### 2. Frontend
```bash
cd frontend
npm install
npm start
```
- The frontend runs on http://localhost:3000

### 3. Usage
- Open http://localhost:3000 in your browser.
- Enter symptoms (comma separated) and upload a medical report (PDF or image).
- Click "Get Diagnostic Report" to receive AI-generated suggestions.

### 4. Notes
- Ensure MongoDB is running locally before starting the backend.
- Uploaded files are stored in `backend/uploads`.
- Diagnostic data is stored in MongoDB `ai_healthcare` database.

---

## Project Structure
- `frontend/` — React.js app (UI, Tailwind CSS)
- `backend/` — Express.js API, file upload, MongoDB (Mongoose)
- `backend/models/Diagnostic.js` — MongoDB schema
- `backend/routes/diagnose.js` — Main API endpoint

---

## Security
- File uploads are limited to 5MB and only accept PDF or image files.
- Inputs are validated on the backend.

---

## Customization
- The diagnostic logic in `backend/routes/diagnose.js` can be replaced with a real LLM or API call.