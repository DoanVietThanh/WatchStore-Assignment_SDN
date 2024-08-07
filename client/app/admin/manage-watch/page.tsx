import Image from "next/image";
import { CircleCheck, CircleX } from "lucide-react";

import { fetchAllWatch } from "@/actions/watch.action";
import DeleteWatchModal from "@/components/modal/delete-watch";
import ManageWatchModal from "@/components/modal/manage-watch";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WatchItemType } from "@/types/watch.types";

const ManageWatch = async () => {
  const watches = await fetchAllWatch({ sortBy: "createdAt", sortOrder: 0 });
  if (!watches) {
    return <div className="text-center flex justify-center items-center">Watches not found</div>;
  }
  return (
    <div className="container flex-1 p-4">
      <div className="container flex justify-between items-center">
        <h1 className="text-3xl font-semibold font-serif mb-4">Manage Watch</h1>
        <ManageWatchModal type="create" />
      </div>
      <div className="container p-8 rounded-md shadow-lg">
        <Table>
          <TableCaption>A list of watches.</TableCaption>
          <TableHeader>
            <TableRow className="font-semibold">
              <TableHead className="w-auto font-bold">No</TableHead>
              <TableHead className="w-[200px] font-bold">Watch Name</TableHead>
              <TableHead className="font-bold">Image</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Automatic</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="min-w-[160px] font-bold">Brand</TableHead>
              <TableHead className="font-bold">Comments</TableHead>
              <TableHead className="font-bold">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watches.data.map((watch: WatchItemType, index: number) => (
              <TableRow key={watch._id} className="">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <p className="text-ellipsis line-clamp-1">{watch.watchName}</p>
                </TableCell>
                <TableCell>
                  <Image src={watch.image} alt={watch.watchName} width={100} height={100} layout="intrinsic" />
                </TableCell>
                <TableCell className="text-md text-yellow-600 font-semibold ">
                  ${watch.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="text-center flex justify-center items-center">
                    {watch.automatic ? <CircleCheck color="green" /> : <CircleX color="red" />}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-ellipsis line-clamp-2">{watch.watchDescription}</p>
                </TableCell>
                <TableCell>{watch.brand.brandName}</TableCell>
                <TableCell className="text-center">{watch.comments?.length}</TableCell>
                <TableCell className="">
                  <div className="flex gap-4 items-center justify-center">
                    <ManageWatchModal watch={watch} type="update" />
                    <DeleteWatchModal watch={watch} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageWatch;
