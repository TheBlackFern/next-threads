import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "../globals.css";
import {
  MobileNav,
  LeftSideBar,
  RightSideBar,
  MainNav,
} from "@/components/shared";

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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MainNav />

            <main className="flex flex-row">
              <LeftSideBar />
              <section className="flex min-h-screen flex-1 flex-col items-center bg-background px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
                <div className="w-full max-w-4xl">{children}</div>
              </section>
              <RightSideBar />
            </main>

            <MobileNav />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
