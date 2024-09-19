"use client";
import { useDevice } from "@/context";
import { cn } from "@/lib/utils";
import { ComponentsGenericProps } from "../types";

export function DashboardPage({ children, className }: ComponentsGenericProps) {
  const { isMobile, isSidebarOpen } = useDevice();

  return (
    <section
      className={cn([
        `h-screen ${isMobile && !isSidebarOpen ? "w-screen" : "w-full"}`,
        className,
      ])}
    >
      {children}
    </section>
  );
}

export function DashboardPageHeader({
  children,
  className,
}: ComponentsGenericProps) {
  const { isMobile } = useDevice();

  return (
    <header
      className={cn([
        `flex items-center justify-between ${
          isMobile ? "px-6 pl-20" : "px-6"
        } h-16 border-b border-border`,
        className,
      ])}
    >
      {children}
    </header>
  );
}

export function DashboardPageHeaderTitle({
  children,
  className,
}: ComponentsGenericProps) {
  return (
    <span className={cn(["text-muted-foreground uppercase", className])}>
      {children}
    </span>
  );
}

export function DashboardPageHeaderNav({
  children,
  className,
}: ComponentsGenericProps) {
  return <nav className={cn(["", className])}>{children}</nav>;
}

export function DashboardPageMain({
  children,
  className,
}: ComponentsGenericProps) {
  return <main className={cn(["p-6", className])}>{children}</main>;
}
