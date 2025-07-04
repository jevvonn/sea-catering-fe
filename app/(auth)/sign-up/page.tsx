import Logo from "@/components/assets/logo";
import SignUpForm from "@/components/auth/sign-up-form";
import { getSession } from "@/lib/auth/get-session";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = async () => {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/sign-up-side-image.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={800}
          height={800}
          quality={100}
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Logo />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
