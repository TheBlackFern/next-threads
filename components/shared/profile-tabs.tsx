import React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { profileTabs } from "@/constants";
import { cn } from "@/lib/utils";

type ProfileTabsProps = {
  threadsCount: number;
};

const TabsProfile = ({ threadsCount }: ProfileTabsProps) => {
  return (
    <TabsList className="flex h-auto flex-1">
      {profileTabs.map((tab) => (
        <TabsTrigger
          key={tab.label}
          value={tab.value}
          className="group flex flex-1 items-center gap-2 py-2"
        >
          <div className="flex flex-col items-center justify-center">
            <Image
              src={tab.icon}
              alt={tab.label}
              width={24}
              height={24}
              className="object-contain group-hover:grayscale group-hover:invert"
            />
            <p className="text-xs sm:hidden">{tab.label}</p>
          </div>
          <p className="text-lg group-hover:text-foreground max-sm:hidden">
            {tab.label}
          </p>
          {tab.label === "Strings" && threadsCount > 0 && (
            <p
              className={cn(
                "ml-1 grid h-7 w-7 content-center rounded-full border bg-primary text-sm font-bold text-primary-foreground",
                threadsCount < 10 ? "" : "h-8 w-8",
              )}
            >
              {threadsCount}
            </p>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabsProfile;
