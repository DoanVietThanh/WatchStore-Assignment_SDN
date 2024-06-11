"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "./ui/input";

const Searchbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      router.push(`/?${search}`);
    }, 300);
    return () => clearTimeout(debounce);
  }, [router, search]);

  return (
    <div>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && router.push(`/search/${search}`)}
      />
    </div>
  );
};

export default Searchbar;
