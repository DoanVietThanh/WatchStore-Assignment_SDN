import Image from "next/image";
import Link from "next/link";

import { WatchItemType } from "@/types/watch.types";

type WatchItemProps = {
  watch: WatchItemType;
};

const WatchItem = ({ watch }: WatchItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center border gap-2 p-4 rounded-md">
      <div className="w-full overflow-hidden transition-all duration-200">
        <Image
          src={watch.image}
          alt={watch.watchName}
          width={400}
          height={400}
          className="transform transition duration-500 ease-in-out hover:scale-105"
        />
      </div>
      <Link href={`/watch/${watch._id}`} className="text-xl font-semibold hover:text-yellow-600">
        {watch.watchName}
      </Link>
      <p className="text-xl text-yellow-600">${watch.price}</p>
    </div>
  );
};

export default WatchItem;
