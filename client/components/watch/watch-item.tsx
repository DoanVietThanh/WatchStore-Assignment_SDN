import Image from "next/image";
import Link from "next/link";

import { WatchItemType } from "@/types/watch.types";

type WatchItemProps = {
  watch: WatchItemType;
};

const WatchItem = ({ watch }: WatchItemProps) => {
  return (
    <div className="flex flex-col items-center justify-between border gap-2 p-4 rounded-md">
      <div className="w-full h-full overflow-hidden transition-all duration-200 flex justify-center">
        <Image
          width={200}
          height={200}
          src={watch.image}
          alt={watch.watchName}
          layout="intrinsic" // You can also use 'responsive' or 'fill' depending on your use case
          className="hover:scale-110 transition duration-500 ease-in-out"
        />
      </div>
      <div className="text-center">
        <Link href={`/watch/${watch._id}`} className="text-xl font-semibold hover:text-yellow-600">
          {watch.watchName}
        </Link>
        <p className="text-xl text-yellow-600">{watch.brand.brandName}</p>
      </div>
    </div>
  );
};

export default WatchItem;
