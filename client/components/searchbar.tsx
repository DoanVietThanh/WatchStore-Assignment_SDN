"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { serialize } from "@/lib/serialize-query-string";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

type SearchbarProps = {
  route: string;
  placeholder: string;
};

const Searchbar = ({ route, placeholder }: SearchbarProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    let obj: { [key: string]: string } = {};
    const delayDebounceFn = setTimeout(() => {
      searchParams.forEach((value, key: string) => {
        obj[key] = value;
      });
      if (search) {
        obj["watchName"] = search;
      } else {
        delete obj["watchName"];
      }
      router.push(`/${route}?${serialize(obj)}`);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [route, router, search, searchParams]);

  return (
    <div className="container flex justify-center items-center my-8 gap-4">
      <Label htmlFor="search" className="font-semibold text-xl">
        Search
      </Label>
      <Input
        id="search"
        value={search}
        placeholder={placeholder}
        className="w-1/3"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && router.push(`/search/${search}`)}
      />
    </div>
  );
};

export default Searchbar;
