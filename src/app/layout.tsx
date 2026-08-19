import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: "/icon.png" },
  title: "נדב · AI לעסקים",
  description:
    "בונה לעסקים מערכות AI שמחוברות ללידים, לוואטסאפ ול-CRM שכבר יש להם. יש דברים ששווה לבנות ויש דברים שלא.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06152b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
