import React from "react";

import { fetchComments } from "@/actions/comment.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dateFormat } from "@/lib/convert-date";
type WatchCommentListProps = { watchId: string };

const WatchCommentList = async ({ watchId }: WatchCommentListProps) => {
  const commentList = await fetchComments(watchId);

  if (!commentList) {
    return <div>No comment</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {commentList?.data?.map((item: any) => (
        <div key={item._id} className="flex flex-col gap-2 border p-4 rounded-2xl shadow-lg hover:bg-slate-50">
          <div className="flex gap-4 items-center px-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{item.author.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <div className="font-serif text-2xl font-semibold">{item.author.memberName}</div>
                <div className="font-semibold">{dateFormat(item.createdAt)}</div>
              </div>
              <div className="italic">Rating {Array.from({ length: item.rating }).map(() => "⭐️")}</div>
            </div>
          </div>
          <div className="p-4 font-medium">{item.content}</div>
        </div>
      ))}
    </div>
  );
};

export default WatchCommentList;
