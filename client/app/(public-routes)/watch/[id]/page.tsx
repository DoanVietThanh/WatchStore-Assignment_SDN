import Image from "next/image";
import { CircleCheck, CircleX } from "lucide-react";

import { fetchWatch } from "@/actions/watch.action";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import WatchComment from "@/components/watch/watch-comment";
import WatchCommentList from "@/components/watch/watch-comment-list";
type DetailWatchProps = {
  params: {
    id: string;
  };
};

const DetailWatch = async ({ params }: DetailWatchProps) => {
  const watchInfo = await fetchWatch(params.id);
  if (!watchInfo) {
    return <div>Watch not found</div>;
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
                layout="intrinsic" // You can also use 'responsive' or 'fill' depending on your use case
                className="hover:scale-110 transition duration-500 ease-in-out"
              />
            </div>
          </div>
          <div className="w-[40vw] h-auto text-justify">
            <div className="h-full flex flex-col gap-4 overflow-hidden justify-between p-4">
              <h2 className="font-serif text-3xl font-semibold text-yellow-700">{watchInfo?.data.watchName}</h2>
              {!watchInfo?.data.automatic && <p className="text-xl font-serif font-light">Automatic</p>}
              <p className="text-3xl text-yellow-800 font-semibold">$ {watchInfo?.data.price.toLocaleString()}</p>

              <p className="text-xl">
                <span className="font-semibold ">Brand: </span> {watchInfo?.data.brand.brandName}
              </p>
              <p className="text-xl flex items-center gap-4">
                <span className="font-semibold ">Automatic: </span>{" "}
                {watchInfo?.data.automatic ? <CircleCheck color="green" /> : <CircleX color="red" />}
              </p>
              <Separator />
              <p>
                <span className="font-semibold text-xl">Description:</span>
                <span className="ellipsis-lines four-lines"> {watchInfo?.data.watchDescription}</span>
              </p>
            </div>
          </div>
        </div>
        <WatchComment watchId={watchInfo?.data._id} />
        <WatchCommentList watchId={watchInfo?.data._id} />
      </div>
    </div>
  );
};

export default DetailWatch;
