import { Inter } from "next/font/google";

import "../globals.css";
import {
  MobileNav,
  LeftSideBar,
  RightSideBar,
  MainNav,
} from "@/components/shared";
import Providers from "../providers";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Strings",
  description:
    "Strings is a new app, built by the Kilogram team, for sharing text updates and joining public conversations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Providers> */}
      <body className={inter.className}>
        <Providers>
          <MainNav />

          <div className="flex flex-row">
            <LeftSideBar />
            <main className="flex min-h-screen flex-1 flex-col items-start bg-background px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              {children}
            </main>
            {/* TODO: add communities */}
            <RightSideBar />
          </div>

          <MobileNav />
        </Providers>
      </body>
      {/* </Providers> */}
    </html>
  );
}
