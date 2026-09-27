import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0c0b",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 88,
              height: 52,
              border: "7px solid white",
              borderBottom: "none",
              borderRadius: "6px 6px 0 0",
            }}
          />
          <div style={{ display: "flex", marginTop: -7 }}>
            <div style={{ width: 26, height: 34, background: "#0e0c0b" }} />
            <div style={{ width: 36, height: 34, background: "#ff6a2b" }} />
            <div style={{ width: 26, height: 34, background: "#0e0c0b" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
