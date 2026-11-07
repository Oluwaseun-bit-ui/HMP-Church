/* =========================================================
   INFORMATION DIRECTORY DATA
   ---------------------------------------------------------
   Edit this list to update the directory on the website.
   type: "programme" | "unit" | "contact"
   tbc:  true shows a "To be confirmed" badge. Set it to false
         once the church office has confirmed the details.
   ========================================================= */
const DIRECTORY = [
  {
    type: "contact",
    title: "Church Address",
    when: "5 Ayodele Fanoiki Street, Magodo Phase 1, Lagos",
    desc: "Our parish, RCCG Province of Ceaseless Praise.",
    link: { label: "Get directions", url: "https://www.google.com/maps/dir/?api=1&destination=5+Ayodele+Fanoiki+Street,+Magodo+Phase+1,+Lagos" },
  },
  {
    type: "contact",
    title: "Instagram",
    when: "@rccg_hmp",
    desc: "Announcements, flyers, photos and direct messages.",
    link: { label: "Open Instagram", url: "https://www.instagram.com/rccg_hmp" },
  },
  {
    type: "contact",
    title: "YouTube: Holiness Model TV",
    when: "@Holinessmodeltv",
    desc: "Live services and over 1,000 past videos.",
    link: { label: "Open YouTube", url: "https://www.youtube.com/@Holinessmodeltv" },
  },
];

/* =========================================================
   Render directory
   ========================================================= */
const TYPE_LABEL = { programme: "Programme", unit: "Unit / Ministry", contact: "Contact" };
const grid = document.getElementById("dirGrid");
const empty = document.getElementById("dirEmpty");
const search = document.getElementById("dirSearch");

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderDirectory() {
  const q = search.value.trim().toLowerCase();
  const items = DIRECTORY.filter((d) => {
    if (!q) return true;
    return [d.title, d.when, d.desc, TYPE_LABEL[d.type]].join(" ").toLowerCase().includes(q);
  });

  grid.innerHTML = items
    .map(
      (d) => `
    <article class="dir-card">
      <span class="tag ${d.type}">${TYPE_LABEL[d.type]}</span>
      <h3>${esc(d.title)}</h3>
      ${d.when ? `<span class="when">${esc(d.when)}</span>` : ""}
      ${d.desc ? `<p>${esc(d.desc)}</p>` : ""}
      ${d.tbc ? `<span class="tbc">To be confirmed</span>` : ""}
      ${d.link ? `<a href="${esc(d.link.url)}" target="_blank" rel="noopener">${esc(d.link.label)} →</a>` : ""}
    </article>`
    )
    .join("");
  empty.hidden = items.length > 0;
}

search.addEventListener("input", renderDirectory);
renderDirectory();
