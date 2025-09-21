# CRM Contacts (Compact Guide)
Demo: https://highlevel-crm.netlify.app/
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

## Optional: Simulate switching JSON layout at runtime
You can toggle between `src/data/layout.json` (default) and `src/data/layout-alt.json`, and also edit the active layout JSON at runtime on the contact details page.

Where:
- Implemented in `src/pages/ContactDetailsPage.jsx`.

How to use:
- Run the app and open the Contact Details view.
- bottom-right controls:
  - "Default Layout" / "Alt Layout": switch between `layout.json` and `layout-alt.json` sources.
  - "Edit Layout JSON": opens a modal with the currently applied layout (normalized) that you can edit live.
  - Note: These controls are visible on desktop (lg+) only due to design constraints.

What it does:
- Switches the `layout` prop passed into `components/layout/LayoutRenderer.jsx` between the two JSON layout definitions without reloading the page.
- The editor modal accepts either of the following input schemas and normalizes them for the renderer:
  1) Columns schema (native to the renderer):

     ```json
     {
       "columns": [
         { "id": "left", "components": [ { "type": "ProfileCard" } ] },
         { "id": "main", "components": [ { "type": "ConversationsPanel" } ] },
         { "id": "right", "components": [ { "type": "NotesSidebar" } ] }
       ]
     }
     ```

  2) Sections schema (like `layout-alt.json`):

     ```json
     {
       "sections": [
         { "id": "contact_info", "title": "Contact Information", "component": "ContactFields" },
         { "id": "notes", "title": "Activity Timeline", "component": "Notes" }
       ]
     }
     ```

Notes:
- The in-app editor updates the UI immediately but does not write to files on disk. Refreshing the page resets to the JSON files.
- Component types must be supported by `src/components/layout/DynamicComponent.jsx`.
 - The editor and controls are desktop-only (lg+) to preserve mobile layout and screen space.

## Known issues
- No runtime JSON schema validation (expects valid structure).
- Static demo data (no persistence/backend).
- Tailwind config may need tuning for production.

