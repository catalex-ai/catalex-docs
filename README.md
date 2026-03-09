# CatalEx Docs

Documentation site for [CatalEx](https://catalex.co) — AI-powered workplace intelligence. Built with [Docusaurus 3](https://docusaurus.io/).

**Live site:** [docs.catalex.co](https://docs.catalex.co)

## Development

```bash
npm install
npm start
```

Starts a local dev server at `http://localhost:3000` with hot reload.

## Build

```bash
npm run build
```

Generates static files into `build/`. Preview locally with `npm run serve`.

## Deployment

The `deploy` branch contains the production build output and is served via GitHub Pages.

```bash
npm run build
# push build/ contents to the deploy branch
```

## Theming

Colors and fonts match the [catalex.co](https://catalex.co) brand:

- **Primary:** `#2D4A53` (dark teal from brand palette)
- **Heading font:** Outfit
- **Body font:** Inter
- **Light/dark mode** with system preference detection

Theme customization lives in:

- `docusaurus.config.ts` — site config, navbar, footer, color mode, prism themes
- `src/css/custom.css` — CSS variables, component overrides, dark mode styles
