import { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

export interface UserProfile {
  name: string;
  email: string;
  createdAt: string;
  image: string;
  completedTasksCount: number;
  tags: string[];
}

export function useUser(trigger: boolean = true) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!trigger) return;

    async function fetchUser() {
      try {
        const res = await axiosInstance.get("/users/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
      }
    }

    fetchUser();
  }, [trigger]);

  return user;
}
