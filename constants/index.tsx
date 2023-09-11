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

const GROUP_NAME = "Community";
const APP_NAME = "Strings";

// post-hoc change of name put forth as a localisation
export const localization = {
  formFieldLabel__organizationName: `${GROUP_NAME} name`,
  signUp: {
    start: {
      subtitle: `to continue to ${APP_NAME}`,
    },
    emailLink: {
      subtitle: `to continue to ${APP_NAME}`,
    },
    emailCode: {
      subtitle: `to continue to ${APP_NAME}`,
    },
    continue: {
      subtitle: `to continue to ${APP_NAME}`,
    },
  },
  signIn: {
    start: {
      subtitle: `to continue to ${APP_NAME}`,
    },
    password: {
      subtitle: `to continue to ${APP_NAME}`,
    },
    emailCode: {
      subtitle: `to continue to ${APP_NAME}`,
    },
    emailLink: {
      subtitle: `to continue to ${APP_NAME}`,
    },
    backupCodeMfa: {
      subtitle: `to continue to ${APP_NAME}`,
    },
  },
  organizationSwitcher: {
    action__createOrganization: `Create ${GROUP_NAME}`,
    action__manageOrganization: `Manage ${GROUP_NAME}`,
  },
  organizationProfile: {
    start: {
      headerSubtitle__members: `View and manage ${GROUP_NAME.toLowerCase()} members`,
      headerSubtitle__settings: `Manage ${GROUP_NAME.toLowerCase()} settings`,
    },
    profilePage: {
      title: `Organization Profile`,
      subtitle: `Manage ${GROUP_NAME.toLowerCase()} profile`,
      successMessage: `The ${GROUP_NAME.toLowerCase()} has been updated.`,
      dangerSection: {
        leaveOrganization: {
          title: `Leave ${GROUP_NAME.toLowerCase()}`,
          messageLine1: `Are you sure you want to leave this ${GROUP_NAME.toLowerCase()}? You will lose access to this ${GROUP_NAME.toLowerCase()} and its applications.`,
          successMessage: `You have left the ${GROUP_NAME.toLowerCase()}.`,
          actionDescription: `Type {{organizationName}} below to continue.`,
        },
        deleteOrganization: {
          title: `Delete ${GROUP_NAME.toLowerCase()}`,
          messageLine1: `Are you sure you want to delete this ${GROUP_NAME.toLowerCase()}?`,
          actionDescription: `Type {{organizationName}} below to continue.`,
          successMessage: `You have deleted the ${GROUP_NAME.toLowerCase()}.`,
        },
      },
      domainSection: {
        subtitle: `Allow users to join the ${GROUP_NAME.toLowerCase()} automatically or request to join based on a verified email domain.`,
      },
    },
    createDomainPage: {
      subtitle: `Add the domain to verify. Users with email addresses at this domain can join the ${GROUP_NAME.toLowerCase()} automatically or request to join.`,
    },
    verifiedDomainPage: {
      enrollmentTab: {
        subtitle: `Choose how users from this domain can join the ${GROUP_NAME.toLowerCase()}.`,
        manualInvitationOption__description: `Users can only be invited manually to the ${GROUP_NAME.toLowerCase()}.`,
        automaticInvitationOption__description: `Users are automatically invited to join the ${GROUP_NAME.toLowerCase()} when they sign-up and can join anytime.`,
        automaticSuggestionOption__description: `Users receive a suggestion to request to join, but must be approved by an admin before they are able to join the ${GROUP_NAME.toLowerCase()}.`,
      },
    },
    invitePage: {
      subtitle: `Invite new members to this ${GROUP_NAME.toLowerCase()}`,
    },
    removeDomainPage: {
      messageLine2: `Users won’t be able to join the ${GROUP_NAME.toLowerCase()} automatically after this.`,
    },
    membersPage: {
      invitedMembersTab: {
        tableHeader__invited: `Invited`,
        menuAction__revoke: `Revoke invitation`,
      },
      invitationsTab: {
        autoInvitations: {
          headerSubtitle: `Invite users by connecting an email domain with your ${GROUP_NAME.toLowerCase()}. Anyone who signs up with a matching email domain will be able to join the ${GROUP_NAME.toLowerCase()} anytime.`,
        },
      },
      requestsTab: {
        requests: {
          headerSubtitle: `Browse and manage users who requested to join the ${GROUP_NAME.toLowerCase()}.`,
        },
        autoSuggestions: {
          headerSubtitle: `Users who sign up with a matching email domain, will be able to see a suggestion to request to join your ${GROUP_NAME.toLowerCase()}.`,
        },
      },
    },
  },
  createOrganization: {
    title: `Create ${GROUP_NAME}`,
    formButtonSubmit: `Create ${GROUP_NAME.toLowerCase()}`,
    subtitle: `Set the ${GROUP_NAME.toLowerCase()} profile`,
  },
  organizationList: {
    createOrganization: `Create ${GROUP_NAME}`,
    subtitle: `to continue to Strings`,
    titleWithoutPersonal: `Select an ${GROUP_NAME.toLowerCase()}`,
    action__createOrganization: `Create ${GROUP_NAME.toLowerCase()}`,
  },
};
