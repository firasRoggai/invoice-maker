import "~/styles/globals.css";

import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { sync } from "~/actions/sync";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";
import { TailwindIndicator } from "../../components/TailwindIndicator";

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


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // sync the user with the db
  await sync('dashboard');

  return (
    <html lang="en">
      <ClerkProvider>
        <TRPCReactProvider>
          <body className={cn(`font-sans ${inter.variable} flex flex-col min-h-screen`, fontHeading.variable)}>
            {children}
            <TailwindIndicator />
          </body>
        </TRPCReactProvider>
      </ClerkProvider>
    </html >
  );
}
