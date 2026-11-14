# Thais Murals

Website for Thais Murals: hand-painted murals in Stockholm by Thais Mota Eriksson. Planned domain: **thaismurals.se**.

Started as a port of the earlier single-file site at https://fabelfabriken.netlify.app/.

## Structure

```
index.html        the page
css/style.css     all styles; design tokens at the top (see DESIGN.md)
js/contact.js     contact form (sends to Formspree)
images/           photos (hero.jpg is the hero image)
DESIGN.md         design system: colours, type, components
```

Plain static HTML, CSS and a little JavaScript, with no build step.

## Run locally

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Deploy

GitHub Pages serves the `main` branch of MaMoEr/ThaisMuralsWeb at https://mamoer.github.io/ThaisMuralsWeb/. Every push to `main` redeploys.

### Connecting thaismurals.se

Do this once the domain is registered:

1. At the domain registrar, add DNS records:
   - `A` records for `thaismurals.se` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - a `CNAME` record for `www` pointing to `mamoer.github.io`
2. Add a file named `CNAME` to the repo root containing `thaismurals.se`, and push.
3. In the repo's Settings → Pages, check the custom domain shows as verified, then tick **Enforce HTTPS**.

Don't add the `CNAME` file before the DNS records exist: GitHub would start redirecting the github.io address to a domain that doesn't answer yet.

## Contact form

The form posts to Formspree. Replace `YOUR_FORM_ID` in `index.html` with the form's ID from formspree.io. In Formspree, add `thaismurals.se` under the form's allowed domains once the site runs there.
