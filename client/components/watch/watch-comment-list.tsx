import React from "react";

import { fetchComments } from "@/actions/comment.action";

type WatchCommentListProps = { watchId: string };

const WatchCommentList = async ({ watchId }: WatchCommentListProps) => {
  const commentList = await fetchComments(watchId);

  if (!commentList) {
    return <div>No comment</div>;
  }

  console.log("🚀 ~ WatchCommentList ~ commentList:", commentList);
  return (
    <div>
      {commentList?.data?.map((item: any) => (
        <div key={item._id}>
          <div>Content: {item.content}</div>
          <div>Rating: {item.rating}</div>
          <div>Member Name: {item.author.memberName}</div>
          <div>Name: {item.author.name}</div>
          <div>YOB: {item.author.yob}</div>
        </div>
      ))}
    </div>
  );
};

export default WatchCommentList;
