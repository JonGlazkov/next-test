import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/dashboard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { GroupsDataTable } from "./_components/groups-data-table";
import { GroupUpsertSheet } from "./_components/groups-upsert-sheet";
import { getGroups } from "./actions";

export default async function Page() {
  const groups = await getGroups();

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Groups</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <GroupUpsertSheet>
            <Button variant="outline" size="sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add group
            </Button>
          </GroupUpsertSheet>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <GroupsDataTable data={groups!} />
      </DashboardPageMain>
    </DashboardPage>
  );
}
