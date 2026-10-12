# Portfolio Chatbot Worker

A small Cloudflare Worker that answers visitor questions about the
portfolio, grounded in the same content (`../src/data/*.json`) the React
app uses. Built because GitHub Pages can only serve static files — this is
the one piece of server-side compute the chatbot needs, just to call the
Groq API without exposing the API key in the browser.

## How it works

```
Browser (ChatWidget)  →  this Worker  →  Groq API
```

The Worker builds a system prompt from the portfolio's profile, experience,
projects, and skills (see `src/context.ts`), forwards the visitor's message
to Groq along with it, and returns the reply. The frontend never sees the
Groq API key — it only ever talks to this Worker's public URL.

## Setup

```bash
npm install
npx wrangler login          # one-time OAuth to your Cloudflare account
npm run secret:groq         # paste your Groq API key when prompted —
                             # stored encrypted in Cloudflare, never in this repo
```

Get a free Groq API key at https://console.groq.com.

## Develop locally

```bash
npm run dev    # wrangler dev — runs the Worker on http://localhost:8787
```

## Deploy

```bash
npm run deploy
```

Prints the Worker's public URL (something like
`https://portfolio-chatbot.<your-subdomain>.workers.dev`). Put that in
`frontend/.env` as `VITE_CHAT_API_URL` so the chat widget knows where to
send requests.

## Config

`wrangler.toml`'s `[vars]` holds non-secret config:

- `GROQ_MODEL` — which Groq model to call.
- `ALLOWED_ORIGINS` — comma-separated list of origins the Worker accepts
  CORS requests from. Update this if the site's domain changes.

The Groq API key is never in a file here — only in Cloudflare's own secret
store, set via `npm run secret:groq`.
