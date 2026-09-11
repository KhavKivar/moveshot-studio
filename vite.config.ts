import {defineConfig} from 'vite';

// Sitio estático puro (HTML + CSS + JS). Vite solo copia/minifica a dist/.
// El deploy a Cloudflare Pages (workflow en .github/) no cambia.
export default defineConfig({
  publicDir: 'public',
});
