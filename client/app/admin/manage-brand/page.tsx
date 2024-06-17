import { fetchBrands } from "@/actions/brand.action";
import DeleteBrandModal from "@/components/modal/delete-brand";
import ManageBrandModal from "@/components/modal/manage-brand";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BrandType } from "@/types/brand.types";
type ManageBrandProps = {
  params: {};
};

const ManageBrand = async ({ params }: ManageBrandProps) => {
  const brands = await fetchBrands();
  console.log("🚀 ~ ManageBrand ~ brands:", brands);

  if (!brands) {
    return <div>No brands found</div>;
  }

  return (
    <div className="container flex-1 p-4">
      <div className="container flex justify-between items-center">
        <h1 className="text-3xl font-semibold font-serif mb-4">Manage Brand</h1>
        <ManageBrandModal type="create" />
      </div>
      <div className="container p-8 rounded-md shadow-lg">
        <Table>
          <TableCaption>A list of watch brands.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">No</TableHead>
              <TableHead className="font-bold">Brand Name</TableHead>
              <TableHead className="text-right font-bold">Control</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.data.map((brand: BrandType, index: number) => (
              <TableRow key={brand._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{brand.brandName}</TableCell>
                <TableCell className="text-right flex items-center gap-4 justify-end">
                  <ManageBrandModal brand={brand} type="update" />
                  <DeleteBrandModal brand={brand} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageBrand;
