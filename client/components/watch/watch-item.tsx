import Image from "next/image";
import Link from "next/link";

import { WatchItemType } from "@/types/watch.types";

type WatchItemProps = {
  watch: WatchItemType;
};

const WatchItem = ({ watch }: WatchItemProps) => {
  return (
    <Link href={`/watch/${watch._id}`}>
      <div className="h-full flex flex-col items-center justify-between border gap-2 p-4 rounded-md shadow-md hover:scale-105 transition duration-500 ease-in-out">
        <div className="w-full h-full overflow-hidden transition-all duration-200 flex justify-center">
          <Image width={200} height={200} src={watch.image} alt={watch.watchName} layout="intrinsic" className="" />
        </div>
        <div className="text-center text-xl font-semibold hover:text-yellow-600">
          {watch.watchName}
          <p className="text-xl text-yellow-600">{watch.brand.brandName}</p>
        </div>
      </div>
    </Link>
  );
};

export default WatchItem;
