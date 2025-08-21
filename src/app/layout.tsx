import type { Metadata } from "next";
import { Poppins } from "next/font/google";import SessionAuthProvider from "../../store/provider/SessionAuthProvider";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Puedes ajustar los pesos que necesitas
});
// const inter = Inter({ subsets: ["latin"] });

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
        <body className={poppins.className}>{children}</body>
      </SessionAuthProvider>
    </html>
  );
}
