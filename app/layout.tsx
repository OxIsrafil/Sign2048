import "./globals.css";
import type { Metadata } from "next";
import PrivyAuthProvider from "../components/PrivyProvider";
import AuthButton from "../components/AuthButton";
import Footer from "../components/Footer";

// ✅ Metadata config for SEO and favicon
export const metadata: Metadata = {
  title: "Sign 2048",
  description: "2048 game powered by Sign Protocol",
  icons: {
    icon: "https://imgur.com/JBqj35H.png",
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
          <Footer />
        </PrivyAuthProvider>
      </body>
    </html>
  );
}
