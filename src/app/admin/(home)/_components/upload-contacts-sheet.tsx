/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { Group } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";
import { useForm } from "react-hook-form";
import { uploadContact } from "../actions";
import { UploadContactSchema, uploadContactSchema } from "../schema";

type ContactUploadSheetProps = {
  children?: ReactNode;
  groups?: Group[];
};

export function ContactUploadSheet({
  children,
  groups,
}: ContactUploadSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(uploadContactSchema),
  });

  const onSubmit = form.handleSubmit(
    //@ts-expect-error error
    async ({ file, groupId }: UploadContactSchema) => {
      const formData = new FormData();
      formData.append("file", file[0]);

      await uploadContact(groupId, formData);

      router.refresh();

      ref.current?.click();

      toast({
        title: "Success",
        description: "Your contact has been uploaded successfully.",
      });
    }
  );
  console.log(form.watch("file"));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="space-y-8 h-screen flex flex-col"
          >
            <SheetHeader>
              <SheetTitle>Upload Contact</SheetTitle>
              <SheetDescription>
                Drop your file here or click to upload.
              </SheetDescription>
            </SheetHeader>
            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a group to insert contact" />
                      </SelectTrigger>
                      <SelectContent>
                        {groups?.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name ?? "No groups available"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input {...form.register("file")} id="file" type="file" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="mt-auto">
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
