import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "شِلّة | منصة الشراكة التجارية",
  description: "منصة تجارية مبتكرة تمكّنك من تملّك بضاعة حقيقية وتحقيق هامش ربح مستهدف",
  keywords: ["شِلّة", "شراكة تجارية", "استثمار", "بضاعة", "تجارة إلكترونية"],
  authors: [{ name: "شِلّة" }],
  openGraph: {
    title: "شِلّة | منصة الشراكة التجارية",
    description: "استثمر بذكاء، امتلك بضاعتك، احصد ثمار حركة السوق الحقيقية",
    locale: "ar_SA",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#007a3d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-surface text-text-primary antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}