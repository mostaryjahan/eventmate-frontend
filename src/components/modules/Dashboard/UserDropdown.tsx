"use client";

import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logout";
import { UserInfo } from "@/types/user.interface";
import { LayoutDashboardIcon, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  // const handleLogout = async () => {
  //   await logoutUser();
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full p-0 overflow-hidden">
          {userInfo.image ? (
            <Image 
              src={userInfo.image} 
              alt={userInfo.name} 
              width={40} 
              height={40} 
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex gap-6">
          <div>
            {userInfo.image ? (
              <Image src={userInfo.image} alt={userInfo.name} width={40} height={40} className="rounded-full border"/>
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold border">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground">{userInfo.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
         <DropdownMenuItem asChild>
          <Link href={"/dashboard"} className="cursor-pointer">
            <LayoutDashboardIcon className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/my-profile"} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        
        
        {/* <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600"
        >
          <LogoutButton />
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;