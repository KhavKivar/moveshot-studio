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

// Portafolio: filtros + ficha de proyecto en <dialog>.
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectCards = [...document.querySelectorAll(".project-card")];
const projectsStatus = document.getElementById("projects-status");
const projectDialog = document.getElementById("project-dialog");
const projectVideo = document.getElementById("project-video");
const projectCategory = document.getElementById("project-category");
const projectYear = document.getElementById("project-year");
const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");
const projectClient = document.getElementById("project-client");
const projectRole = document.getElementById("project-role");
const projectCamera = document.getElementById("project-camera");
const projectDate = document.getElementById("project-date");
let lastProjectTrigger = null;

const updateProjectsStatus = (filter) => {
  if (!projectsStatus) return;
  const visible = projectCards.filter((card) => !card.hidden).length;
  const label = filter === "Todos" ? "proyectos" : filter === "Videoclip" ? "videoclips" : "comerciales";
  projectsStatus.textContent = `${visible} ${visible === 1 ? label.slice(0, -1) : label}`;
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
    projectCards.forEach((card) => {
      card.hidden = filter !== "Todos" && card.dataset.category !== filter;
    });
    updateProjectsStatus(filter);
  });
});
updateProjectsStatus("Todos");

const closeProject = () => {
  if (!projectDialog) return;
  projectVideo.pause();
  projectVideo.removeAttribute("src");
  projectVideo.load();
  if (projectDialog.open) projectDialog.close();
  if (lastProjectTrigger) lastProjectTrigger.focus();
};

projectCards.forEach((card) => {
  const trigger = card.querySelector(".project-trigger");
  if (!trigger) return;
  trigger.addEventListener("click", () => {
    lastProjectTrigger = trigger;
    const title = card.querySelector("h3")?.textContent.trim() ?? "";
    projectCategory.textContent = card.dataset.category ?? "";
    projectYear.textContent = `AÑO ${card.dataset.year ?? ""}`;
    projectTitle.textContent = title;
    projectDescription.textContent = card.dataset.description ?? "";
    projectClient.textContent = card.dataset.client ?? "";
    projectRole.textContent = card.dataset.role ?? "";
    projectCamera.textContent = card.dataset.camera ?? "";
    projectDate.textContent = card.dataset.year ?? "";
    projectVideo.setAttribute("src", card.dataset.video ?? "");
    projectVideo.load();
    projectDialog.showModal();
    projectVideo.play().catch(() => {});
  });
});
document.getElementById("close-project")?.addEventListener("click", closeProject);
projectDialog?.addEventListener("click", (e) => {
  if (e.target === projectDialog) closeProject();
});
projectDialog?.addEventListener("close", () => {
  projectVideo.pause();
  if (lastProjectTrigger) lastProjectTrigger.focus();
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
