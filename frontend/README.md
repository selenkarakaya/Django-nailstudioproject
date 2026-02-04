# React + Vite
# Nail Studio Frontend

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
This folder contains the React + Vite frontend for the nail studio project. It delivers marketing pages, authentication flows, appointment booking, and customer feedback screens. The UI is styled with Tailwind CSS and supporting component libraries.

Currently, two official plugins are available:
## Tech Stack

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- **React 18** with **Vite** for the dev server and build.
- **React Router** for client-side routing.
- **Axios** wrapper with token refresh logic.
- **Tailwind CSS** + custom styles for layout/branding.
- **Material Tailwind**, **React Slick**, **React Toastify**, and **React Icons** for UI elements.

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Vite starts the app locally and serves it at the URL printed in the terminal.

## Environment Variables

The frontend reads the backend base URL from `VITE_API_URL`.

```bash
VITE_API_URL=http://localhost:8000
```

The Axios instance targets `${VITE_API_URL}/api` and sends cookies with requests (for session/token flows).

## Available Scripts

- `npm run dev` – start the Vite dev server.
- `npm run build` – build the production bundle.
- `npm run preview` – preview the production build.
- `npm run lint` – run ESLint.

## App Structure

```
frontend/
  public/
  src/
    components/   # Reusable UI + forms
    context/      # User auth context
    pages/        # Route-level screens
    styles/       # Tailwind + custom CSS
    api.js        # Axios instance + refresh logic
    App.jsx       # Router + layout
    main.jsx      # Entry point
```

## Routes

The router lives in `src/App.jsx`. Primary routes include:

- `/` – Home
- `/about` – About
- `/ourservices` – Services
- `/contact` – Contact
- `/checkout` – Checkout
- `/login` – Login
- `/register` – Register
- `/profile` – Protected profile page
- `/appointment-form` – Appointment form
- `/appointmentBook` – Appointment booking page
- `/appointments` – Appointment list
- `/appointment` – Appointment detail
- `/editAppointment-form/:id` – Appointment edit
- `/feedbackForm` – Protected feedback form
- `/feedbackList` – Feedback list

## Authentication Notes

- `src/context/UserContext.jsx` loads the current user via `/api/profile/` and exposes `user`/`setUser`.
- `src/components/ProtectedRoute.jsx` checks `/api/token/verify/` and redirects unauthenticated users to `/login`.
- `src/api.js` attempts `/api/token/refresh/` on `401` responses to refresh tokens.

## Styling

Global styles live in `src/styles/index.css` and include Tailwind directives, font imports, and shared utility classes (appointment status badges, loading spinner, carousel tweaks, etc.).

## Troubleshooting

- **Blank pages:** confirm `VITE_API_URL` and verify the backend is running.
- **Unauthorized after login:** ensure backend exposes `token/verify/` and `token/refresh/`.
