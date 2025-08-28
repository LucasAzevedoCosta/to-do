import axios from "@/lib/api/axios";
import type { UserProfile } from "@/types/user";

export async function getMe(): Promise<UserProfile> {
  const { data } = await axios.get<{ user: UserProfile }>("/users/me");
  return data.user;
}