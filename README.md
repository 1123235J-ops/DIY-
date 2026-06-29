# BuildItDIY

An open-source DIY project browser — mobile-first, fast, and fully filterable.

**MIT Licensed** · Built with React + Vite + Tailwind CSS

---

## Features

- **42 curated projects** spanning 10 aesthetic styles
- **Style gallery** — Retro, Vintage, Modern, Rustic, Industrial, Minimalist, Farmhouse, Boho, Coastal, Mid-Century
- **Filters** — by Room, Skill level, Time commitment, and full-text search
- **Save projects** — bookmark favourites, view them in the Saved tab
- **Detail modal** — tools list, materials list, step count, cost and time estimates
- **Mobile-first** — bottom tab navigation, safe-area insets, momentum scrolling, 2-column grid
- **Zero external UI library** — just Tailwind utility classes

## Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Framework  | React 19 + Vite 8             |
| Styling    | Tailwind CSS v4 (Vite plugin) |
| Icons      | Lucide React                  |
| License    | MIT                           |

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build   # output in /dist
npm run preview # preview the production build
```

## Project Structure

```
src/
  data/
    projects.js          # 42 projects + style/filter constants
  components/
    Header.jsx           # sticky search bar
    StyleGallery.jsx     # horizontal style selector
    FilterBar.jsx        # room / skill / time filter strips
    ProjectCard.jsx      # grid card with save button
    ProjectModal.jsx     # full project detail sheet
    BottomNav.jsx        # mobile tab bar (Browse · Saved · Styles)
    SavedView.jsx        # saved projects tab
    StylesView.jsx       # style picker tab (mobile)
  App.jsx                # state, filtering, layout
  index.css              # Tailwind import + global resets
```

## Contributing

PRs welcome! To add a project, add an entry to `src/data/projects.js` following the existing schema.

## License

[MIT](LICENSE)
