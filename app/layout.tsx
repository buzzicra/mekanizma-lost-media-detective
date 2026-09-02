import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Mekanizma — Lost Media Detective",
  description:
    "Yarım hatırlanan medya içeriklerini topluluk ve kaynaklı kanıtlarla bulmaya yardımcı olan açık kaynak proje.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
