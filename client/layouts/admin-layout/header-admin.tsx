import { getCurrentMember } from "@/actions/member.action";
import DropdownAdmin from "@/components/dropdown-admin";
const HeaderAdmin = async () => {
  const date = new Date();
  const userInfo = await getCurrentMember();

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="p-4 flex justify-between shadow-md">
      <div className="flex items-center pl-8 text-2xl font-semibold text-orange-600">{formattedDate}</div>
      <DropdownAdmin userInfo={userInfo} />
    </div>
  );
};

export default HeaderAdmin;
