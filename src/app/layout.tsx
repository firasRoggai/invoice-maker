import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import { TailwindIndicator } from "./_components/TailwindIndicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Invoice Maker",
  description: "invoice pdf generator",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`font-sans ${inter.variable} flex flex-col min-h-screen`}>
          <Navbar />
          {children}
          <Footer />
          <TailwindIndicator />
        </body>
      </ClerkProvider>
    </html>
  );
}
