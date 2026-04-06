import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background:
            "linear-gradient(135deg, rgba(247,242,234,1) 0%, rgba(236,223,210,1) 100%)",
          color: "#211b17",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            fontWeight: 600,
            color: "#8e5e3b",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              background: "rgba(255,255,255,0.8)",
              color: "#5a3621",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            AA
          </div>
          Алёна Алмасова
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            Трихопигментация кожи головы и медицинский камуфляж
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#5f534a",
              maxWidth: 930,
            }}
          >
            Москва и Алматы. Залысины, редкая макушка, рубцы на голове, случаи после
            пересадки волос, консультация и реальные работы.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 22,
            color: "#5a3621",
          }}
        >
          <div
            style={{
              padding: "14px 22px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.82)",
            }}
          >
            Естественный результат
          </div>
          <div
            style={{
              padding: "14px 22px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.82)",
            }}
          >
            Медицинский подход
          </div>
        </div>
      </div>
    ),
    size,
  );
}
