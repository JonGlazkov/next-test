"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

interface NextAuthSessionProviderProps extends PropsWithChildren {}

export default function NextAuthSessionProvider({
  children,
}: NextAuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
