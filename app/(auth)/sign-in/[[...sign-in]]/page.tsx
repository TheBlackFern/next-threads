import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          card: "bg-background border border-border",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent text-foreground",
          socialButtonsBlockButton__github: "[&>span]:dark:invert",
          dividerText: "text-foreground",
          dividerLine: "bg-border",
          formField: "space-y-2",
          formFieldLabel: "text-foreground font-semibold text-base",
          formFieldInput:
            "flex h-10 text-foreground placeholder:text-foreground w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          formButtonPrimary:
            "w-full bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lowercase capitalize",
          footerActionText: "text-muted-foreground",
          footerActionLink:
            "text-primary font-medium underline-offset-4 hover:underline hover:text-primary/75",
          alertText: "text-destructive",
        },
      }}
    />
  );
}
