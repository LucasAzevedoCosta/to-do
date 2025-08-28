"use client";

import { getMe } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
};

export function useUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getMe,
  });
}
