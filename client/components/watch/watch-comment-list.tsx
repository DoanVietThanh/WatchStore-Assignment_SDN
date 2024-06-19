"use client";
import { useEffect, useState } from "react";
import { Edit } from "lucide-react";

import { fetchComments } from "@/actions/comment.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dateFormat } from "@/lib/convert-date";
import { getUserInfo } from "@/lib/manage-state-client";

import { DeleteCommentModal } from "../modal/delete-comment";

type WatchCommentListProps = { watchId: string };

const WatchCommentList = ({ watchId }: WatchCommentListProps) => {
  const userInfo = getUserInfo();
  const [openDeleteComment, setOpenDeleteComment] = useState(false);
  const [commentList, setCommentList] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const commentList = await fetchComments(watchId);
      setCommentList(commentList);
    };
    fetchData();
  }, [watchId, openDeleteComment]);

  if (!commentList) {
    return <div>No comment</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {commentList?.data?.map((item: any) => (
        <div
          key={item._id}
          className={`${
            item.author._id === userInfo?._id ? "border-blue-400 border-2" : ""
          } flex flex-col gap-2 border p-4 rounded-2xl shadow-lg hover:bg-slate-100`}
        >
          <div className="flex gap-4 justify-between items-center px-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`https://avatar.iran.liara.run/public`} alt="@shadcn" />
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
            {item.author._id === userInfo?._id && (
              <div className="flex gap-4 items-center">
                <Edit className="cursor-none mr-2 h-6 w-6" />
                <DeleteCommentModal
                  watchId={watchId}
                  commentId={item._id}
                  open={openDeleteComment}
                  setOpen={setOpenDeleteComment}
                />
              </div>
            )}
          </div>
          <div className="p-4 font-medium">{item.content}</div>
        </div>
      ))}
    </div>
  );
};

export default WatchCommentList;
