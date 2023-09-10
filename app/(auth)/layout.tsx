import { ThemeProvider } from "@/components/theme-provider";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Strings",
  description:
    "Strings is a new app, built by the Kilogram team, for sharing text updates and joining public conversations.",
};

// post-hoc change of name put forth as a localisation
const localization = {
  signUp: {
    start: {
      subtitle: "to continue to Strings",
    },
    emailLink: {
      subtitle: "to continue to Strings",
    },
    emailCode: {
      subtitle: "to continue to Strings",
    },
    continue: {
      subtitle: "to continue to Strings",
    },
  },
  signIn: {
    start: {
      subtitle: "to continue to Strings",
    },
    password: {
      subtitle: "to continue to Strings",
    },
    emailCode: {
      subtitle: "to continue to Strings",
    },
    emailLink: {
      subtitle: "to continue to Strings",
    },
    backupCodeMfa: {
      subtitle: "to continue to Strings",
    },
  },
  organizationList: {
    subtitle: "to continue to Strings",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="en">
        <body
          className={cn(
            inter.className,
            "flex min-h-screen items-center justify-center bg-background",
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
