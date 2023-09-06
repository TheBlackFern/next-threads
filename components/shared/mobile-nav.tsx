"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
type Props = {};

const MobileNav = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl border bg-background p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-between gap-1 xs:gap-5">
        {sideBarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                `relative flex flex-col items-center gap-2 rounded-lg p-2 hover:bg-accent hover:text-accent-foreground  sm:flex-1 sm:px-2 sm:py-2.5`,
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-secondary/90",
              )}
            >
              {/* FIXME change to HeroIcons and use <Image /> so it shrinks*/}
              {link.icon}
              <span className="text-xs font-medium max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNav;
