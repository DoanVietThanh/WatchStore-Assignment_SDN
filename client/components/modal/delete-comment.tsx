"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteComment } from "@/actions/comment.action";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle, 
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";

type DeleteCommentModalProps = {
  watchId: string;
  commentId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function DeleteCommentModal({ watchId, commentId, open, setOpen }: DeleteCommentModalProps) {
  const router = useRouter();

  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment(watchId, commentId);
      if (res.success) {
        toast.success(res.message || "Delete comment success");
        setOpen(false);
        router.push(`/watch/${watchId}`);
        router.refresh();
      } else {
        toast.error(res.message || "An error occurred while deleting comment");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while deleting comment");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Trash className="cursor-pointer mr-2 h-6 w-6" color="red" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete this comment?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant={"destructive"} onClick={handleDeleteComment}>
            Delete
          </Button>
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
