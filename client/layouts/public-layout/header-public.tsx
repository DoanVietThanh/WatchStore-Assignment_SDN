"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Settings, User } from "lucide-react";

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
import { getUserInfo } from "@/lib/manage-state-client";
const HeaderPublic = () => {
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();
  const userInfo = getUserInfo();
  console.log("🚀 ~ HeaderPublic ~ userInfo:", userInfo);
  return (
    <div className="flex items-center justify-between px-10 py-2 mb-4 border shadow-md">
      <Link href={"/"}>
        <Image
          src="https://theme.hstatic.net/200000656863/1001222351/14/logo.png?v=377"
          alt="logo"
          width={150}
          height={150}
          layout="intrinsic"
        />
      </Link>
      {userInfo ? (
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
            <DropdownMenuItem
              onClick={() => router.push(`/profile/${userInfo?._id}`)}
              className="cursor-pointer hover:bg-slate-200"
            >
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
        <Button variant={"default"} onClick={() => {}} asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </div>
  );
};

export default HeaderPublic;
