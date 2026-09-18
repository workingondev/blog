import "katex/dist/katex.min.css";
import "./article.css";

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
