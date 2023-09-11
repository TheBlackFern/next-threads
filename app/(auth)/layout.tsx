import { ThemeProvider } from "@/components/theme-provider";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import { cn } from "@/lib/utils";
import { localization } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Strings",
  description:
    "Strings is a new app, built by the Kilogram team, for sharing text updates and joining public conversations.",
};

const local = {
  signIn: {
    start: {
      title: `Testing One Two`,
      subtitle: "three four five",
    },
  },
  organizationSwitcher: {
    action__createOrganization: "Create Group",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          card: "bg-background border border-border",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-secondary text-foreground",
          socialButtonsBlockButton__github: "[&>span]:dark:invert",
          dividerText: "text-foreground",
          dividerLine: "bg-border",
          formField: "space-y-2",
          formFieldLabel: "text-foreground font-semibold text-base",
          formFieldInput:
            "flex h-10 text-foreground placeholder:text-foreground w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          formButtonPrimary:
            "w-full bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lowercase capitalize",
          footerActionText: "text-muted-foreground",
          footerActionLink:
            "text-primary font-medium underline-offset-4 hover:underline hover:text-primary/75 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          alertText: "text-destructive",
          organizationSwitcherTrigger: "py-2 px-4 mr-2",
        },
      }}
      localization={localization}
    >
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
