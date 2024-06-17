"use client";
import { useEffect, useState } from "react";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteBrand } from "@/actions/brand.action";
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

type DeleteBrandModalProps = {
  brand: BrandType;
};

const DeleteBrandModal = ({ brand }: DeleteBrandModalProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const handleDeleteBrand = async () => {
    try {
      const res = await deleteBrand(brand._id);
      if (res.success) {
        toast.success(res.message || "Delete brand success");
        setOpen(false);
        router.push("/admin/manage-brand");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while deleting brand");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash size={20} className="cursor-pointer" color="red" onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Brand</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold">{brand.brandName}</span> brand?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant={"destructive"} onClick={() => handleDeleteBrand()}>
            Delete
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBrandModal;
