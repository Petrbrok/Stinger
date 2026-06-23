import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "СТО Stinger | Автосервис в Кудрово",
  description:
    "Ремонт, диагностика, шиномонтаж, 3D сход-развал и обслуживание автомобилей в СТО Stinger на Пражской улице, 17Е, Кудрово."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
