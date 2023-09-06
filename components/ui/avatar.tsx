import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva("rounded-full border object-cover", {
  variants: {
    size: {
      default: "h-12 w-12",
      sm: "h-10 w-10",
      lg: "h-16 w-16",
      xl: "h-24 w-24",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
type AvatarProps = React.ComponentProps<typeof Image> &
  VariantProps<typeof avatarVariants>;

const imageSize = {
  default: 48,
  sm: 40,
  lg: 64,
  xl: 96,
};

const Avatar = ({
  className,
  alt,
  src,
  size = "default",
  ...props
}: AvatarProps) => {
  return (
    // both Image's width and height and w-h classes are required
    // as the former is forced by the Image and the latter is required
    // for it not not stretch when the image's aspect ration is not 1:1
    <Image
      src={src}
      width={imageSize[size!]}
      height={imageSize[size!]}
      alt={alt}
      className={cn(avatarVariants({ size }), className)}
      priority
      {...props}
    />
  );
};

export default Avatar;
