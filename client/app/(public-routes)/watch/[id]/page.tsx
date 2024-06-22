import Image from "next/image";

import { fetchWatch } from "@/actions/watch.action";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import WatchComment from "@/components/watch/watch-comment";
import WatchCommentList from "@/components/watch/watch-comment-list";

import WatchInfo from "./watch-info";
type DetailWatchProps = {
  params: {
    id: string;
  };
};

const DetailWatch = async ({ params }: DetailWatchProps) => {
  const watchInfo = await fetchWatch(params.id);
  if (!watchInfo) {
    return <div className="text-center text-3xl font-semibold mt-8 text-red-700">Watch not found</div>;
  }

  return (
    <div className="flex-1 px-8">
      <div className="mb-4 font-semibold">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/watch">Watch</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{watchInfo?.data.watchName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-evenly gap-8">
          <div className="">
            <div className="w-auto h-full flex justify-center items-center p-4 shadow-lg rounded-lg overflow-hidden">
              <Image
                alt="watch img"
                width={200}
                height={200}
                src={watchInfo?.data.image}
                layout="intrinsic"
                className="hover:scale-110 transition duration-500 ease-in-out"
              />
            </div>
          </div>
          <div className="w-[40vw] h-auto text-justify">
            <WatchInfo watchInfo={watchInfo} />
          </div>
        </div>
        <WatchComment watchId={watchInfo?.data._id} />
        <WatchCommentList watchId={watchInfo?.data._id} />
      </div>
    </div>
  );
};

export default DetailWatch;
