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
- **Contact form**: on the espresso contact section. Fields are underlined inputs with 12 px caps labels in sand; optional fields say "optional". Type of space is a row of square chips (selected = linen fill). Sends to Formspree via [js/contact.js](js/contact.js); every "Request a mural" button links to `#contact`.
- **Photos**: full-bleed, no borders or rounded corners. A light shared filter keeps them consistent (`img` rule).
