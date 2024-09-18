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
import { Contact, Group } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";
import { useForm } from "react-hook-form";
import { createContact, updateContact } from "../actions";
import { UpsertContactSchema, upsertContactSchema } from "../schema";

type ContactUpsertSheetProps = {
  children?: ReactNode;
  defaultValue?: Contact;
  groups?: Group[];
};

export function ContactUpsertSheet({
  children,
  groups,
  defaultValue,
}: ContactUpsertSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(upsertContactSchema),
  });

  if (defaultValue) {
    form.setValue("id", defaultValue?.id);
    form.setValue("groupId", defaultValue?.groupId);
    form.setValue("name", defaultValue?.name);
    form.setValue("phone", defaultValue?.phone);
  }

  const onSubmit = form.handleSubmit(async (data: UpsertContactSchema) => {
    if (data.id) {
      await updateContact(data.id, {
        name: data.name,
        phone: data.phone,
      }).catch((error) => {
        return toast({
          title: "Error",
          description: error.message,
        });
      });
    } else {
      await createContact(data.groupId!, {
        name: data.name!,
        phone: data.phone!,
      }).catch((error) => {
        return toast({
          title: "Error",
          description: error.message,
        });
      });
    }

    router.refresh();

    ref.current?.click();

    toast({
      title: "Success",
      description: "Your contact has been updated successfully.",
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
              <SheetTitle>Upsert Contact</SheetTitle>
              <SheetDescription>
                Make changes to your contact here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your contact name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the displayed name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your contact phone" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the displayed phone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
