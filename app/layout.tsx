import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InnoMarket - Festive Fashion, Deals & Trends",
  description: "Shop the best festive fashion, everyday fits, sweatshirts, and trending styles with killer deals.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased min-h-screen bg-[#faf8fc] text-zinc-900 selection:bg-[#a82046] selection:text-white">
        {children}
      </body>
    </html>
  );
}
