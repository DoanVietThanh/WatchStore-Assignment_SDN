import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trello, User, Watch } from "lucide-react";

const adminRoute = [
  {
    path: "/admin/manage-user",
    label: "Manage User",
    icon: <User />,
  },
  {
    path: "/admin/manage-brand",
    label: "Manage Brand",
    icon: <Trello />,
  },
  {
    path: "/admin/manage-watch",
    label: "Manage Watch",
    icon: <Watch />,
  },
];

const SidebarAdmin = () => {
  return (
    <div className="bg-[#1C2434] text-white p-8 h-screen">
      <div className="p-4 text-center">
        <Image
          src="https://theme.hstatic.net/200000656863/1001222351/14/logo.png?v=377"
          alt="logo"
          width={150}
          height={150}
          layout="intrinsic"
        />
      </div>
      <div className="flex flex-col mt-2">
        {adminRoute.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="text-gray-400 flex items-center gap-4 hover:text-white hover:bg-slate-500 p-4 rounded-lg"
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarAdmin;
