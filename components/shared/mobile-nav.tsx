"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
type Props = {};

const MobileNav = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl border bg-background p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="grid grid-cols-5 gap-1 xs:gap-5">
        {sideBarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.label !== "Feed")
            return (
              <Link
                href={link.route}
                key={link.label}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  `relative h-fit p-2 sm:px-2 sm:py-2.5`,
                  isActive &&
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90",
                )}
              >
                {/* FIXME change to HeroIcons and use <Image /> so it shrinks*/}
                <div className="flex flex-col items-center">
                  {link.icon}
                  <span className="text-xs font-medium max-sm:text-[10px]">
                    {link.label.split(/\s+/)[0]}
                  </span>
                </div>
              </Link>
            );
        })}
      </div>
    </section>
  );
};

export default MobileNav;
