# Raj's Portfolio

A clean, animated developer portfolio built with **Next.js 15**, **Tailwind CSS v4**, and **Framer Motion**.

## Features

- Floating glass header with smooth-scroll navigation
- Dark / light theme toggle (follows system preference by default)
- Scroll-reveal animations on every section
- Floating colorful code symbols + glow blobs in the hero
- Space Grotesk / Inter / JetBrains Mono typography
- Fully responsive (mobile menu included)

## Editing your content

**Everything personal lives in one file: [`data/content.ts`](data/content.ts).**

Update your name, tagline, GitHub/LinkedIn URLs, experience bullets, skills, and
education there — no component changes needed. Search for `TODO` comments to find
the placeholders you still need to replace.

**Resume:** drop your resume as `public/resume.pdf` so the "Download Resume"
button works.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset is auto-detected as Next.js — just click **Deploy**.
