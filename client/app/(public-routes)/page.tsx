import Link from "next/link";
import React from "react";

const IndexPage = () => {
  return (
    <div>
      <Link href="/home?brandName=A&pageNumber=1&sortBy=brandName&pageSize=8&sortOrder=1">Home</Link>
    </div>
  );
};

export default IndexPage;
