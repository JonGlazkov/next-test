import ApiService from "@/services";
import { Contact, Group } from "@/types";

const apiService = new ApiService("http://localhost:3333/groups");

export type CreateGroupProps = {
  name: string;
};

type UpdateGroupProps = {
  name: string;
};

export type GroupResponse = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  contacts: Contact[];
};

// Método GET
export async function getGroups() {
  try {
    return await apiService.get<Group[]>("/");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function createGroup(group: CreateGroupProps) {
  try {
    return await apiService.post<GroupResponse, CreateGroupProps>(`/`, group);
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function updateGroup(id: string, group: UpdateGroupProps) {
  try {
    return await apiService.put<GroupResponse, UpdateGroupProps>(
      `/${id}`,
      group
    );
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

export async function deleteGroup(id: string) {
  try {
    return await apiService.delete(`/${id}`);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
