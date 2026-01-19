# Copilot Instructions - TUM Inventario Frontend

## Project Overview
React 18 + Vite frontend for IoT equipment inventory management (Alcaldía). Uses **CoreUI Pro React** components, **Zustand** for state management, and **i18next** for internationalization (Spanish default).

## Architecture Pattern (3-Layer)
```
View (src/views/) → Hook (src/hook/) → Store (src/store/) → Service (src/services/) → API
```

### Layer Responsibilities
- **Views**: Page components with lazy loading. Use hooks, not direct store access
- **Hooks** (`useXxxStore.js`): Facade layer exposing store actions to components
- **Stores** (`xxx.store.js`): Zustand stores with `devtools` + `persist` middleware
- **Services** (`xxx.service.js`): Static class methods calling `iotApi` (axios instance)

### Example Flow (Equipment)
```javascript
// View calls hook
const { cargarEquipos } = useEquipoStore();

// Hook uses store
const startLoadEquipos = EquipoStore((state) => state.startLoadEquipos);

// Store calls service
const { ok, datos } = await EquipoService.cargarEquipos();

// Service calls API
const resp = await iotApi.get('/equipos');
```

## Key Conventions

### File Naming
- Stores: `{domain}.store.js` (e.g., `equipo.store.js`)
- Services: `{domain}.service.js` (e.g., `equipo.service.js`)
- Hooks: `use{Domain}Store.js` (e.g., `useEquipoStore.js`)
- Views: PascalCase with descriptive names (e.g., `Equipos-detalle.js`)

### State Management
- Use **Zustand** (not Redux) for domain state. Redux only for UI state (sidebar, theme)
- Always wrap store with `devtools(persist(storeApi, { name: 'storeName' }))`
- Token stored in localStorage, accessed via `localStorage.getItem('token')`

### API Calls
- All requests go through `src/api/iotApi.js` (axios instance)
- Token auto-attached via interceptor using `x-token` header
- API URL dynamically built from `window.location` in `getEnvVariables.js`
- Return pattern: `{ ok: boolean, datos?: any, errorMessage?: string }`

### Components
- Use **CoreUI Pro** components (`@coreui/react-pro`): `CSmartTable`, `CCard`, `CButton`, etc.
- Icons from `@coreui/icons-react`
- Tables use `CSmartTable` with column visibility toggles

### Internationalization
- All user-facing text via `react-i18next`
- Translations in `public/locales/{lang}/translation.json`
- Default language: Spanish (`es`)
- Route names use `<Translation>{(t) => t('key')}</Translation>`

### Routing
- Hash-based routing (`HashRouter`)
- Lazy-loaded routes in `src/router/routes.js`
- Auth check via `AuthStore` status: `"authenticated"` | `"unauthorized"`

## Development Commands
```bash
npm start          # Dev server (Vite)
npm run build      # Production build to ./build
npm run lint       # ESLint
make install       # Build + deploy to production server
```

## Project Domains
Main entities: `proyectos`, `secretarias`, `dependencias`, `equipos`, `hardware`, `software`, `perifericos`, `usuarios`, `reportes`, `labores`, `siembra`, `riego`, `plagas`

## Adding New Features

### New Domain Checklist
1. Create service: `src/services/{domain}/{domain}.service.js`
2. Create store: `src/store/{domain}/{domain}.store.js`
3. Export from `src/store/index.js`
4. Create hook: `src/hook/{domain}/use{Domain}Store.js`
5. Export from `src/hook/index.js`
6. Add views in `src/views/{domain}/`
7. Register routes in `src/router/routes.js`
8. Add translations to `public/locales/*/translation.json`
