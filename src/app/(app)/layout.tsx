import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import { TailwindIndicator } from "../../components/TailwindIndicator";
import { TRPCReactProvider } from "~/trpc/react";
import localFont from "next/font/local"
import { cn } from "~/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

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
          <body className={cn(`font-sans ${inter.variable} flex flex-col min-h-screen`, fontHeading.variable)}>
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
