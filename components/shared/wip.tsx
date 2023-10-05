import React from "react";

const WIP = ({ what }: { what: string }) => {
  return (
    <p className="mt-5 font-medium text-destructive">
      🚧 {what} is a Work in Progress, will be added soon...🚧
    </p>
  );
};

export default WIP;
