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
    <div className="flex flex-col px-8 gap-4">
      {commentList?.data?.map((item: any) => (
        <div key={item._id} className="flex flex-col gap-2 border p-4 rounded-2xl shadow-lg">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{item.author.name}</AvatarFallback>
            </Avatar>
            <div className="font-serif text-2xl font-semibold">{item.author.memberName}</div>
            <div>{Array.from({ length: item.rating }).map(() => "⭐️")}</div>
            <div className="font-semibold">{dateFormat(item.createdAt)}</div>
          </div>
          <div>{item.content}</div>
        </div>
      ))}
    </div>
  );
};

export default WatchCommentList;
