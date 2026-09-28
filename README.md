# Garvim Energy LLP — Website

Plain HTML/CSS/JS site. No build step, no framework — deploys straight to GitHub Pages.

## Structure
```
index.html
about.html
process.html
products.html
gallery.html
blog.html
blog-how-tyre-pyrolysis-works.html
contact.html
css/style.css
js/main.js
images/        ← put your real photos here
```

## Deploy to GitHub Pages (free)

1. Create a new GitHub repository (e.g. `garvim-website`).
2. Upload all files in this folder to the repo, keeping the folder structure.
3. In the repo: **Settings → Pages → Source** → select the `main` branch, `/ (root)` folder → Save.
4. GitHub gives you a live URL like `https://yourusername.github.io/garvim-website/` within a minute or two.

## Connect your domain (www.garvimenergy.com)

1. In **Settings → Pages**, enter `www.garvimenergy.com` under "Custom domain" — this creates a `CNAME` file in your repo automatically.
2. At your domain registrar, add a **CNAME record** pointing `www` to `yourusername.github.io`.
3. If you also want the bare domain (`garvimenergy.com`) to work, add **A records** pointing to GitHub's IPs (GitHub's docs list the current ones — search "GitHub Pages custom domain A records").
4. Tick "Enforce HTTPS" in Settings → Pages once the domain is verified (can take a few hours).

## Things to finish before going live

1. **Contact form** — open `contact.html`, find:
   `<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">`
   Go to [web3forms.com](https://web3forms.com), enter `garvimenergyllp@gmail.com`, and it emails you a free access key instantly — no account/login needed. Paste it in place of `YOUR_WEB3FORMS_ACCESS_KEY` and the form is live (submissions land in that inbox).
2. **WhatsApp button** — a `wa.me` link can only open one chat, so the floating button and the "Chat on WhatsApp" button use `+91 99130 52200`. All four numbers are already listed as click-to-call on the Contact and footer. Tell me if you'd rather a different number be the WhatsApp one.
3. **Google Map** — the embed currently points to a generic "Simpolo Ceramic, Morbi" search. Share your exact Google Maps pin/coordinates and I'll swap in the precise embed link (in `about.html` and `contact.html`).
4. **Photos** — the Gallery page currently shows six generated placeholder illustrations (`images/gallery-01.svg` … `gallery-06.svg`) standing in for facility exterior, reactor line, oil tanks, carbon char, feedstock, and control room. Send real photos and I'll (or you can) drop them into `/images/` and update the six `<img>` tags in `gallery.html` — real photos will read as far more credible for an industrial B2B site.
5. **About Us details** — founding year, years of operation, team size aren't in the content doc. Send them and I'll add a short line to `about.html`.

## Notes on the build

- Fonts (Poppins + Inter) load from Google Fonts via `<link>` tags — no extra setup needed.
- The hero animation (conveyor → reactor → oil tank + falling char) is hand-built with SVG + CSS, so it's crisp at any size and costs nothing to load beyond the page itself.
- Scroll-reveal, header hide-on-scroll, button ripple, mobile nav, and the page-transition wipe are all in `js/main.js` — one shared file across every page.
- `prefers-reduced-motion` is respected: animations shorten to near-instant for users who've turned off motion in their OS.
