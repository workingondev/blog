# workingon.dev

A minimal personal publication for Akshit's notes on technology, design,
marketing, building, research, and internet culture.

## Stack

- Next.js 16 with the App Router
- TypeScript
- Tailwind CSS 4
- MDX for articles
- Shiki for code highlighting
- KaTeX for mathematics
- Mermaid for diagrams
- D3 for charts

Most pages are rendered as static HTML. Browser JavaScript is limited to the
day/night control and diagrams that need Mermaid.

## Development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run build
```

## Writing a post

1. Add an `.mdx` file to `content/blog`.
2. Export the required metadata at the top of the file.
3. Add the file to `postLoaders` in `content/blog/posts.ts`.
4. Keep table-of-contents IDs synchronized with the article heading IDs.

Set `topic` to one of `Tech`, `Design`, `Marketing`, or `Random`. The writing
page automatically shows filters only for topics that currently have posts;
`tags` remain the more specific subjects displayed on each article.

Registered posts automatically appear on the writing index, sitemap, Atom
feed, related-writing section, and previous/next navigation.

## Publishing standard

Every article should:

- Answer one clear reader question with a descriptive title and introduction.
- Contain original experience, analysis, examples, or diagrams.
- Use one `h1` supplied by the article template, followed by logical `h2` and
  `h3` sections.
- Include descriptive internal links to relevant articles where they help the
  reader, rather than relying only on the related-writing footer.
- Link claims to primary sources whenever possible.
- Provide accurate published and updated dates. Change the updated date only
  after a meaningful revision.
- Give every informative image descriptive alternative text and an optional
  caption that explains why it matters.
- Keep the metadata description specific to the article instead of repeating a
  generic site description.
- Avoid filler written only to reach a word count or target a keyword.

Before publishing, run `npm run lint` and `npm run build`, then inspect the page
on both desktop and mobile. After deployment, validate the canonical URL and
structured data, and request indexing in Google Search Console when needed.

## Production

The canonical site URL is `https://workingon.dev`. Set
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in the deployment environment after
creating the Google Search Console property.

Before publishing, replace the placeholder GitHub and X URLs in
`app/components/site-footer.tsx` with Akshit's profile URLs.
