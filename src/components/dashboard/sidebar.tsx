import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentsGenericProps } from "../types";

export function DashboardSidebarContainer({
  children,
  className,
}: ComponentsGenericProps) {
  return (
    <aside
      className={cn([
        "border-r border-border flex flex-col space-y-6",
        "lg:flex",
        "hidden",
        className,
      ])}
    >
      {children}
    </aside>
  );
}

export function DashboardSidebarHeader({
  children,
  className,
}: ComponentsGenericProps) {
  return (
    <header
      className={cn(["px-6 py-3 border-b border-border relative", className])}
    >
      {children}
    </header>
  );
}

export function DashboardSidebarHeaderTitle({
  children,
  className,
}: ComponentsGenericProps) {
  return <h2 className={cn(["", className])}>{children}</h2>;
}

export function DashboardSidebarMain({
  children,
  className,
}: ComponentsGenericProps) {
  return <main className={cn(["px-3", className])}>{children}</main>;
}

export function DashboardSidebarFooter({
  children,
  className,
}: ComponentsGenericProps) {
  return (
    <footer className={cn(["p-6 mt-auto border-t border-border", className])}>
      {children}
    </footer>
  );
}

export function DashboardSidebarNav({
  children,
  className,
}: ComponentsGenericProps) {
  return <nav className={cn(["", className])}>{children}</nav>;
}

export function DashboardSidebarNavHeader({
  children,
  className,
}: ComponentsGenericProps) {
  return <header className={cn(["", className])}>{children}</header>;
}

export function DashboardSidebarNavHeaderTitle({
  children,
  className,
}: ComponentsGenericProps) {
  return (
    <div
      className={cn([
        "text-xs uppercase text-muted-foreground ml-3",
        className,
      ])}
    >
      {children}
    </div>
  );
}

export function DashboardSidebarNavMain({
  children,
  className,
}: ComponentsGenericProps) {
  return <main className={cn(["flex flex-col", className])}>{children}</main>;
}

type DashboardSidebarNavLinkProps = {
  href: string;
  active?: boolean;
};

export function DashboardSidebarNavLink({
  children,
  className,
  href,
  active,
}: ComponentsGenericProps<DashboardSidebarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn([
        "flex items-center text-sm px-3 py-2 rounded-md",
        active && "bg-secondary",
        className,
      ])}
    >
      {children}
    </Link>
  );
}
