import type { MDXComponents } from "mdx/types";
import { GroverWorkFactorChart } from "./app/components/grover-work-factor-chart";
import { Mermaid } from "./app/components/mermaid";

const components: MDXComponents = {
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  a: ({ href = "", ...props }) => {
    const isExternal = href.startsWith("http");

    return (
      <a
        href={href}
        {...props}
        {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      />
    );
  },
  Note: ({ children }: { children: React.ReactNode }) => (
    <aside className="article-note">{children}</aside>
  ),
  Mermaid,
  GroverWorkFactorChart,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
