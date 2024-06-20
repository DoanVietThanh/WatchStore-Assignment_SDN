import { fetchAccounts } from "@/actions/member.action";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MemberType } from "@/types/member.types";

const ManageUser = async () => {
  const accounts = await fetchAccounts();

  if (!accounts.success) {
    return <div>No accounts found</div>;
  }

  return (
    <div className="container flex-1 p-4 min-h-full">
      <div className="container flex justify-between items-center">
        <h1 className="text-3xl font-semibold font-serif mb-4">Manage Users</h1>
      </div>
      <div className="container p-8 rounded-md shadow-lg">
        <Table>
          <TableCaption>A list accounts of Members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">No</TableHead>
              <TableHead className="font-bold">Member Name</TableHead>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold text-center w-auto">Year of birth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts?.data?.map((account: MemberType, index: number) => (
              <TableRow key={account._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{account.memberName}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell className="text-center">{account.yob}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageUser;
