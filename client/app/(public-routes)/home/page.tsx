import { fetchAllWatch } from "@/actions/watch.action";
import WatchList from "@/components/watch/watch-list";
import BannerPublic from "@/layouts/public-layout/banner";
import BestSeller from "@/layouts/public-layout/best-seller";
import { SearchParams } from "@/types/search-params.types";

type HomePageProps = {
  searchParams: SearchParams;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const watchesListData = await fetchAllWatch({
    ...searchParams,
    pageNumber: 1,
    pageSize: 20,
    sortBy: "brandName",
    sortOrder: 1,
  });

  if (!watchesListData) {
    return <div>No watches found</div>;
  }

  return (
    <div className="flex flex-col flex-1">
      <BannerPublic />
      <div className="flex-1 h-screen w-full gap-8 mt-8">
        <BestSeller />
        <WatchList watchesListData={watchesListData.data} />
      </div>
    </div>
  );
}
