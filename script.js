// MoveShot — interactividad mínima (sin frameworks).
// Header con estado, scroll suave con offset, menú móvil, dialog del reel, año.

const header = document.getElementById("site-header");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const toTop = document.getElementById("to-top");
const dialog = document.getElementById("reel-dialog");
const reelVideo = document.getElementById("reel-video");

const toggleHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
};
toggleHeader();
window.addEventListener("scroll", toggleHeader, { passive: true });

// Scroll suave compensando el header fijo.
document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const target = document.getElementById(el.dataset.scroll);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
    closeMenu();
  });
});

// Menú móvil.
function closeMenu() {
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Abrir menú");
  mobileMenu.hidden = true;
}
menuBtn.addEventListener("click", () => {
  const open = mobileMenu.hidden;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  mobileMenu.hidden = !open;
});

// Reel: <dialog> nativo, accesible y sin dependencias.
document.getElementById("open-reel").addEventListener("click", () => {
  dialog.showModal();
  reelVideo.play().catch(() => {});
});
const closeReel = () => {
  reelVideo.pause();
  if (dialog.open) dialog.close();
};
document.getElementById("close-reel").addEventListener("click", closeReel);
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) closeReel();
});
dialog.addEventListener("close", () => reelVideo.pause());

// Volver arriba + año dinámico.
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();
