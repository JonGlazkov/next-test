import { getServerSession, Session } from "next-auth";
import { PropsWithChildren } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { MainSidebar } from "./_components/main-sidebar";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="grid grid-cols-[16rem_1fr] gap-4">
      <MainSidebar user={session?.user ?? (session as Session["user"])} />
      <main>{children}</main>
    </div>
  );
}
