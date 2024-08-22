import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionAuthProvider from "../../store/provider/SessionAuthProvider";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Regresemos a nuestra casa",
  description: "Created by Generación desafiante",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionAuthProvider>
        <body className={inter.className}>{children}</body>
      </SessionAuthProvider>
    </html>
  );
}
