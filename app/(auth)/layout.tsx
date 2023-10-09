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
