import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { GroverWorkFactorChart } from "./app/components/grover-work-factor-chart";
import { Mermaid } from "./app/components/mermaid";
import { ShorPeriodChart } from "./app/components/shor-period-chart";

const components: MDXComponents = {
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  a: ({ href = "", ...props }) => {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return <a href={href} {...props} target="_blank" rel="noreferrer" />;
    }

    return <Link href={href} {...props} />;
  },
  Note: ({ children }: { children: React.ReactNode }) => (
    <aside className="article-note">{children}</aside>
  ),
  Mermaid,
  GroverWorkFactorChart,
  ShorPeriodChart,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
