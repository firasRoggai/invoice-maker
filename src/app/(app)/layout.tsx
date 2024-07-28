import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
import { TailwindIndicator } from "../../components/TailwindIndicator";
import { TRPCReactProvider } from "~/trpc/react";
import localFont from "next/font/local"
import { cn } from "~/lib/utils";
import { marketingConfig } from "~/config/marketing";
import { siteConfig } from "~/config/site";

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
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: [{ rel: "icon", url: "/logo.png" }],
  description: siteConfig.description,
  keywords: [
    "free invoice tool",
    "invoice generator",
    "invoice tool",
    "pdf invoice",
    "invoice",
  ],
  authors: [
    {
      name: "firasRoggai",
      url: "https://github.com/firasRoggai",
    },
  ],
  creator: "firasroggai",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  }
}


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
            <Navbar items={marketingConfig.mainNav} />
            {children}
            <Footer />
            <TailwindIndicator />
          </body>
        </TRPCReactProvider>
      </ClerkProvider>
    </html >
  );
}
