"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { fetchBrands } from "@/actions/brand.action";
import { createWatch, updateWatch } from "@/actions/watch.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandType } from "@/types/brand.types";
import { WatchItemType } from "@/types/watch.types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "../ui/textarea";

type ManageWatchModalProps = {
  watch?: WatchItemType;
  type: "create" | "update";
};

const formSchema = z.object({
  watchName: z.string().min(2, {
    message: "Watch Name must be at least 2 characters.",
  }),
  image: z.string().url({ message: "Invalid image URL" }),
  price: z.number().nonnegative({ message: "Price must be a non-negative number" }).min(1, {
    message: "Price must be at least 1.",
  }),
  automatic: z.boolean().default(false),
  watchDescription: z.string().min(2, {
    message: "Watch Description must be at least 2 characters.",
  }),
  brand: z.string().refine((val) => val !== "", { message: "Brand is required" }),
});

const initCreateFormValues = {
  watchName: "",
  image: "",
  price: 1,
  automatic: false,
  watchDescription: "",
  brand: "",
};

const ManageWatchModal = ({ watch, type = "create" }: ManageWatchModalProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [defaultWatchValues, setDefaultWatchValues] = useState<z.infer<typeof formSchema> | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultWatchValues,
  });

  useEffect(() => {
    if (open) {
      if (type === "update" && watch) {
        setDefaultWatchValues({
          brand: watch.brand?._id,
          image: watch.image,
          price: watch.price,
          watchName: watch.watchName,
          automatic: watch.automatic,
          watchDescription: watch.watchDescription,
        });
      } else {
        setDefaultWatchValues(initCreateFormValues);
      }

      const fetchBrandsData = async () => {
        const brands = await fetchBrands();
        setBrands(brands.data);
      };

      fetchBrandsData();
    }
  }, [open, type]);

  useEffect(() => {
    if (defaultWatchValues) {
      form.reset(defaultWatchValues);
    }
  }, [defaultWatchValues, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "update" && watch) {
        const res = await updateWatch(watch._id, values);
        if (res.success) {
          toast.success(res.message || "Edit watch successfully");
          setDefaultWatchValues(values);
          setOpen(false);
          router.refresh();
        }
      } else {
        const res = await createWatch(values);
        if (res.success) {
          toast.success(res.message || "Edit watch successfully");
          setOpen(false);
          router.refresh();
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Edit watch failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {type === "create" ? (
          <Button variant="primary" className="text-xl font-semibold flex gap-2 items-center">
            <PlusCircle /> Create
          </Button>
        ) : (
          <Edit size={20} className="cursor-pointer" />
        )}
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-md overflow-y-scroll max-h-[94vh]"}>
        <DialogHeader>
          <DialogTitle>{type === "create" ? "Create Watch" : "Edit Watch"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="watchName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter watch name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center justify-center">
                    <FormLabel className="mt-[8px]">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        value={field.value}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center ">
                    <FormLabel className="mt-[8px]">Brands</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a brand" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {brands.length > 0 &&
                              brands?.map((brand) => (
                                <SelectItem key={brand._id} value={brand._id}>
                                  {brand.brandName}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="automatic"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center justify-center">
                    <FormLabel className="mt-[8px]">Automatic</FormLabel>
                    <FormControl className="m-0">
                      <Input type="checkbox" checked={field.value} onChange={field.onChange} className="m-0 w-4 h-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="watchDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
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

export default ManageWatchModal;
