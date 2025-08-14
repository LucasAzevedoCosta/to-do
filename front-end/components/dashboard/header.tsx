"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { ProfileDialog, UserProfile } from "./profile-dialog";
import { Logout } from "../logout";
import axiosInstance from "@/lib/axios/axiosInstance";

export function DashboardHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axiosInstance.get("/users/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-foreground">Minha lista</h1>

            <div className="flex items-center space-x-3">
              <Logout />
              <Button
                variant="ghost"
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center space-x-2 hover:bg-muted"
              >
                <span className="text-sm text-muted-foreground font-medium">
                  Perfil
                </span>
                <Avatar className="h-8 w-8 bg-primary">
                  {user?.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-primary text-card-foreground">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ProfileDialog isOpen={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
}
