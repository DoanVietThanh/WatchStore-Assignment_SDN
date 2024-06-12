"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { signUpMember } from "@/actions/member.action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    memberName: z.string().nonempty({ message: "Member name is required" }).min(4, {
      message: "Member name must be at least 4 characters.",
    }),
    name: z.string().nonempty({ message: "Name is required" }).min(4, {
      message: "Name must be at least 4 characters.",
    }),
    password: z.string().nonempty({ message: "Password is required" }).min(4, {
      message: "Password must be at least 4 characters.",
    }),
    yob: z.number().int().nonnegative({ message: "Year of birth must be a non-negative integer" }),
    confirmedPassword: z.string().nonempty({ message: "Confirmed password is required" }),
    isAdmin: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Password does not match",
    path: ["confirmedPassword"],
  });
const SignUpPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberName: "admin1",
      name: "admin1",
      password: "123456",
      yob: new Date().getFullYear(),
      confirmedPassword: "",
      isAdmin: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signUpMember(values);
      if (res.success) {
        toast.success(res.message || "Sign-up success");
        router.push("/sign-in");
      }
    } catch (err: any) {
      toast.error(err.message || "Sign-up failed");
    }
  };

  return (
    <section className="h-[100vh] w-[100vw] flex justify-center items-center bg-slate-200">
      <div className="flex flex-col justify-center items-center bg-white rounded-lg p-8">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign Up
        </h1>
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
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Type password" {...field} />
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
            </div>

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
            <Button type="submit" variant={"primary"} className="w-full">
              Submit
            </Button>
            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              Have an account?{" "}
              <a
                href="/sign-up"
                className="text-blue-600 font-semibold text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign-in here
              </a>
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SignUpPage;
