"use client";
import React, { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";

import { Separator } from "@/components/ui/separator";

type WatchInfoProps = {
  watchInfo: any;
};

const WatchInfo = ({ watchInfo }: WatchInfoProps) => {
  const [isMore, setIsMore] = useState(false);

  function getAverageStars(stars: number[]) {
    const totalStars = stars.reduce((acc, curr) => acc + curr, 0);
    const averageStars = totalStars / stars.length;
    return averageStars;
  }
  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden justify-between p-4">
      <h2 className="font-serif text-3xl font-semibold text-yellow-700">{watchInfo?.data.watchName}</h2>
      {!watchInfo?.data.automatic && <p className="text-xl font-serif font-light">Automatic</p>}
      <p className="text-3xl text-yellow-800 font-semibold">$ {watchInfo?.data.price.toLocaleString()}</p>

      <p className="text-xl">
        <span className="font-semibold ">Brand: </span> {watchInfo?.data.brand.brandName}
      </p>
      <p className="text-xl flex items-center gap-4">
        <span className="font-semibold ">Automatic: </span>
        {watchInfo?.data.automatic ? <CircleCheck color="green" /> : <CircleX color="red" />}
      </p>
      {watchInfo?.data.comments.length > 0 && (
        <p className="text-xl flex items-center gap-4">
          <span className="font-semibold ">Stars: </span>
          {getAverageStars(watchInfo?.data.comments.map((comment: any) => comment.rating))}⭐️ (
          {watchInfo?.data.comments.length} feedbacks)
        </p>
      )}
      <Separator />
      <p>
        <span className="font-semibold text-xl">Description:</span>
        <span className={!isMore ? "ellipsis-lines four-lines" : ""}> {watchInfo?.data.watchDescription}</span>
      </p>
      <p
        onClick={() => setIsMore(!isMore)}
        className="text-right text-muted-foreground font-semibold text-blue-700 cursor-pointer underline"
      >
        {isMore ? "Show less" : "Show more"}
      </p>
    </div>
  );
};

export default WatchInfo;
