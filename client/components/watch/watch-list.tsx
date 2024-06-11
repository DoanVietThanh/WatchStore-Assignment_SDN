import React from "react";
import WatchItem from "./watch-item";
import { WatchItemType } from "@/types/watch.types";

type WatchListProps = {
  watchesListData: WatchItemType[];
};

const WatchList = ({ watchesListData }: WatchListProps) => {
  console.log("🚀 ~ WatchList ~ watchesListData:", watchesListData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {watchesListData?.map((watch: WatchItemType) => (
        <WatchItem key={watch._id} watch={watch} />
      ))}
    </div>
  );
};

export default WatchList;
