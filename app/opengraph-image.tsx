import { ImageResponse } from "next/og";

export const alt =
  "Akshit — research on cryptography, blockchains, and distributed systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 880,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 60,
            letterSpacing: "-2.5px",
            lineHeight: 1.08,
          }}
        >
          Cryptography, blockchains, and distributed systems.
        </div>
        <div
          style={{
            color: "#737373",
            display: "flex",
            fontSize: 24,
            marginTop: 30,
          }}
        >
          Research notes from first principles.
        </div>
      </div>
      <div style={{ color: "#737373", display: "flex", fontSize: 20 }}>
        workingon.dev
      </div>
    </div>,
    size,
  );
}
