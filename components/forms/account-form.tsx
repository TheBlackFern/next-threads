"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/schemas/user";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import Avatar from "../ui/avatar";

export type GeneralUserInfo = {
  username: string;
  name: string;
  bio: string;
  image: string;
};

type AccountFormProps = {
  userData: {
    id: string;
    objectId: string;
  } & GeneralUserInfo;
  btnTitle: string;
};

const AccountForm = ({ userData, btnTitle }: AccountFormProps) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: userData?.name || "",
      username: userData?.username || "",
      bio: userData?.bio || "",
      image: userData?.image || "",
    },
  });

  function handleImage(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files?.length) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (e) => {
        const imageDataUrl = e.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  }

  async function onSubmit(values: z.infer<typeof userSchema>) {
    const blob = values.image;
    const isValid = isBase64Image(blob);

    if (!isValid) return;
    await startUpload(files).then((res) => {
      if (res && res[0].fileUrl) {
        values.image = res[0].fileUrl;
      }
    });

    await updateUser({
      userId: userData.id,
      userData: { ...values, username: values.username.toLowerCase() },
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start space-y-8"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full">
                {field.value ? (
                  <Avatar src={field.value} alt={"profile photo"} size="xl" />
                ) : (
                  <Avatar
                    src={"/assets/profile.svg"}
                    alt={"profile photo"}
                    size="xl"
                  />
                )}
              </FormLabel>
              <div className="-ml-2 flex flex-col">
                <FormControl className="mb-2 flex-1 cursor-pointer text-base text-muted-foreground">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Uploade a photo"
                    className="!important border-none outline-none file:text-blue"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <div className="ml-0.5 px-4">
                  <FormDescription>
                    This is your avatar picture.
                  </FormDescription>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-base font-semibold">Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>This is your public name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-base font-semibold">
                Username
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="johnny12345" {...field} />
              </FormControl>
              <FormDescription>This is your username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-base font-semibold">Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Something about you..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the bio displayed for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountForm;
