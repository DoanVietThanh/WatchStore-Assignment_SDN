"use client";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteComment } from "@/actions/comment.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DeleteCommentModalProps = {
  watchId: string;
  commentId: string;
};

export function DeleteCommentModal({ watchId, commentId }: DeleteCommentModalProps) {
  const router = useRouter();

  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment(watchId, commentId);
      if (res.success) {
        toast.success(res.message || "Delete comment success");
        router.refresh();
      } else {
        toast.error(res.message || "An error occurred while deleting comment");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while deleting comment");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash className="cursor-pointer mr-2 h-6 w-6" color="red" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete this comment?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDeleteComment} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
