"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createBrand, updateBrand } from "@/actions/brand.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BrandType } from "@/types/brand.types";
import { zodResolver } from "@hookform/resolvers/zod";

type ManageBrandModalProps = {
  brand?: BrandType;
  type: "create" | "update";
};
const formSchema = z.object({
  brandName: z.string().min(2, {
    message: "Brand Name must be at least 2 characters.",
  }),
});

const ManageBrandModal = ({ brand, type = "create" }: ManageBrandModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentBrandName, setCurrentBrandName] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: type === "update" && brand ? brand.brandName : "",
    },
  });

  useEffect(() => {
    if (open) {
      setCurrentBrandName(type === "update" && brand ? brand.brandName : "");
      form.reset({ brandName: currentBrandName });
    }
  }, [open, currentBrandName, form, type, brand]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type == "update" && brand) {
        const res = await updateBrand(brand._id, values);
        if (res.success) {
          toast.success(res.message || "Edit brand successfully");
          setCurrentBrandName(values.brandName);
          setOpen(false);
        } else {
          form.setError("brandName", { message: res.message });
        }
      } else {
        const res = await createBrand(values);
        if (res.success) {
          toast.success(res.message || "Create brand successfully");
          setCurrentBrandName("");
          setOpen(false);
        } else {
          form.setError("brandName", { message: res.message });
        }
      }
    } catch (error: any) {
      form.setError("brandName", { message: error.message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {type == "create" ? (
          <Button variant="primary" className="text-xl font-semibold flex gap-2 items-center">
            <PlusCircle /> Create
          </Button>
        ) : (
          <Edit size={20} className="cursor-pointer" />
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{type == "create" ? "Create Brand" : "Edit Brand"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" variant={"default"}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageBrandModal;
