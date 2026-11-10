# [YOUR NAME] — portfolio template

A lightweight, multi-page portfolio template designed to work directly on GitHub Pages. It uses only HTML, CSS, and JavaScript—no build step required.

## Repository structure

```text
.
├── index.html                 # Homepage / story, focus areas, selected work
├── pages/                     # Additional site pages
│   ├── projects.html           # Project archive
│   ├── experience.html         # Activities and experience timeline
│   ├── about.html              # Personal context and contact
│   └── immersive.html          # Optional interactive visual page
├── assets/
│   ├── css/                    # Design tokens, shared styles, page styles
│   └── js/                     # Shared motion and immersive canvas behavior
├── content/
│   └── CONTENT_GUIDE.md        # Writing and public-safety guidance
├── README.md                   # This guide
└── LICENSE                     # Your selected repository license
```

## Edit the template

1. Search the project for square-bracketed text such as `[YOUR NAME]`.
2. Replace only information you can support truthfully.
3. Add project links to the `href="[PROJECT LINK]"` placeholders.
4. Keep `assets/css/tokens.css` as the single source of truth for the color palette.

## Preview locally

Open `index.html` in a browser. Because the site has no build step, the browser can render it directly.

## Publish with GitHub Pages

In GitHub, open **Settings → Pages** and select the `main` branch and `/ (root)` folder. GitHub will provide the public URL after deployment.

## Design notes

This is an original implementation inspired by a dark editorial portfolio pattern: large typography, high-contrast cards, a restrained accent palette, and respectful motion controls. It does not reuse the reference website’s code, writing, images, or branded content.
