import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Private Workspace",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AppLayout({ children }: { children: ReactNode }) {
  const signedIn = await isAuthenticated();
  if (!signedIn) {
    redirect("/login");
  }

  return <AppShell>{children}</AppShell>;
}
