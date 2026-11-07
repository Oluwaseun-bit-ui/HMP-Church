# RCCG Holiness Model Parish website

A simple multi-page church website that also works as an information directory. It is plain HTML, CSS and JavaScript, so there is no build step and no server.

## Files
| File | What it is |
|---|---|
| `index.html` | Home page: welcome, next-service countdown, links to every page |
| `services.html` | Service times |
| `about.html` | About the parish |
| `directory.html` | Information directory (searchable) |
| `events.html` | Upcoming events |
| `gallery.html` | Photo gallery with filters and a full-screen viewer |
| `visit.html` | Address, map and directions |
| `css/styles.css` | Design shared by all pages |
| `js/main.js` | Mobile menu and countdown, shared by all pages |
| `js/gallery.js` | Gallery filters and photo viewer |
| `js/directory.js` | **Directory entries.** Edit the `DIRECTORY` list at the top |
| `assets/logo.png` | Church logo (also used as the browser tab icon) |
| `assets/photos/` | Church photos (resized for fast loading) |

## Updating content
- **Directory:** add or edit entries in `js/directory.js`.
- **Events:** edit `events.html`. Also update the "Coming up" card on `index.html`.
- **Service times:** update `services.html`, `visit.html`, the footer on each page, and `SERVICES` in `js/main.js`.
- **Photos:** resize new photos to about 1600px wide, put them in `assets/photos/`, and copy one of the `<figure class="g-item">` blocks in `gallery.html`.
- **Header/footer:** these are repeated on every page, so make the same change in all seven HTML files.

## Hosting (free)
Pick one:
1. **Netlify Drop**: drag this folder onto https://app.netlify.com/drop
2. **Cloudflare Pages** or **GitHub Pages**: connect a repo containing these files

Then point a domain at it (for example `holinessmodelparish.org` or `hmp.org.ng`) and turn on HTTPS. Only the domain costs money, roughly once a year.

## Confirm with the church office before launch
- [ ] HMP logo file (high resolution, preferably PNG)
- [ ] Names of the Tuesday and Thursday services
- [ ] Monthly Thanksgiving timing (currently first Sunday, 9:00am)
- [ ] EVP (Early Victory Prayers) days and time
- [ ] List of units and ministries, plus contact people
- [ ] Church office phone, email and WhatsApp
- [ ] Exact Facebook page URL (the footer currently links to a Facebook search)
- [ ] Pastor's name and photo, if they want it shown
- [ ] Photos from Instagram (with permission) for the hero and events sections
