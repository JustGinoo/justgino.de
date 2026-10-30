import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { routing, type Locale } from "@/i18n/routing";

export const alt = "Gino Wild · JustGino";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const fonts = path.join(process.cwd(), "src/fonts");
  const [sans, mono] = await Promise.all([
    readFile(path.join(fonts, "Geist-SemiBold.ttf")),
    readFile(path.join(fonts, "GeistMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#090d0a", padding: 64 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "2px solid #314536",
            background: "#0f1511",
            boxShadow: "14px 14px 0 0 #213026",
          }}
        >
          <div style={{ display: "flex", gap: 12, padding: "18px 24px", borderBottom: "2px solid #213026" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 16, height: 16, background: c }} />
            ))}
            <div style={{ marginLeft: 12, fontFamily: "Mono", fontSize: 22, color: "#9aab9f" }}>~/justgino.de</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "56px 64px" }}>
            <div style={{ fontFamily: "Mono", fontSize: 30, color: "#3ddc84" }}>gino@justgino:~$ whoami</div>
            <div style={{ marginTop: 20, fontFamily: "Sans", fontSize: 92, color: "#e6efe8" }}>{profile.name}</div>
            <div style={{ display: "flex", marginTop: 20, fontFamily: "Mono", fontSize: 30 }}>
              <span style={{ color: "#ff7ab6" }}>const</span>
              <span style={{ color: "#7cc7ff", marginLeft: 16 }}>role</span>
              <span style={{ color: "#6c7c71", marginLeft: 16 }}>=</span>
              <span style={{ color: "#f2d36b", marginLeft: 16 }}>&quot;{profile.role[locale]}&quot;</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sans", data: sans, weight: 600 },
        { name: "Mono", data: mono, weight: 400 },
      ],
    },
  );
}
