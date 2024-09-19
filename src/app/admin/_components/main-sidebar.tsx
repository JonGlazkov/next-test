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
import { Button } from "@/components/ui/button";
import { useDevice } from "@/context";
import {
  Cross2Icon,
  GroupIcon,
  HamburgerMenuIcon,
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
  const { isMobile, isSidebarOpen, closeSidebar, openSidebar } = useDevice();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {isMobile && !isSidebarOpen && (
        <div className="p-4 absolute -top-0.5 left-0">
          <Button variant="ghost" onClick={openSidebar}>
            <HamburgerMenuIcon className="w-6 h-6" />
          </Button>
        </div>
      )}
      <DashboardSidebarContainer
        className={`${isSidebarOpen ? "flex" : "hidden"} lg:flex`}
      >
        <DashboardSidebarHeader>
          <Logo />
          {isMobile && isSidebarOpen && (
            <div className="lg:hidden absolute p-2 top-1.5 -right-2">
              <Button variant="ghost" onClick={closeSidebar}>
                <Cross2Icon className="w-5 h-5" />
              </Button>
            </div>
          )}
        </DashboardSidebarHeader>
        <DashboardSidebarMain className="flex flex-col flex-grow">
          <DashboardSidebarNav>
            <DashboardSidebarNavMain>
              <DashboardSidebarNavLink
                href="/admin"
                active={isActive("/admin")}
              >
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
    </>
  );
}
