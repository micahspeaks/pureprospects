# Pure Prospects — Hybrid Homepage Concept

A polished, responsive **static website** mockup built for Pure Prospects. No npm packages or accounts are required to run it. This is **Concept 01: Hybrid Brand** — a mix of recruiting services, prospect highlights, sports coverage, and media.

## Preview locally

Open `index.html` in your browser, or use a local web server:

```bash
python3 -m http.server 3000
```

Then visit `http://localhost:3000`.

## Deploy to Vercel

**Option A — Vercel CLI** (easiest if you have it installed):

1. Extract the ZIP.
2. Open a terminal in the `pure-prospects-hybrid` folder.
3. Run `npx vercel` to create a preview or `npx vercel --prod` when you're ready to publish.
4. When prompted, choose **Other** or **No Framework**. Keep the project root at `./`. The site needs no build command and no output directory.

**Option B — GitHub + Vercel Dashboard:**

1. Upload the **contents** of this folder to a new GitHub repository.
2. In Vercel choose **Add New → Project**, import the repository, and choose **Other** / **No Framework Preset**.
3. Leave build command blank and deploy. Vercel will serve the `index.html` page and the assets folder.

You can also use Vercel's drag-and-drop deployment flow if available in your account; the complete folder (not index.html alone) is needed.

## What's included

- Responsive sports-media hero, branded with actual Pure Prospects social artwork
- Mobile menu, anchor navigation, and scroll effects
- Interactive Class of 2027 / 2028 prospect filters
- Clickable athlete profile detail modals
- Recruiting services, evaluation CTA, editorial news grid, and podcast section
- FAQ accordion
- Contact form that generates an email draft (no backend)
- Open Graph metadata, page title and favicon

## Update before publishing for a client

- **Replace screenshots:** The cropped social assets in `assets/` came from the screenshots supplied for this concept. Get the client's approval, high-resolution originals, and confirmation of photo/graphics rights before final publication. The site should not be presented as an official finished website without client authorization.
- **Verify claims:** The *1,500+ coaches* and *5M+ views* figures are taken from Pure Prospects' own promotional graphic. Verify these and remove the mockup's verification note after approval. The `KY → USA` line is a style treatment, not a measured claim.
- **Confirm player stats, content, links and contact info:** Player stats are samples transcribed from the provided social screenshots. Instagram post cards link to the profile rather than particular posts. The YouTube URL and Substack should be reviewed and corrected as necessary.
- **Make the form real:** The contact form currently creates a pre-filled email message using `mailto:`. For production, connect to Formspree, Resend, a Vercel serverless API route, or the client's CRM.
- **No payments are set up:** The $50 evaluation offer is visual information from the supplied social promotion; the CTA takes users to the inquiry form rather than collecting payment.

## Files

- `index.html` — all content and structure
- `styles.css` — complete theme, responsive layout, animations
- `app.js` — mobile navigation, class filters, player modals and form behavior
- `assets/` — screenshots cropped into optimized WEBP images

Edit content directly in `index.html`; adjust colors near the beginning of `styles.css`.

Concept by Micah SEO · Not affiliated with or officially endorsed by Pure Prospects until approved.
