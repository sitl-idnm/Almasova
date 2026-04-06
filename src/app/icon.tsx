import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, rgba(255,250,245,1) 0%, rgba(244,231,218,1) 100%)",
          color: "#5a3621",
          fontSize: 180,
          fontWeight: 700,
          letterSpacing: "-0.08em",
        }}
      >
        AA
      </div>
    ),
    size,
  );
}
