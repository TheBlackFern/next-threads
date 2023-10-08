"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";

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
                buttonVariants({ variant: "ghost" }),
                `relative flex h-fit items-center justify-start gap-4 p-4`,
                isActive &&
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90",
              )}
            >
              <span
                className={cn(
                  "text-primary",
                  isActive && "text-primary-foreground",
                )}
              >
                {link.icon}
              </span>
              <span className="leading-relaxed max-lg:hidden">
                {link.label}
              </span>
            </Link>
          );
        })}
        <div className="mb-5 mt-auto hidden md:block">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <Button variant="ghost" className="h-fit w-full p-4">
                <p className="flex  w-full justify-start gap-4  leading-relaxed max-md:hidden">
                  <span className="text-primary">
                    <LogOut height={24} width={24} />
                  </span>
                  <span className="leading-relaxed max-lg:hidden">Log Out</span>
                </p>
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
