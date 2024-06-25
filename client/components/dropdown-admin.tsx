"use client";
import { useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { logoutMember } from "@/actions/member.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type DropdownAdminProps = {
  userInfo: any;
};

const DropdownAdmin = ({ userInfo }: DropdownAdminProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleLogout = async () => {
    startTransition(async () => {
      const res = await logoutMember();
      if (res?.success) {
        toast.success(res?.message || "Logout successfully");
        router.push("/sign-in");
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
      <DropdownMenuContent className="z-50 bg-white">
        <DropdownMenuItem
          onClick={() => router.push(`/admin/manage-user`)}
          className="cursor-pointer hover:bg-slate-200"
        >
          <span>Manage User</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/admin/manage-watch`)}
          className="cursor-pointer hover:bg-slate-200"
        >
          <span>Manage Watch</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/admin/manage-brand`)}
          className="cursor-pointer hover:bg-slate-200"
        >
          <span>Manage Brand</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-slate-200" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAdmin;
