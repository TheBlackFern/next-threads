import { Home, Search, Heart, ImagePlus, Users, User2 } from "lucide-react";

const ICON_SIZE = 24;

export const sideBarLinks = [
  {
    icon: <Home width={ICON_SIZE} height={ICON_SIZE} />,
    route: "/",
    label: "Feed",
  },
  {
    icon: <Search width={ICON_SIZE} height={ICON_SIZE} />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <Heart width={ICON_SIZE} height={ICON_SIZE} />,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: <ImagePlus width={ICON_SIZE} height={ICON_SIZE} />,
    route: "/create-string",
    label: "Post",
  },
  {
    icon: <Users width={ICON_SIZE} height={ICON_SIZE} />,
    route: "/communities",
    label: "Communities",
  },
  {
    icon: <User2 width={ICON_SIZE} height={ICON_SIZE} />,
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "strings", label: "Strings", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "strings", label: "Strings", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
