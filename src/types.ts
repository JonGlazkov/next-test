export type Contact = {
  id: string;
  name: string;
  phone: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
  group: Group;
};

export type Group = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  contacts?: Contact[];
};
