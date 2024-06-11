"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";

type AuthMiddlewareProps = Readonly<{
  children: ReactNode;
}>;

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const { data: session } = useSession();
  // if (!session) {
  //   redirect("/");
  // }
  return <div>{children}</div>;
};

export default AuthMiddleware;
