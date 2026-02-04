# Nail Studio Backend

This folder contains the Django REST API for the nail studio project. It handles authentication, user profiles, appointments, feedback, and serves media via Cloudinary. The API is configured for cookie-based JWT auth and is deployment-ready (e.g., Railway).

## Tech Stack

- **Django** + **Django REST Framework**
- **SimpleJWT** for access/refresh tokens
- **django-cors-headers** for CORS/CSRF handling
- **Cloudinary** storage for media uploads
- **PostgreSQL** (via `DATABASE_URL`)

## Getting Started

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API will be available at `http://localhost:8000/`.

## Environment Variables

Create a `.env` file (or export env vars) with the following values:

```bash
DJANGO_SECRET_KEY=your-secret
DEBUG=True
DATABASE_URL=postgres://user:pass@host:port/dbname
FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

Notes:
- `DJANGO_SECRET_KEY` (or `SECRET_KEY`) is required for Django.
- `DEBUG=True` enables local CORS/CSRF settings for Vite.
- `FRONTEND_URL` is used for CORS/CSRF allowlists when `DEBUG=False`.
- `DATABASE_URL` should point to Postgres in production.

## Key API Routes

Defined in `backend/urls.py`:

- `GET /` – Health message (`Welcome to the API!`).
- `POST /api/user/register/` – User registration.
- `POST /api/login/` – Login.
- `POST /api/token/refresh/` – Refresh token.
- `GET /api/token/verify/` – Verify token.
- `GET /api/profile/` – Current user profile.
- `POST /api/logout/` – Logout.
- `GET /api/` – App endpoints from `api.urls`.
- `GET /admin/` – Django admin.

## Authentication

- Uses cookie-based JWT via `CookieJWTAuthentication` and `rest_framework_simplejwt`.
- `DEFAULT_PERMISSION_CLASSES` is `IsAuthenticated`, so most endpoints require auth unless explicitly opened.

## Media Storage

Cloudinary is configured as the default file storage for uploads. Ensure the Cloudinary environment variables are set before using endpoints that save media.
