import SidebarPublic from "@/layouts/public-layout/sidebar-public";

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: HomeProps) {
  console.log("🚀 ~ Home ~ searchParams:", searchParams);
  return (
    <div className="flex-1 flex gap-1 h-screen w-screen">
      <SidebarPublic />
      <div className="flex-1 border">Watches list</div>
    </div>
  );
}
