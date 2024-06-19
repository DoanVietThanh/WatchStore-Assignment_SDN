import Image from "next/image";

import { getCurrentMember } from "@/actions/member.action";
import { UpdatePasswordModal } from "@/components/modal/update-password";
import { UpdateProfileModal } from "@/components/modal/update-profile";

const ProfileDetailPage = async () => {
  const userInfo = await getCurrentMember();

  if (!userInfo) {
    return <div>Member not found</div>;
  }

  return (
    <div className="flex-1 flex bg-slate-50 p-8 gap-10 justify-center w-full">
      <div className="flex items-center justify-center ">
        <Image
          src={`https://avatar.iran.liara.run/public/boy?username=${userInfo?.name}`}
          alt="logo"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col gap-8 font-semibold text-xl min-w-[30vw]">
        <div className="flex justify-between">
          <span>Member Name</span>
          <span className="font-medium ml-8">{userInfo?.memberName}</span>
        </div>
        <div className="flex justify-between">
          <span>Name</span> <span className="font-medium ml-8">{userInfo?.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Year of birth</span>
          <span className="font-medium ml-8">{userInfo?.yob}</span>
        </div>
        <UpdateProfileModal userInfo={userInfo} />
        <UpdatePasswordModal userInfo={userInfo} />
      </div>
    </div>
  );
};

export default ProfileDetailPage;
