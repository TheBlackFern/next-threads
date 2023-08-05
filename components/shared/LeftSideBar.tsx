"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { sideBarLinks } from "@/constants";

type Props = {};

const LeftSideBar = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar z-0 sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-auto border-r bg-background pb-5 pt-28 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-2 px-6">
        {sideBarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start items-center gap-4 rounded-lg p-4 text-primary ${
                isActive && " bg-fuchsia-200 dark:bg-fuchsia-600"
              }`}
            >
              {/* TODO  make it a nice and reusable bg colour*/}
              {link.icon}
              <span className="max-lg:hidden leading-relaxed">
                {link.label}
              </span>
            </Link>
          );
        })}
        <div className="hidden md:flex h-full mt-auto gap-4 p-4 justify-start items-end">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <LogOut height={28} width={28} className="cursor-pointer" />
            </SignOutButton>

            <span className="max-lg:hidden leading-relaxed">Logout</span>
          </SignedIn>
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
