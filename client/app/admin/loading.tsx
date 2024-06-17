import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const AdminPageLoading = () => {
  return (
    <div className="container flex flex-col space-y-3 gap-8 mt-8">
      <Skeleton className="h-[60px] w-[600px] rounded-xl" />
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>
  );
};

export default AdminPageLoading;
