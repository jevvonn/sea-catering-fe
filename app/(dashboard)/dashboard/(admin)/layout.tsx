import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import React from "react";

const DashboardAdminLayout = async ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return <>{children}</>;
};

export default DashboardAdminLayout;
