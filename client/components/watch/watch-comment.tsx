"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";

import { createComment } from "@/actions/comment.action";
import { getCurrentMember } from "@/actions/member.action";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type WatchCommentProps = {
  watchId: string;
};

const WatchComment = ({ watchId }: WatchCommentProps) => {
  const router = useRouter();
  const [rating, setRating] = useState<number>(2);
  const [content, setContent] = useState<string>("");

  const handleComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const currentMember = await getCurrentMember();
      const comment = await createComment(
        {
          rating,
          content,
          author: currentMember.data._id,
        },
        watchId
      );
      if (comment.success) {
        setContent("");
        setRating(2);
        toast.success(comment.message || "Comment success");
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
          rows={5}
          onChange={(e) => setContent(e.target.value)}
          className="p-4 shadow-md rounded-md"
        />
        <div className="pt-4 flex items-center gap-4">
          <h3 className="text-medium font-bold">{rating > 1 ? `Ratings (${rating})` : `Rating (${rating})`}</h3>
          {[1, 2, 3].map((item, index) => (
            <span key={index}>
              <StarIcon
                onClick={() => setRating(item)}
                className={`font-bold h-5 w-5 cursor-pointer ${item <= rating ? "text-[#FFFF00]" : "text-gray-400"}`}
                fill="yellow"
                fillOpacity={item <= rating ? 1 : 0}
              />
            </span>
          ))}
        </div>
        <Button variant={"default"} className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
};

export default WatchComment;
