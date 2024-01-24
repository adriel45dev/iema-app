import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { EyeIcon } from "@/public/assets/icons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IEMA",
  description: "Horário",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen w-full ">
          <Navbar />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
