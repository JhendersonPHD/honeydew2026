# Night Shift Changelog — Navigation & Routing Improvements

## Date
2026-04-17

## Summary
Focused, minimal improvements to frontend navigation and routing. No breaking changes.

## Changes Made

### 1. Added Missing Product Detail Route
- **File:** `frontend/src/App.jsx`
- Registered the `/products/:slug` route that `ProductCard` already linked to but was absent from the router. Product detail pages now load correctly.

### 2. Scroll-to-Top on Route Change
- **File:** `frontend/src/App.jsx`
- Added a `ScrollToTop` component using `useLocation` that smoothly scrolls the window to top on every pathname change. Improves UX when navigating between pages.

### 3. Shop Category Filter ↔ URL Sync
- **File:** `frontend/src/pages/Shop.jsx`
- Integrated `useSearchParams` so the active category filter is reflected in the URL (`?category=3d-printed`) and read back on page load / back-button navigation.
- Clicking category pills updates the URL; the "Clear filters" button resets the URL param.
- Wrapped `filterProducts` in `useCallback` to satisfy React Hook exhaustive-deps rules.

### 4. Breadcrumbs Integration
- **Files:** `frontend/src/pages/Shop.jsx`, `frontend/src/pages/Dashboard.jsx`
- Added the existing `Breadcrumbs` component to the Shop and Dashboard layouts for consistent wayfinding.

### 5. Dashboard Active Link Styling
- **File:** `frontend/src/pages/Dashboard.jsx`
- Replaced plain `Link` with `NavLink` for dashboard sub-navigation, adding visual active-state highlighting (`bg-emerald-100 text-emerald-800`) so users always know where they are.

## Verification
- `npm run build` passes cleanly in `frontend/`.
- `npx eslint` reports zero errors on all modified files.
- Backend health and product API endpoints respond correctly.
- No existing functionality was altered or removed.
