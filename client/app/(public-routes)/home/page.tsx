import { fetchAllWatch } from "@/actions/watch.action";
import WatchList from "@/components/watch/watch-list";
import BannerPublic from "@/layouts/public-layout/banner";
import SidebarPublic from "@/layouts/public-layout/sidebar-public";
import { SearchParams } from "@/types/search-params.types";

type HomePageProps = {
  searchParams: SearchParams;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const watchesListData = await fetchAllWatch({
    ...searchParams,
    pageNumber: 1,
    pageSize: 8,
    sortBy: "brandName",
    sortOrder: 1,
  });

  return (
    <div className="flex flex-col flex-1">
      <BannerPublic />
      <div className="flex-1 flex h-screen w-full gap-8 mt-8">
        <SidebarPublic />
        <div className="flex-1 ">
          <WatchList watchesListData={watchesListData.data} />
        </div>
      </div>
    </div>
  );
}
