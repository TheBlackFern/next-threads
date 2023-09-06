"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {};

const LeftSideBar = (props: Props) => {
  const { userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  return (
    // TODO: redo with a Navigation Menu shadcn component
    <aside className="custom-scrollbar sticky left-0 top-0 z-0 flex h-screen w-fit flex-col justify-between overflow-auto border-r bg-background pb-5 pt-28 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-2 px-6">
        {sideBarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") {
            link.route += `/${userId}`;
          }

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                `relative flex items-center justify-start gap-4 rounded-lg p-4 text-primary hover:bg-accent hover:text-accent-foreground`,
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-secondary/90",
              )}
            >
              {/* TODO  make it a nice and reusable bg colour*/}
              {link.icon}
              <span className="leading-relaxed max-lg:hidden">
                {link.label}
              </span>
            </Link>
          );
        })}
        <div className="mt-auto hidden items-end justify-start gap-4 p-4 hover:bg-accent hover:text-accent-foreground md:flex">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <span className="flex cursor-pointer gap-4 leading-relaxed max-lg:hidden">
                <LogOut height={24} width={24} />
                Logout
              </span>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
