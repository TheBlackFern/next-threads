import { Inter } from "next/font/google";

import "../globals.css";
import { cn } from "@/lib/utils";
import Providers from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Strings",
  description:
    "Strings is a new app, built by the Kilogram team, for sharing text updates and joining public conversations.",
};

// const local = {
//   signIn: {
//     start: {
//       title: `Testing One Two`,
//       subtitle: "three four five",
//     },
//   },
//   organizationSwitcher: {
//     action__createOrganization: "Create Group",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <body
        className={cn(
          inter.className,
          "flex min-h-screen items-center justify-center bg-background",
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
