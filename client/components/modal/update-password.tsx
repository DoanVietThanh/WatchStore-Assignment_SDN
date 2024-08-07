"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updatePassword } from "@/actions/member.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    oldPassword: z.string().nonempty({ message: "Password is required" }).min(4, {
      message: "Password must be at least 4 characters.",
    }),
    newPassword: z.string().nonempty({ message: "New password is required" }).min(4, {
      message: "New password must be at least 4 characters.",
    }),
    confirmedPassword: z.string().nonempty({ message: "Confirmed password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmedPassword, {
    message: "Password does not match",
    path: ["confirmedPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password cannot be the same as old password",
    path: ["newPassword"],
  });

type UpdatePasswordModalProps = {
  userInfo: any;
};

export function UpdatePasswordModal({ userInfo }: UpdatePasswordModalProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      confirmedPassword: "",
      newPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updatePassword(userInfo._id as string, values);
      console.log("🚀 ~ onSubmit ~ res:", res);
      if (res.success) {
        toast.success(res.message || "Update password successfully");
        router.refresh();
        router.push("/sign-in");
      } else {
        toast.error(res.message || "Update password failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Update password failed");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Update Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Type password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Type confirmed password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmedPassword"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Confirmed Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Type confirmed password" {...field} />
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
