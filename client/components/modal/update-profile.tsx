"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateProfile } from "@/actions/member.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getToken, getUserInfo } from "@/lib/manage-state-client";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  memberName: z.string().nonempty({ message: "Member name is required" }).min(4, {
    message: "Member name must be at least 4 characters.",
  }),
  name: z.string().nonempty({ message: "Name is required" }).min(4, {
    message: "Name must be at least 4 characters.",
  }),
  yob: z.number().int().nonnegative({ message: "Year of birth must be a non-negative integer" }),
  isAdmin: z.boolean().optional(),
});

export function UpdateProfileModal() {
  const router = useRouter();
  const userInfo = getUserInfo();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberName: userInfo.memberName,
      name: userInfo.name,
      yob: userInfo.yob || new Date().getFullYear(),
      isAdmin: false,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        memberName: userInfo.memberName,
        name: userInfo.name,
        yob: userInfo.yob || new Date().getFullYear(),
        isAdmin: false,
      });
    }
  }, [form, open, userInfo.memberName, userInfo.name, userInfo.yob]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values);
    try {
      const res = await updateProfile(getToken(), userInfo._id as string, values);
      if (res.success) {
        toast.success(res.message || "Update password successfully");
        router.refresh();
        setOpen(false);
      } else {
        toast.error(res.message || "Update password failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Update password failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="memberName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Member Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Member Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yob"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Year Of Birth</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Year of birth" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"default"} className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
