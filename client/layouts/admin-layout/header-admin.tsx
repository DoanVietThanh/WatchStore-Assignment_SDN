import { redirect } from "next/navigation";
import { toast } from "sonner";

import { getCurrentMember } from "@/actions/member.action";
import DropdownUser from "@/components/dropdown-user";
const HeaderAdmin = async () => {
  const date = new Date();
  const userInfo = await getCurrentMember();

  if (!userInfo && !userInfo?.isAdmin) {
    toast.error("You don't have permission to access this page");
    redirect("/sign-in");
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="p-4 flex justify-between shadow-md">
      <div className="flex items-center pl-8 text-2xl font-semibold text-orange-600">{formattedDate}</div>
      <DropdownUser userInfo={userInfo} />
    </div>
  );
};

export default HeaderAdmin;
