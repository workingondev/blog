import { ImageResponse } from "next/og";

export const alt = "writing by akshit on technology, design, marketing, and ideas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BlogOpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#fafafa",
        color: "#171717",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 80px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", fontSize: 24 }}>akshit</div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          writing
        </div>
        <div
          style={{
            color: "#737373",
            display: "flex",
            fontSize: 25,
            lineHeight: 1.4,
            marginTop: 30,
          }}
        >
          Technology · design · marketing · research · internet culture
        </div>
      </div>
      <div style={{ color: "#737373", display: "flex", fontSize: 20 }}>
        workingon.dev/blog
      </div>
    </div>,
    size,
  );
}
