import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get("title") ?? "NOREN 暖簾"
  const subtitle = searchParams.get("subtitle") ?? "Japanese-Inspired Apparel"
  const emoji = searchParams.get("emoji") ?? "🍜"

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0f0f0f",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Red accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#c8102e",
          }}
        />

        {/* Emoji */}
        <div style={{ fontSize: 80, marginBottom: 24 }}>{emoji}</div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#888888",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          {subtitle}
        </div>

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: "#c8102e",
              letterSpacing: "0.15em",
            }}
          >
            NOREN 暖簾
          </div>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#555" }} />
          <div style={{ fontSize: 18, color: "#555" }}>norenapparel.com</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
