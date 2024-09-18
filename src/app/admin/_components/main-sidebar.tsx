"use client";
import {
  DashboardSidebarContainer,
  DashboardSidebarFooter,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarNavLink,
  DashboardSidebarNavMain,
} from "@/components/dashboard/sidebar";
import { Logo } from "@/components/logo";
import {
  GroupIcon,
  MixerVerticalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";

type MainSidebarProps = {
  user: Session["user"];
};

export function MainSidebar({ user }: MainSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <DashboardSidebarContainer>
      <DashboardSidebarHeader>
        <Logo />
      </DashboardSidebarHeader>
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/admin" active={isActive("/admin")}>
              <PersonIcon className="w-4 h-4 mr-4" />
              Contacts
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/admin/groups"
              active={isActive("/admin/groups")}
            >
              <GroupIcon className="w-4 h-4 mr-4" />
              Groups
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/admin/settings"
              active={isActive("/admin/settings")}
            >
              <MixerVerticalIcon className="w-4 h-4 mr-4" />
              Settings
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavHeader>
            <DashboardSidebarNavHeaderTitle>
              Extra Links
            </DashboardSidebarNavHeaderTitle>
          </DashboardSidebarNavHeader>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/">
              Need help?
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/">Site</DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>

      <DashboardSidebarFooter>
        <UserDropdown user={user} />
      </DashboardSidebarFooter>
    </DashboardSidebarContainer>
  );
}
