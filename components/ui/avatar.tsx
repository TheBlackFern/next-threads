import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<typeof Image>;

const Avatar = ({
  className,
  alt,
  src,
  width = 48,
  height = 48,
  ...props
}: AvatarProps) => {
  return (
    // both Image's width and height and w-h classes are required
    // as the former is forced by the Image and the latter is required
    // for it not not stretch when the image's aspect ration is not 1:1
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={cn(
        `h-[${height}] w-[${width}] rounded-full border object-cover`,
        className,
      )}
      priority
      {...props}
    />
  );
};

export default Avatar;
