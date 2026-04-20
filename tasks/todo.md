# Tasks: Project Initialization

## Phase 1: Setup & Analysis

### Feature 1: Requirenment and Documentation

- [x] Analyze tech stack (Next.js, TS, Tailwind, FastAPI, SQLite/PostgreSQL)
- [x] Update `GEMINI.md` with Project Context
- [x] Analyze and Write PRD/SRS for Phase 1

### Feature 2: Initialize Next.js frontend

- [x] Scaffold Next.js 14 project in `frontend/` (TS, Tailwind, App Router)
- [x] Configure custom Design System (Stone/Indigo palette, Typography)
- [x] Setup core folder structure (`app/`, `components/`, `lib/`, `services/`, etc.)
- [x] Implement type-safe API client and services
- [x] Build core UI components (3D Flashcard, Bottom Navigation)
- [x] Implement Dashboard (Word list, Search, Stats)
- [x] Implement "Create Flashcard" module
- [x] Implement Quiz & Writing learning modules
- [x] Verify UI responsiveness and backend integration

### Feature 3: Initialize FastAPI backend

- [x] Initialize `uv` project in `backend/`
- [x] Add dependencies (`fastapi`, `uvicorn[standard]`, `sqlalchemy`, `alembic`, `pydantic-settings`)
- [x] Create `.env` from `.env.example`
- [x] Setup folder structure as per `docs/backend-document.md`
- [x] Implement Core configuration (`app/core/config.py`)
  - [x] Setup Database session (`app/db/session.py` and `app/db/base.py`)
- [x] Implement Flashcard Model (`app/models/flashcard.py`)
- [x] Initialize Alembic and create initial migration
- [x] Implement Flashcard Schemas (`app/schemas/flashcard.py`)
- [x] Implement Flashcard Repository (`app/repositories/flashcard_repo.py`)
- [x] Implement Flashcard Service (`app/services/flashcard_service.py`)
- [x] Implement Learning Service (`app/services/learning_service.py` for Quiz/Writing)
- [x] Implement API Endpoints (`flashcards.py`, `learning.py`, `health.py`)
- [x] Implement API Router (`app/api/v1/router.py`)
- [x] Implement Global Exception Handlers (RFC 7807)
- [x] Complete `app/main.py` entry point
- [x] Verify backend functionality via Swagger UI

### Feature 4: Topic & Vocabulary Example

- [ ] (Backend) Implement `Topic` Model and Repository
- [ ] (Backend) Update `Flashcard` Model with `topic_id` and `example_sentence`
- [ ] (Backend) Create Alembic migration (Schema changes & migrate existing cards to "VSTEP READING")
- [ ] (Backend) Implement Topic Seeding script (30 predefined topics)
- [ ] (Backend) Implement Topic API endpoints and update Flashcard API (Filtering & New fields)
- [ ] (Frontend) Implement Topic management page
- [ ] (Frontend) Upgrade Flashcard Form: Searchable Combobox for Topics & "Quick Create Topic" button
- [ ] (Frontend) Update Flashcard Form: Add `example_sentence` field
- [ ] (Frontend) Update Flashcard UI: Display `example_sentence` on flip (back side)
- [ ] (Frontend) Update Learning modules: Add Topic selection for Quiz and Writing

---

## Progress Tracking

- 2026-04-18: Project analysis and initialization. Updated `GEMINI.md` with tech stack details.
- 2026-04-18: Completed analysis and drafted PRD/SRS for Phase 1 in `docs/project-requirements-document.md`.
- 2026-04-18: Proposed detailed backend implementation plan using `uv` and Layered Architecture.
- 2026-04-18: Successfully initialized FastAPI backend with `uv`, SQLAlchemy, Alembic, and implemented core features (CRUD, Quiz, Writing) following Layered Architecture.
