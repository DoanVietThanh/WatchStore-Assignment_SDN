import { fetchBrands } from "@/actions/brand.action";
import { fetchAllWatch } from "@/actions/watch.action";
import SearchBrand from "@/components/search-brand";
import Searchbar from "@/components/searchbar";
import WatchItem from "@/components/watch/watch-item";

type WatchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const WatchPage = async ({ searchParams }: WatchPageProps) => {
  const brands = await fetchBrands();
  const watches = await fetchAllWatch({ ...searchParams });

  return (
    <div className="container">
      <div className="flex">
        <Searchbar route="watch" placeholder="Search watch name" />
        <SearchBrand route="watch" brands={brands.data} />
      </div>
      {watches.data.length === 0 && (
        <div className="text-center font-semibold text-red-500 w-full">No watches found</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {watches.data.map((watch: any) => (
          <WatchItem key={watch._id} watch={watch} />
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
