import { fetchComments } from "@/actions/comment.action";
import { fetchWatch } from "@/actions/watch.action";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
type DetailWatchProps = {
  params: {
    id: string;
  };
};

const DetailWatch = async ({ params }: DetailWatchProps) => {
  const watchInfo = await fetchWatch(params.id);
  const commentInfo = await fetchComments(params.id);
  if (!watchInfo) {
    return <div>Watch not found</div>;
  }
  console.log("🚀 ~ DetailWatch ~ commentInfo:", commentInfo);
  console.log("🚀 ~ DetailWatch ~ watch:", watchInfo);
  // const { data } = useQuery({ queryKey: ["watch", params.id], queryFn: () => fetchWatch(params.id) });
  return (
    <div className="flex-1 px-8">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Watch</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-evenly gap-8">
          <div className="">
            <div className="w-full flex justify-center items-center p-4 border">
              <img src={watchInfo?.data.image} alt="watch img" width={600} height={600} />
            </div>
          </div>
          <div className="w-[40vw] h-auto border">
            <div className="h-full flex flex-col gap-4 overflow-hidden justify-between p-4">
              <h2 className="text-3xl font-semibold text-yellow-700">{watchInfo?.data.watchName}</h2>
              <p>
                <span className="font-semibold text-xl">Price: </span>${watchInfo?.data.price}
              </p>
              <p>
                <span className="font-semibold text-xl">Automatic: </span>
                {watchInfo?.data.automatic ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold text-xl">Brand: </span> {watchInfo?.data.brand.brandName}
              </p>
              <p>
                <span className="font-semibold text-xl">Description:</span> {watchInfo?.data.watchDescription}
              </p>
            </div>
          </div>
        </div>
        <div>comment</div>
      </div>
    </div>
  );
};

export default DetailWatch;
