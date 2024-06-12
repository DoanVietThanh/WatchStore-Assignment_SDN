"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { signInMember } from "@/actions/member.action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  memberName: z.string().nonempty({ message: "Member name is required" }).min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().nonempty({ message: "Password is required" }).min(4, {
    message: "Password must be at least 4 characters.",
  }),
});
const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberName: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signInMember(values);
      console.log("🚀 ~ onSubmit ~ res:", res);
      if (res.success) {
        toast.success(res.message || "Sign in success");
      }
    } catch (err: any) {
      toast.error(err.message || "Sign-in failed");
    }
  };

  return (
    <section className="h-[100vh] w-[100vw] flex justify-center items-center bg-slate-200">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign In
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="memberName"
                render={({ field }) => (
                  <FormItem>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Type password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"primary"} className="w-full">
                Submit
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have not an account?{" "}
                <a href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign-up here
                </a>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
