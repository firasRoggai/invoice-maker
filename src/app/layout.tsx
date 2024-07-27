import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import { TailwindIndicator } from "../components/TailwindIndicator";
import { TRPCReactProvider } from "~/trpc/react";

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
        <TRPCReactProvider>
          <body className={`font-sans ${inter.variable} flex flex-col min-h-screen`}>
            <Navbar />
            {children}
            <Footer />
            <TailwindIndicator />
          </body>
        </TRPCReactProvider>
      </ClerkProvider>
    </html >
  );
}
