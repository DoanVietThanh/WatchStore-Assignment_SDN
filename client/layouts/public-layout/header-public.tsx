import Image from "next/image";
import Link from "next/link";

import { getCurrentMember } from "@/actions/member.action";
import DropdownUser from "@/components/dropdown-user";
import { Button } from "@/components/ui/button";
const HeaderPublic = async () => {
  const userInfo = await getCurrentMember();

  return (
    <div className="flex items-center justify-between px-10 py-2 mb-4 border shadow-md">
      <Link href={"/"}>
        <Image
          src="https://theme.hstatic.net/200000656863/1001222351/14/logo.png?v=377"
          alt="logo"
          width={150}
          height={150}
          layout="intrinsic"
        />
      </Link>
      <div className="flex gap-4">
        <Button variant={"ghost"} asChild>
          <Link href={"/watch"}>Watches</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href={"/contact"}>Contact</Link>
        </Button>
        {userInfo ? (
          <DropdownUser userInfo={userInfo} />
        ) : (
          <Button variant={"default"} asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderPublic;
