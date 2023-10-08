import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// this entire setup is here because of the problems that
// arise if the profile photo is not square/circular
// also, when inside a flex container, <Image/> elements
// shrink to accomodate other elements, but shrink just on one
// axis, which makes it an ellipsoid instead of a circle
export const avatarVariants = cva("relative shrink-0", {
  variants: {
    size: {
      default: "h-12 w-12",
      xs: "h-5 w-5",
      sm: "h-8 w-8",
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

// const pixelValues = {
//   default: 48,
//   sm: 32,
//   lg: 64,
//   xl: 96,
// };

const Avatar = ({
  className,
  alt,
  src,
  size = "default",
  ...props
}: AvatarProps) => {
  return (
    <div className={cn(avatarVariants({ size }), className)}>
      <Image
        src={src}
        alt={alt}
        // width={pixelValues[size!]}
        // height={pixelValues[size!]}
        className="rounded-full border fill-none object-cover object-center"
        layout="fill"
        {...props}
      />
    </div>
  );
};

export default Avatar;
