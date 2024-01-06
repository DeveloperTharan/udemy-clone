"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { ThemeSwitcher } from "@/provider/theme-provider";

import { Search, Heart, ShoppingCart, MoreVertical } from "lucide-react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const MainHeader = () => {
  const { theme } = useTheme();

  return (
    <Navbar shouldHideOnScroll maxWidth="full" className="shadow-lg dark:shadow-slate-800">
      <NavbarContent justify="start">
        <NavbarBrand>
            <Image src="/logo-black.svg" alt="learn" width={110} height={110} className="dark:hidden" />
            <Image src="/logo-white.svg" alt="learn" width={110} height={110} className="hidden dark:block" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="start">
        <Input
          type="text"
          placeholder="Search for any thing"
          labelPlacement="outside"
          startContent={
            <Search className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          size="md"
          radius="full"
          className="lg:w-96"
        />
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Heart className="h-5 w-5" role="button" />
        </NavbarItem>
        <NavbarItem>
          <ShoppingCart className="h-5 w-5" role="button" />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="ghost" className="border-0">
              <MoreVertical />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem>
              <div className="flex flex-row items-center justify-between w-full">
                <ThemeSwitcher />
                <h4>{theme}</h4>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex flex-row items-center justify-between w-full">
                <Heart className="h-5 w-5" role="button" />
                <h4>Favorites</h4>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="flex flex-row items-center justify-between w-full">
                <ShoppingCart className="h-5 w-5" role="button" />
                <h4>Cart</h4>
              </div>
            </DropdownItem>
            <DropdownItem>
              <Link href="#">Login</Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="#">SignUp</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default MainHeader;
