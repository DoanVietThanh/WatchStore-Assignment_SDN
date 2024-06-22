import { Edit } from "lucide-react";

import { fetchComments } from "@/actions/comment.action";
import { getCurrentMember } from "@/actions/member.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dateFormat } from "@/lib/convert-date";

import { DeleteCommentModal } from "../modal/delete-comment";

type WatchCommentListProps = { watchId: string };

const WatchCommentList = async ({ watchId }: WatchCommentListProps) => {
  const userInfo = await getCurrentMember();
  const commentList = await fetchComments(watchId);

  if (!commentList) {
    return <div className="container">No comment</div>;
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
                <AvatarFallback>User</AvatarFallback>
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
                <DeleteCommentModal watchId={watchId} commentId={item._id} />
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
