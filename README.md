# Yonghua Yang (Flora) — Personal Website

A minimal, responsive academic website for GitHub Pages. It uses plain HTML, CSS, and JavaScript with no build step.

The abstract paper-and-pastel background is stored locally at `assets/philosophy-background.webp`.

## Search indexing

The page includes canonical, robots, Open Graph, Twitter Card, and Schema.org `ProfilePage` metadata. Submit `https://yangyonghua19.github.io/Flora/sitemap.xml` in Google Search Console after deployment.

For Google Search Console ownership verification, add the verification `<meta>` element supplied by Google inside the document `<head>`, deploy it, and then click **Verify** in Search Console.

## Portrait

The About portrait is stored locally at `assets/picture.png`.

## Add a CV

When the PDF is ready, add it as `cv.pdf`, then change the header CV item to `<a class="cv-link" href="cv.pdf" target="_blank" rel="noreferrer">CV</a>`.

The light/dark preference is saved in the visitor's browser. Without a saved preference, the page follows the operating-system setting.

## Publish with GitHub Pages

Push these files to the repository root. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
