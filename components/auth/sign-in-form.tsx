"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { loginUser } from "@/services/auth";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

const SignInForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    const result = await loginUser(data);

    if (!result.errors && result.data) {
      setCookie("token", result.data.token);

      form.reset();
      toast.success("Login successful!");

      router.push("/");
    } else {
      toast.error(result.errors);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1 w-full md:w-auto">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="jevon@gmail.com"
                        type="email"
                        required
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1 w-full md:w-auto">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="*******"
                        type="password"
                        required
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Sign In
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
