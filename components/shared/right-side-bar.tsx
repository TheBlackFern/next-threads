import React from "react";

type Props = {};

const RightSideBar = (props: Props) => {
  return (
    <aside className="custom-scrollbar sticky right-0 top-0 z-10 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l bg-background px-10 pb-6 pt-28 max-xl:hidden">
      <div className="flex flex-1 flex-col justify-start">
        <p className="text-xl text-primary">Suggested Communities</p>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <p className="text-xl text-primary">Suggested Users</p>
      </div>
    </aside>
  );
};

export default RightSideBar;
