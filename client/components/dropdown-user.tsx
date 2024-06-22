"use client";
import React, { useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { LogOut, Settings, User } from "lucide-react";
import { toast } from "sonner";

import { logoutMember } from "@/actions/member.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type DropdownUserProps = {
  userInfo: any;
};

const DropdownUser = ({ userInfo }: DropdownUserProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleLogout = async () => {
    startTransition(async () => {
      const res = await logoutMember();
      if (res?.success) {
        toast.success(res?.message || "Logout successfully");
        redirect("/sign-in");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">{userInfo?.memberName}</h2>
            <Avatar className="">
              <AvatarImage
                src={`https://avatar.iran.liara.run/public/boy?username=${userInfo?.name}`}
                alt={`${userInfo?.name} profile picture`}
              />
              <AvatarFallback>{userInfo?.name?.split(" ")[0][0]}</AvatarFallback>
            </Avatar>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-50 bg-white">
        <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!userInfo?.isAdmin && (
          <DropdownMenuItem
            onClick={() => router.push(`/profile/${userInfo?._id}`)}
            className="cursor-pointer hover:bg-slate-200"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="cursor-pointer hover:bg-slate-200">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer hover:bg-slate-200" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;
