import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SGCC — Built for the Kingdom",
  description:
    "Solid Ground Engineering & Contracting Company. Infrastructure, civil works, MEP and maintenance across Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
