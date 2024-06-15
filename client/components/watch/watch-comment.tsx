"use client";
import React, { FormEvent, useState } from "react";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

import { createComment } from "@/actions/comment.action";
import { getCurrentMember } from "@/actions/member.action";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type WatchCommentProps = {
  watchId: string;
};

const WatchComment = ({ watchId }: WatchCommentProps) => {
  const [content, setContent] = useState<string>("");
  const handleComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const currentMember = await getCurrentMember(localStorage.getItem("token") as string);
      const comment = await createComment(
        localStorage.getItem("token") as string,
        {
          rating: 3,
          content,
          author: currentMember.data._id,
        },
        watchId
      );
      console.log("🚀 ~ handleComment ~ comment:", comment);
      if (comment.success) {
        setContent("");
        toast.success(comment.message || "Comment success");
        revalidatePath(`/watch/${watchId}`);
      } else {
        toast.error(comment.message || "Comment failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Comment failed");
    }
  };

  return (
    <section className="">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="mb-4 text-3xl lg:text-4xl text-gray-800 dark:text-white font-serif">Comment</h2>
      </div>
      <form onSubmit={(e) => handleComment(e)} className="flex flex-col items-end">
        <Textarea
          required
          placeholder="Type your message here."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant={"default"} className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
};

export default WatchComment;
