"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { dark } from "@clerk/themes";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { ModeToggle } from "../ModeToggle";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { theme } = useTheme();

  return (
    <nav
      className={cn(
        "absolute flex w-full top-0 z-20 items-center bg-background border-b dark:border-b px-2 md:px-6 py-3",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-4 lg:space-x-6 mr-auto">
        <Link
          href="/"
          className="flex gap-0.5 justify-center items-center text-lg font-medium transition-colors hover:text-primary"
        >
          <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
          <span className="hidden xs:inline text-2xl hover:text-primary/80">
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
