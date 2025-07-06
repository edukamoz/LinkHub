export interface Link {
  _id: string;
  title: string;
  url: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  username?: string;
}
