"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { serialize } from "@/lib/serialize-query-string";
import { cn } from "@/lib/utils";

import { Label } from "./ui/label";
type SearchBrandProps = {
  route: string;
  brands: any[];
};

const SearchBrand = ({ route, brands }: SearchBrandProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const searchParams = useSearchParams();

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
  }, [brandName, route, router, searchParams]);

  return (
    <div className="my-8 flex items-center gap-8">
      <Label className="font-semibold text-xl">Brand</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            {brandName ? brands.find((brand) => brand.brandName === brandName)?.brandName : "Select brand"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search brand..." />
            <CommandList>
              <CommandEmpty>No brand found.</CommandEmpty>
              <CommandGroup>
                {brands.map((brand) => (
                  <CommandItem
                    key={brand._id}
                    value={brand.brandName}
                    onSelect={(currentValue) => {
                      setBrandName(currentValue === brandName ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", brandName === brand.brandName ? "opacity-100" : "opacity-0")}
                    />
                    {brand.brandName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBrand;
