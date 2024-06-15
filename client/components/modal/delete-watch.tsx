"use client";
import { useState } from "react";
import { Trash } from "lucide-react";

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
          <Button type="submit" variant={"destructive"}>
            Delete
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWatchModal;
