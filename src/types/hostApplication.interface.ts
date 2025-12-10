export interface HostApplication {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
  appliedAt: string;
  reviewedAt?: string;
}