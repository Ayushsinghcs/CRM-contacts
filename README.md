# CRM Contacts (Compact Guide)

## How to run the app
- Install: `npm install`
- Dev: `npm run dev` (http://localhost:5175/)
- Build: `npm run build`
- Preview build: `npm run preview`

## Tech stack used
- React + Vite
- TailwindCSS
- ESLint

## Folder structure
```
crm-contacts/
├─ public/                      # Static assets (served as-is)
├─ src/
│  ├─ assets/                   # Images, icons, fonts
│  ├─ components/
│  │  ├─ common/                # Accordion, Avatar, CollapsibleSection, Tabs, Tags
│  │  ├─ form/                  # Field, FieldRenderer, ContactFields
│  │  └─ layout/                # LayoutRenderer, DynamicComponent, NotesSidebar, SidebarHeader
│  ├─ features/
│  │  ├─ contacts/              # ProfileCard, SearchAndFilter
│  │  ├─ conversations/         # ConversationsPanel
│  │  └─ notes/                 # Notes
│  ├─ hooks/                    # Custom hooks
│  ├─ pages/                    # ContactDetailsPage, ConfigurationSwitcher
│  ├─ styles/                   # index.css
│  ├─ data/                     # JSON configs & mock data (see below)
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
└─ vite.config.js
```

## How each JSON config is used (src/data/)
- contacts.json / contacts-alt.json: Contact profile data used by pages and passed to UI.
- conversations.json: Feeds `features/conversations/ConversationsPanel.jsx`.
- notes.json: Feeds `components/layout/NotesSidebar.jsx`.
- contactFields.json: Field groups/metadata used by form components to render fields.
- layout.json / layout-alt.json: Page layout definitions consumed by `components/layout/LayoutRenderer.jsx`.

Notes:
- JSON files are imported directly (no network fetch).
- Edit these JSONs to change UI/data without modifying component code.

## Known issues
- No runtime JSON schema validation (expects valid structure).
- Static demo data (no persistence/backend).
- Tailwind config may need tuning for production.
