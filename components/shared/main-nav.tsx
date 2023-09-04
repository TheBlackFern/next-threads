"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { dark } from "@clerk/themes";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { theme } = useTheme();

  return (
    <nav
      className={cn(
        "absolute top-0 z-20 flex w-full items-center border-b bg-background px-2 py-3 dark:border-b md:px-6",
        className,
      )}
      {...props}
    >
      <div className="mr-auto flex items-center space-x-4 lg:space-x-6">
        <Link
          href="/"
          className="flex items-center justify-center gap-0.5 text-lg font-medium transition-colors hover:text-primary"
        >
          <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
          <span className="hidden text-2xl hover:text-primary/80 xs:inline">
            strings
          </span>
        </Link>
      </div>
      <div className="md:hidden">
        <SignedIn>
          <SignOutButton>
            <LogOut height={24} width={24} className="cursor-pointer" />
          </SignOutButton>
        </SignedIn>
      </div>
      <OrganizationSwitcher
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          elements: {
            organizationSwitcherTrigger: "py-2 px-4 mr-2",
          },
        }}
      />
      <ModeToggle />
    </nav>
  );
}
