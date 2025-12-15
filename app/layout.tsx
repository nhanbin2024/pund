import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zombie Puncher - Javi vs Bots",
  description: "A fun 2D canvas game: punch zombies (cartoon, no gore)."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
