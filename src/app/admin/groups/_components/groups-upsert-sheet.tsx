/* eslint-disable react/no-unescaped-entities */
"use client";

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
import { createGroup, updateGroup } from "../actions";
import { UpsertGroupSchema, upsertGroupSchema } from "../schema";

type GroupUpsertSheetProps = {
  children?: ReactNode;
  defaultValue?: Group;
};

export function GroupUpsertSheet({ children }: GroupUpsertSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(upsertGroupSchema),
  });

  const onSubmit = form.handleSubmit(async (data: UpsertGroupSchema) => {
    if (data.id) {
      await updateGroup(data.id, { name: data.name! }).catch(() => {
        toast({
          title: "Error updating group",
          description: "An error occurred while updating your group.",
        });
      });
    } else {
      await createGroup({ name: data.name! }).catch(() => {
        toast({
          title: "Error creating group",
          description: "An error occurred while creating your group.",
        });
      });
    }

    router.refresh();

    ref.current?.click();

    toast({
      title: "Success",
      description: "Your group has been updated successfully.",
    });
  });

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
              <SheetTitle>Upsert Group</SheetTitle>
              <SheetDescription>
                Make changes to your contact here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your group name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the displayed name.
                  </FormDescription>
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
