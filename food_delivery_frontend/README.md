# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Authentication

The frontend implements JWT-based auth:

- Auth state is provided via `AuthContext` and persisted in `localStorage`.
- `utils/api.js` attaches `Authorization: Bearer <token>` automatically.
- On 401 responses the app redirects to `/login?returnTo=<current-path>`.

Environment:

- Configure backend base URL using `REACT_APP_API_BASE` (see `.env.example`).
- If not set, the app infers `http(s)://<host>:3001` for local development; otherwise falls back to `http://localhost:3001`.
- Ensure backend CORS allows `http://localhost:3000` (or your deployed origin).

## Customization

Colors and component styles are in `src/styles/theme.css` and `src/styles/global.css`.

Common components include:
- Buttons (`.btn`, `.btn-primary`, `.btn-success`)
- Inputs (`.input`)
- Card (`.card`, `.card-title`, `.card-subtitle`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
