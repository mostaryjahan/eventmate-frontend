import { UserRole } from "@/lib/auth-utils";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  image?: string;
  location?: string;
  interests?: string[];
  bio?: string;
}