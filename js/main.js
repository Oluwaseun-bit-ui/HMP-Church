/* Shared on every page: mobile menu, footer year, next-service countdown (home page). */

/* =========================================================
   Mobile nav + footer year
   ========================================================= */
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);
document.getElementById("year").textContent = new Date().getFullYear();

if (document.getElementById("nextService")) {
  /* =========================================================
     Next service countdown (Lagos time, UTC+1, no DST)
     ========================================================= */
  const SERVICES = [
    { day: 0, h: 8, m: 0, name: "Sunday Worship Service" },
    { day: 2, h: 18, m: 30, name: "Tuesday Service – Digging Deep" },
    { day: 4, h: 18, m: 30, name: "Thursday Service – Faith Clinic" },
  ];
  const SERVICE_LENGTH_MIN = 150; // treat a service as "live" for 2.5 hours

  function lagosNow() {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 60 * 60000);
  }

  function updateNextService() {
    const now = lagosNow();
    let best = null;
    for (let add = 0; add <= 7 && !best; add++) {
      const d = new Date(now);
      d.setDate(now.getDate() + add);
      const todays = SERVICES.filter((s) => s.day === d.getDay()).sort((a, b) => a.h * 60 + a.m - (b.h * 60 + b.m));
      for (const s of todays) {
        const start = new Date(d);
        start.setHours(s.h, s.m, 0, 0);
        const end = new Date(start.getTime() + SERVICE_LENGTH_MIN * 60000);
        if (end > now) { best = { ...s, start, live: start <= now }; break; }
      }
    }
    if (!best) return;

    document.getElementById("nsName").textContent = best.name;
    const timeEl = document.getElementById("nsTime");
    if (best.live) {
      timeEl.innerHTML = 'Happening now · <a href="https://www.youtube.com/@Holinessmodeltv/live" target="_blank" rel="noopener" style="color:#fff">Watch live</a>';
      return;
    }
    const mins = Math.round((best.start - now) / 60000);
    const days = Math.floor(mins / 1440);
    const hrs = Math.floor((mins % 1440) / 60);
    const m = mins % 60;
    const parts = [];
    if (days) parts.push(`${days}d`);
    if (hrs || days) parts.push(`${hrs}h`);
    parts.push(`${m}m`);
    const clock = best.start.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" });
    timeEl.textContent = `in ${parts.join(" ")} · ${clock} WAT`;
  }
  updateNextService();
  setInterval(updateNextService, 30000);
}
