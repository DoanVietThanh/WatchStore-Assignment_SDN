"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

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
const HeaderPublic = () => {
  const { data } = useSession();
  console.log("🚀 ~ HeaderPublic ~ data:", data);
  const user = data?.user;
  return (
    <div className="border flex items-center justify-between px-8 py-2">
      <Image
        src="https://theme.hstatic.net/200000656863/1001222351/14/logo.png?v=377"
        alt="logo"
        width={150}
        height={150}
      />
      <div className="flex-1 text-center">search</div>
      <div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <Avatar>
                  <AvatarImage src={user?.image as string} alt={`${user?.name} profile picture`} />
                  <AvatarFallback>{user?.name?.split(" ")[0][0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-50 bg-white">
              <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-200">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:bg-slate-200"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div>
            <Button variant={"link"} onClick={() => signIn()}>
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderPublic;
