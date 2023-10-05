import React from "react";
import WIP from "./wip";

type Props = {};

const RightSideBar = (props: Props) => {
  return (
    <aside className="sticky right-0 top-0 z-10 flex h-screen w-fit max-w-[300px] flex-col justify-between gap-12 overflow-auto border-l bg-background px-10 pb-6 pt-28 max-xl:hidden">
      <div className="flex flex-1 flex-col justify-start">
        <p className="text-xl">Suggested Communities</p>
        <WIP what="Suggested communities" />
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <p className="text-xl">Suggested Users</p>
        <WIP what="Suggested users" />
      </div>
    </aside>
  );
};

export default RightSideBar;
