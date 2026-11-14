# Fabelfabriken

Website for Fabelfabriken: hand-painted murals in Stockholm by Thais Mota Eriksson.

Ported from the original single-file site at https://fabelfabriken.netlify.app/. The embedded images were extracted into `images/` and the inline CSS was moved to `css/style.css`.

## Structure

```
index.html        the page
css/style.css     all styles
images/           photos (hero.jpg is the hero background)
```

Plain static HTML and CSS, with no build step.

## Run locally

```bash
python -m http.server 8080
```

Then open http://localhost:8080.
