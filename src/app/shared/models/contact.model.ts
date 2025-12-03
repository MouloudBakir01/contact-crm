export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  categoryId: string | null;
  favorite: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
