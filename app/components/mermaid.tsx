"use client";

import { useEffect, useId, useState } from "react";

type MermaidProps = {
  chart: string;
  caption: string;
  label: string;
};

export function Mermaid({ chart, caption, label }: MermaidProps) {
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let renderCount = 0;

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;
        const isNight = document.documentElement.classList.contains("dark");

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: isNight ? "dark" : "neutral",
          fontFamily: "var(--font-inter), sans-serif",
          themeVariables: {
            fontSize: "13px",
            primaryColor: isNight ? "#1f1f1f" : "#f5f5f5",
            primaryTextColor: isNight ? "#e5e5e5" : "#262626",
            primaryBorderColor: isNight ? "#525252" : "#a3a3a3",
            lineColor: isNight ? "#737373" : "#737373",
          },
        });

        const id = `mermaid-${reactId.replace(/:/g, "")}-${renderCount++}`;
        const result = await mermaid.render(id, chart);

        if (!cancelled) {
          setSvg(result.svg);
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void renderDiagram();

    const observer = new MutationObserver(() => void renderDiagram());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [chart, reactId]);

  return (
    <figure className="research-figure">
      {svg ? (
        <div
          className="mermaid-diagram"
          role="img"
          aria-label={label}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="mermaid-diagram" role="status" aria-live="polite">
          <span className="diagram-status">
            {failed
              ? "The diagram could not be rendered."
              : "Rendering diagram…"}
          </span>
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
