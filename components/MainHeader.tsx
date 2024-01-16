"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/provider/theme-provider";

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
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";

import { Search, LogOut, X } from "lucide-react";
import { useUser } from "@/context/userContext";
import { cn } from "@/lib/utils";

const MainHeader = () => {
  const [Open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  let isTeaherPage = pathname?.startsWith("/teacher");
  let isPlayerPage = pathname?.includes("/chapter");
  let isCoursePage = pathname?.startsWith("/course");

  return (
    <nav
      className="flex flex-row items-center w-full px-5 lg:px-10 py-5 h-auto max-h-16 shadow 
      dark:shadow-slate-800"
    >
      <div className="flex flex-row justify-start items-center mr-auto">
        <Link href={isSignedIn ? "/main" : "/"}>
          <Image
            src="/logo-black.svg"
            alt="learn"
            width={110}
            height={110}
            className="dark:hidden"
          />
        </Link>
        <Link href={isSignedIn ? "/main" : "/"}>
          <Image
            src="/logo-white.svg"
            alt="learn"
            width={110}
            height={110}
            className="hidden dark:block"
          />
        </Link>
        <div
          className={cn(
            isTeaherPage || isPlayerPage || isCoursePage ? "hidden" : ""
          )}
        >
          <Input
            type="text"
            placeholder="Search for any thing"
            labelPlacement="outside"
            startContent={
              <Search className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
            }
            radius="full"
            className="w-96 hidden lg:block ml-2 lg:ml-10"
          />
        </div>
        <div
          className={cn(
            isTeaherPage || isPlayerPage || isCoursePage ? "hidden" : ""
          )}
        >
          {Open === false ? (
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden hover:bg-default-300/80 p-1 rounded-md ml-2 lg:ml-10"
            >
              <Search className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
            </button>
          ) : (
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden hover:bg-default-300/80 p-1 rounded-md ml-2 lg:ml-10"
            >
              <X className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
            </button>
          )}
          {Open ? (
            <Input
              type="text"
              placeholder="Search for any thing"
              labelPlacement="outside"
              startContent={
                <Search className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
              }
              radius="full"
              className="w-96 absolute top-14 left-1/2 -translate-x-1/2 z-50"
            />
          ) : null}
        </div>
      </div>
      <div className="flex flex-row justify-start items-center ml-auto gap-x-4">
        {user?.role == "TEACHER" ? (
          <div
            className={cn(isCoursePage ? "hidden" : "flex flex-row gap-x-2")}
          >
            {isTeaherPage || isPlayerPage ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push("/main")}
                className={cn(pathname === "/" ? "hidden" : "")}
              >
                <LogOut className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
                Exit
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push("/teacher")}
                className={cn(pathname === "/" ? "hidden" : "")}
              >
                Teacher Mode
              </Button>
            )}
          </div>
        ) : null}
        <ThemeSwitcher />
        {isSignedIn ? (
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
          </Dropdown>
        ) : (
          <>
            <div className="hidden lg:flex">
              <SignInButton>
                <Link role="button">Login</Link>
              </SignInButton>
            </div>
            <div className="hidden md:flex">
              <Button as={Link} color="primary" variant="flat">
                <SignUpButton>Sign Up</SignUpButton>
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default MainHeader;
