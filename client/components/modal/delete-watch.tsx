"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteWatch } from "@/actions/watch.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WatchItemType } from "@/types/watch.types";

import { Button } from "../ui/button";

type DeleteWatchModalProps = {
  watch: WatchItemType;
};

const DeleteWatchModal = ({ watch }: DeleteWatchModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleDeleteWatch = async () => {
    try {
      const res = await deleteWatch(watch._id);
      if (res.success) {
        toast.success(res.message || "Delete watch success");
        setOpen(false);
        router.push("/admin/manage-watch");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while deleting watch");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash size={20} className="cursor-pointer" color="red" onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Watch</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-semibold">{watch.watchName}</span> brand?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant={"destructive"} onClick={handleDeleteWatch}>
            Delete
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWatchModal;
