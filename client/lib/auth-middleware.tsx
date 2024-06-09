"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

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
