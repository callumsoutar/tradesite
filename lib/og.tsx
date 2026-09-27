import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function ogImage(title: string, kicker = "Website design for NZ tradies") {
  const fontSize = title.length > 70 ? 52 : title.length > 46 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0c0b",
          color: "#ffffff",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: "#ff6a2b",
              marginRight: 16,
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: -0.4 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              color: "#ffb088",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              fontSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.62)" }}>Free website draft within 24 hours</div>
      </div>
    ),
    ogSize,
  );
}
