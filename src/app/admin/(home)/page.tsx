import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/dashboard";
import { Button } from "@/components/ui/button";
import { FilePlusIcon, PlusIcon } from "@radix-ui/react-icons";
import { getGroups } from "../groups/actions";
import { ContactsDataTable } from "./_components/contact-data-table";
import { ContactUpsertSheet } from "./_components/contact-upsert-sheet";
import { ContactUploadSheet } from "./_components/upload-contacts-sheet";
import { getContacts } from "./actions";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page() {
  const contacts = await getContacts();
  const groups = await getGroups();

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Contacts</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <div className="flex flex-row gap-5">
            <ContactUploadSheet groups={groups}>
              <Button variant="outline" size="sm">
                <FilePlusIcon className="w-4 h-4 mr-2" />
                Upload contacts
              </Button>
            </ContactUploadSheet>
            <ContactUpsertSheet groups={groups}>
              <Button variant="outline" size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add contact
              </Button>
            </ContactUpsertSheet>
          </div>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <ContactsDataTable groups={groups!} data={contacts!} />
      </DashboardPageMain>
    </DashboardPage>
  );
}
