"use client";

import React, { useState } from "react";
import { Edit } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BrandType } from "@/types/brand.types";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type EditBrandModalProps = {
  brand: BrandType;
};

const EditBrandModal = ({ brand }: EditBrandModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = () => {
    // Handle form submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit size={20} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="brandName" className="">
            Brand Name
          </Label>
          <Input id="brandName" defaultValue={brand.brandName} placeholder="Type Brand Name" />
        </div>
        <DialogFooter>
          <Button type="submit" variant={"primary"} onClick={onSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBrandModal;
