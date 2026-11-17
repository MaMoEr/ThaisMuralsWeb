# Thais Murals design system

Warm, minimal, modern, artistic. The murals are the loudest thing on the page; type and colour stay quiet around them.

The tokens live at the top of [css/style.css](css/style.css). Change them there, not in individual rules.

## Colour

| Token | Hex | Use |
|---|---|---|
| `--linen` | `#F6F2EA` | Page background |
| `--sand` | `#E7DDCF` | Hero text panel, process section, quiet bands |
| `--taupe` | `#A58F76` | Lines and small details only. Never text (too little contrast) |
| `--clay` | `#574C3F` | Body text |
| `--espresso` | `#36302A` | Headings, buttons, the dark contact section |
| `--driftwood` | `#65594B` | Labels, captions, footer |
| `--line` | taupe at 45 % | Dividers between services |

On the dark contact section, text is `--sand` and headings are `--linen`; the button flips to linen with espresso text.

## Type

Both fonts load from Google Fonts in `index.html`.

| Role | Font | Size | Notes |
|---|---|---|---|
| Display (hero) | Instrument Serif 400 | 56 to 104 px (`--text-display`) | Line height 0.92 |
| Section headings | Instrument Serif 400 | 44 to 84 px (`--text-h2`) | Line height 0.95 |
| Body | Instrument Sans 400 | 17 px / 1.65 | Max about 58 characters per line |
| Small body | Instrument Sans 400 | 15 px | Hero lede, service text |
| Labels, eyebrows, buttons | Instrument Sans 500 to 600 | 12 px caps | Letter spacing 0.16 to 0.2 em |

**One italic phrase per heading.** Each heading puts its last two or three words in `<em>` (Instrument Serif italic), for example *Walls that tell <em>stories.</em>* It is the brushstroke of the system. Use it once per heading, never in body text.

Keep Instrument Serif at 26 px or larger; it is thin and loses detail when small.

## Components

- **Button**: solid espresso, linen text, square corners, 12 px caps. Hover inverts to outline. On espresso backgrounds it becomes linen with espresso text.
- **Eyebrow**: 12 px caps label in driftwood above every heading.
- **Hero**: split layout. Sand text panel on the left (5 parts), mural photo on the right (7 parts), nothing over the mural. On phones the photo comes first.
- **Testimonials**: directly below the hero. Heading left, reviews right, each a sand card (`<figure class="testimonial">`, square corners). The card opens with the reviewer: round 56 px profile picture (the one exception to square photos), first name, and the source (e.g. `@handle · via Instagram`). Then the quote in Instrument Serif italic at `--text-h3` in the client's own language (set `lang` on the `<blockquote>`), and an English translation in small body text if it isn't English. No star ratings unless the client actually gave one. Add more by repeating the `<figure>`; they stack.
- **Contact form**: on the espresso contact section. Fields are underlined inputs with 12 px caps labels in sand; optional fields say "optional". Type of space is a row of square chips (selected = linen fill). Sends to Formspree via [js/contact.js](js/contact.js); every "Request a mural" button links to `#contact`.
- **About** (`#about`): directly under the testimonials, separated by a line. Text left, portrait right.
- **Services**: a row of label + short text cells between lines. `.services.three` for three items; it stacks to one column on phones.
- **Steps** (`<ol class="steps">`, in the process section): numbered 01, 02… in driftwood, step name in 12 px caps, one line of small body text. Lines between steps.
- **FAQ** (`#faq`): heading left, content right, like the testimonials. The FAQ is native `<details>`/`<summary>` (no JS); questions are Instrument Sans 500, not the serif, with a `+` that turns into `×` when open. Hide an unanswered question in an HTML comment rather than publishing a placeholder.
- **Projects page** (`projekt.html`): the nav gets `.nav.onLight` (static, espresso text) because there is no hero photo behind it; its links point to `index.html#…`. Each project is a `<figure class="project">` with a `.projectGrid` (3 columns; the first photo spans 2 when there are several) and a one-line caption: project name in bold, then the place or status. The home page gallery links here with "Se alla projekt →".
- **Language**: Swedish is the default and lives at the root (`index.html`, `projekt.html`); English mirrors it under `en/` (`en/index.html`, `en/projects.html`). Every change to copy goes into both. Section IDs stay the same in both languages. The nav ends with a `.langSwitch` (`EN` / `SV`) linking to the same page in the other language; it sits outside `.navlinks` so it stays visible on phones. Each page's `<head>` lists both versions with `hreflang` (`x-default` = Swedish). Use relative paths only (`../css/…` from `en/`), since the github.io address serves the site from a subfolder. [js/contact.js](js/contact.js) picks its messages from `<html lang>`.
- **Photos**: full-bleed, no borders or rounded corners. A light shared filter keeps them consistent (`img` rule).
