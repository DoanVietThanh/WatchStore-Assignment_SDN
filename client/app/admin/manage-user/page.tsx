"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { fetchAccounts } from "@/actions/member.action";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getToken } from "@/lib/manage-state-client";
import { MemberType } from "@/types/member.types";

const ManageUser = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    let token = getToken();
    async function getAccounts() {
      await fetchAccounts(token)
        .then((data) => {
          setAccounts(data.data);
        })
        .catch((err) => toast.error(err.message || "An error occurred while fetching accounts"));
    }
    getAccounts();
  }, []);

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
            {accounts?.map((account: MemberType, index: number) => (
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
