"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/provider/theme-provider";

import { Button, Input, Link } from "@nextui-org/react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

import { Search, LogOut, X } from "lucide-react";

const MainHeader = () => {
  const [Open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { isSignedIn } = useAuth();

  let isTeaherPage = pathname?.startsWith("/teacher");
  let isPlayerPage = pathname?.includes("/chapter");

  return (
    <nav
      className="flex flex-row items-center w-full px-2 lg:px-10 py-5 h-auto max-h-16 shadow 
      dark:shadow-slate-800"
    >
      <div className="flex flex-row justify-start items-center mr-auto gap-x-2 lg:gap-x-10">
        <Image
          src="/logo-black.svg"
          alt="learn"
          width={110}
          height={110}
          className="dark:hidden"
        />
        <Image
          src="/logo-white.svg"
          alt="learn"
          width={110}
          height={110}
          className="hidden dark:block"
        />
        <div className={`${isTeaherPage || isPlayerPage ? "hidden" : ""}`}>
          <Input
            type="text"
            placeholder="Search for any thing"
            labelPlacement="outside"
            startContent={
              <Search className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
            }
            radius="full"
            className="w-96 hidden lg:block"
          />
        </div>
        <div className={`${isTeaherPage || isPlayerPage ? "hidden" : ""}`}>
          {Open === false ? (
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden hover:bg-default-300/80 p-1 rounded-md"
            >
              <Search className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
            </button>
          ) : (
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden hover:bg-default-300/80 p-1 rounded-md"
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
        {isTeaherPage || isPlayerPage ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push("/main")}
            className={`${pathname === "/" ? "hidden" : "block"} `}
          >
            <LogOut className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
            Exit
          </Button>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push("/teacher")}
            className={`${pathname === "/" ? "hidden" : "block"} `}
          >
            Teacher Mode
          </Button>
        )}
        <ThemeSwitcher />
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
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
