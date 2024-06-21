import React from "react";

import { WatchItemType } from "@/types/watch.types";

import WatchItem from "./watch-item";

type WatchListProps = {
  watchesListData: WatchItemType[];
};

const WatchList = ({ watchesListData }: WatchListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {watchesListData?.map((watch: WatchItemType) => (
        <WatchItem key={watch._id} watch={watch} />
      ))}
    </div>
  );
};

export default WatchList;
