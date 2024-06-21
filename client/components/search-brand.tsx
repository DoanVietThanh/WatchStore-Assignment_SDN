"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { serialize } from "@/lib/serialize-query-string";

import { Input } from "./ui/input";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type SearchBrandProps = {
  route: string;
  paramKey: string;
};
const SearchBrand = ({ route, paramKey }: SearchBrandProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    let obj: { [key: string]: string } = {};
    const delayDebounceFn = setTimeout(() => {
      searchParams.forEach((value, key: string) => {
        obj[key] = value;
      });

      if (brandName) {
        obj["brandName"] = brandName;
      } else {
        delete obj["brandName"];
      }
      router.push(`/${route}?${serialize(obj)}`);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [route, router, searchParams, brandName, paramKey]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBrandName(event.target.value);
  };

  return (
    <div className="my-8">
      <Input placeholder="Search brand" value={brandName} onChange={(e) => handleInputChange(e)} />
    </div>
  );
};

export default SearchBrand;
