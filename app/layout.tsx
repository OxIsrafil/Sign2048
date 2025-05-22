import "./globals.css";
import type { Metadata } from "next";
import PrivyAuthProvider from "../components/PrivyProvider";
import AuthButton from "../components/AuthButton";

// Google Fonts CDN for Press Start 2P
export const metadata: Metadata = {
  title: "Sign 2048",
  description: "2048 game powered by Sign Protocol",
  icons: {
    icon: "https://imgur.com/JBqj35H.png", // ✅ Your Imgur favicon
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
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bgDark font-arcade text-white min-h-screen">
        <PrivyAuthProvider>
          <AuthButton />
          {children}
        </PrivyAuthProvider>
      </body>
    </html>
  );
}
