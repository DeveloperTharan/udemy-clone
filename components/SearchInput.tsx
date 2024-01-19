"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import debounce from "debounce";
import { cn } from "@/lib/utils";

import { Input, Spinner } from "@nextui-org/react";

import { Search } from "lucide-react";
import Link from "next/link";

interface SearchInputProps {
  isTeacherPage?: boolean;
  isPlayerPage?: boolean;
  isCoursePage?: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  imageUrl: string;
  category: { id: string; name: string };
}

export const SearchInput = ({
  isTeacherPage,
  isCoursePage,
  isPlayerPage,
}: SearchInputProps) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean | null>(null);

  const handleSearch = debounce(async (event) => {
    if (event.target.value == "") {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(`/api/courses/search/${event.target.value}`);
      const result = await response.json();

      if (!result) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      setSearchResults(result);
      setIsSearching(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }, 1000);

  return (
    <div
      className={cn(
        isTeacherPage || isPlayerPage || isCoursePage ? "hidden" : ""
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
        className="w-full lg:w-96 lg:ml-10"
        autoComplete="off"
        onChange={handleSearch}
      />
      <div
        className={cn(
          "absolute bg-background w-full  h-auto max-h-screen z-20 left-0 top-[8rem] lg:top-[65px] shadow-2xl p-2",
          searchResults.length > 0 ? "flex flex-col" : "hidden"
        )}
      >
        <div className="flex justify-center items-center">
          {isSearching ? <Spinner className="h-6 w-6 animate-spin" /> : null}
        </div>

        {searchResults.length > 0 ? (
          <>
            {searchResults.map((item) => (
              <div className="p-1" key={item.id}>
                <Link
                  href={`/product/${item?.id}`}
                  className="flex items-center justify-start w-full cursor-pointer 
                      hover:bg-gray-100/80 dark:hover:bg-gray-900/80 p-1 px-2 rounded-lg"
                >
                  <img
                    className="h-10 w-10 rounded-md object-cover"
                    src={item?.imageUrl}
                  />
                  <div className="flex flex-col items-start justify-start ml-4">
                    <div className="truncate font-medium">{item?.title}</div>
                    <div className="text-gray-500 italic text-sm">
                      {item?.category?.name}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};
