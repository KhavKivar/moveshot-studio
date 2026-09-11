# MoveShot — sitio estático

Sitio de la productora MoveShot (Santiago, Chile) en HTML + CSS + JS puro, sin frameworks.
El contenido viene renderizado en el HTML para SEO (antes era un SPA de React con `<div id="root">` vacío).

## Estructura

- `index.html` — contenido + metas SEO/OG + JSON-LD
- `styles.css` — todo el diseño (~16 KB)
- `script.js` — header, menú móvil, scroll suave, lightbox del reel (~2 KB)
- `public/` — se copia tal cual a `dist/`
  - `assets/videos/hero-reel.mp4` + póster
  - `assets/images/` — fotos BTS + `og-cover.jpg` (1200×630)
  - `assets/logos/` — logos de clientes
  - `robots.txt`, `sitemap.xml` (dominio canónico: `https://moveshot.cl/`)
- `screenshots/` — capturas de las direcciones de diseño exploradas

## Desarrollo

Requisitos: Node.js 20+ y pnpm.

```bash
pnpm install
pnpm run dev      # http://localhost:3000
pnpm run build    # genera dist/
pnpm run preview  # sirve dist/ local
```

## Deploy

Automático a Cloudflare Pages con push a `main` (`.github/workflows/` → `pnpm run build` → `dist/`).
No se tocó el pipeline: `build` sigue generando `dist/`.

## Pendientes del dueño

- [ ] Confirmar dominio canónico (ahora `moveshot.cl` en metas, sitemap y JSON-LD).
- [ ] Reemplazar WhatsApp `56900000000` en `index.html` por el número real.
- [ ] Comprimir `hero-reel.mp4` (18 MB, 113 s) o subirlo a Stream/R2 si el LCP sufre.
- [ ] Registrar el sitio en Google Search Console y pedir indexación.

El material de marcas es propiedad de sus respectivos dueños y se incluye solo para mostrar el trabajo realizado.
