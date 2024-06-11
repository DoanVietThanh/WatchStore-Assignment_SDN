import { fetchAllWatch } from "@/actions/watch.action";
import BannerPublic from "@/layouts/public-layout/banner";
import SidebarPublic from "@/layouts/public-layout/sidebar-public";

type HomePageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  console.log("🚀 ~ Home ~ searchParams:", searchParams);

  const watchesListData = await fetchAllWatch();
  console.log("🚀 ~ Home ~ watchesList:", watchesListData);

  return (
    <div className="flex flex-col flex-1">
      <BannerPublic />
      <div className="flex-1 flex gap-1 h-screen w-full">
        <SidebarPublic />
        <div className="flex-1 border">Watches list</div>
      </div>
    </div>
  );
}
