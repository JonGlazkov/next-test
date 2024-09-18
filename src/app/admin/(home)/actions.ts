import ApiService from "@/services";
import { Contact } from "@/types";

const apiService = new ApiService("http://localhost:3333/contacts");

export type ContactProps = {
  name: string;
  phone: string;
};

type UpdateContactProps = {
  name?: string;
  phone?: string;
};

export type ContactResponse = {
  id: string;
  name: string;
  phone: string;
};

// Método GET
export async function getContacts() {
  try {
    return await apiService.get<Contact[]>("/");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function createContact(groupId: string, contact: ContactProps) {
  try {
    return await apiService.post<ContactResponse, ContactProps>(
      `/add/${groupId}`,
      contact
    );
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function uploadContact(groupId: string, file: FormData) {
  try {
    return await apiService.post<ContactResponse, FormData>(
      `/upload/${groupId}`,
      file,
      { headers: { "Content-Type": "multipart/form-data" }, data: file }
    );
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

export async function updateContact(id: string, contact: UpdateContactProps) {
  try {
    return await apiService.put<ContactResponse, UpdateContactProps>(
      `/${id}`,
      contact
    );
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

export async function deleteContact(id: string) {
  try {
    return await apiService.delete(`/${id}`);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
