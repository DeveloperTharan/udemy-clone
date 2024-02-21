"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/provider/theme-provider";

import { cn } from "@/lib/utils";
import { SearchInput } from "./SearchInput";
import { useUser } from "@/context/userContext";
import { useAuth } from "@clerk/nextjs";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
} from "@nextui-org/react";

import { LogOut } from "lucide-react";

export const MainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isSignedIn, signOut } = useAuth();

  const { user } = useUser();

  let isTeacherPage = pathname?.startsWith("/teacher");
  let isPlayerPage = pathname?.includes("/chapter");
  let isCoursePage = pathname?.startsWith("/course");

  return (
    <nav
      className="flex flex-row items-center w-full px-5 lg:px-10 py-5 h-auto max-h-16 shadow 
      dark:shadow-slate-800"
    >
      <div className="flex flex-row justify-start items-center mr-auto">
        <Link href={isSignedIn ? "/" : "/"}>
          <Image
            src="/logo-black.svg"
            alt="learn"
            width={110}
            height={110}
            className="dark:hidden"
          />
        </Link>
        <Link href={isSignedIn ? "" : "/"}>
          <Image
            src="/logo-white.svg"
            alt="learn"
            width={110}
            height={110}
            className="hidden dark:block"
          />
        </Link>
        <div className="hidden lg:block">
          <SearchInput isTeacherPage={isTeacherPage} isPlayerPage={isPlayerPage} isCoursePage={isCoursePage} />
        </div>
      </div>
      <div className="flex flex-row justify-start items-center ml-auto gap-x-4">
        {user?.role == "TEACHER" ? (
          <div
            className={cn(isCoursePage ? "hidden" : "flex flex-row gap-x-2")}
          >
            {isTeacherPage || isPlayerPage ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push("/")}
              >
                <LogOut className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
                Exit
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push("/teacher")}
              >
                Teacher Mode
              </Button>
            )}
          </div>
        ) : null}
        <ThemeSwitcher />
        {isSignedIn && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.firstName}
                size="sm"
                src={user?.imageUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="text-gray-500 dark:text-gray-400">Signed in as</p>
                <p className="font-semibold truncate">{user?.email}</p>
              </DropdownItem>
              <DropdownItem
                key="dashboard"
                onClick={() => router.push("/student/dashboard")}
                className={`${user?.role == "TEACHER" ? "hidden" : ""}`}
              >
                Dashboard
              </DropdownItem>
              <DropdownItem
                key="settings"
                onClick={() => router.push("/settings")}
              >
                Settings
              </DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut().then(() => router.push("/"))}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>)}
      </div>
    </nav>
  );
};
