/* Gallery page: filter buttons + full-screen photo viewer (lightbox). */

const items = Array.from(document.querySelectorAll(".g-item"));
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
let current = 0;
let lastFocus = null;

/* ---- Filters ---- */
document.querySelectorAll(".g-filters .chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    document.querySelectorAll(".g-filters .chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    items.forEach((it) => (it.hidden = f !== "all" && it.dataset.event !== f));
  })
);

/* ---- Lightbox ---- */
function visibleItems() {
  return items.filter((it) => !it.hidden);
}

function show(item) {
  const img = item.querySelector("img");
  const cap = item.querySelector("figcaption");
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCap.innerHTML = cap.innerHTML;
  current = visibleItems().indexOf(item);
}

function open(item) {
  lastFocus = document.activeElement;
  show(item);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lb-close").focus();
}

function close() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

function step(dir) {
  const list = visibleItems();
  current = (current + dir + list.length) % list.length;
  show(list[current]);
}

items.forEach((it) => it.querySelector(".g-open").addEventListener("click", () => open(it)));
lightbox.querySelector(".lb-close").addEventListener("click", close);
lightbox.querySelector(".lb-prev").addEventListener("click", () => step(-1));
lightbox.querySelector(".lb-next").addEventListener("click", () => step(1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) close();
});
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

/* Swipe left/right on phones */
let touchX = null;
lightbox.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
lightbox.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  touchX = null;
});

/* Open straight to a photo when arriving from the home page (gallery.html#photo-2) */
const fromHash = location.hash && document.querySelector(location.hash + ".g-item");
if (fromHash) open(fromHash);
