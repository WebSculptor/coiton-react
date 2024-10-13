import * as React from "react";
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrganization } from "@/hooks/test/useOrganization";
import { truncateAddr } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Organizations() {
  const { fetchOrganizations } = useOrganization();

  const organizations = fetchOrganizations();

  // Column definitions for the table
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-sans_medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "validator",
      header: "Validator",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("validator")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => row.getValue("region") || "N/A",
    },
    {
      accessorKey: "domain",
      header: () => <div className="text-right">Domain</div>,
      cell: ({ row }) => {
        const domain: string = row.getValue("domain");
        return (
          <div className="flex items-center justify-end gap-2">
            {truncateAddr(domain, 10)}
          </div>
        );
      },
    },
  ];

  // State management for pagination
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: organizations,
    columns,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
        <div className="text-sm text-muted-foreground">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import * as React from "react";
// import {
//   ColumnDef,
//   PaginationState,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useContractStore } from "@/store/contract.store";
// import { ChevronsLeft, ChevronsRight, ExternalLink } from "lucide-react";
// import { Link } from "react-router-dom";
// import { truncateAddr } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// export default function ValidatorTransactions() {
//   const validators = useContractStore((state) => state.validators);
//   const transactionReceipts = useContractStore(
//     (state) => state.transactionReceipts,
//   );

//   console.log(transactionReceipts);

//   // Refine data structure to combine validators and receipts
//   const refinedData = React.useMemo(
//     () =>
//       validators?.map((validator, index) => {
//         const receipt = transactionReceipts?.[index];
//         return {
//           validator,
//           block_number: receipt?.block_number,
//           transaction_hash: receipt?.transaction_hash,
//           execution_status: receipt?.execution_status,
//           actual_fee: receipt?.actual_fee,
//         };
//       }) || [],
//     [validators, transactionReceipts],
//   );

// // Column definitions for the table
// const columns: ColumnDef<any>[] = [
//   {
//     accessorKey: "validator",
//     header: "Validator",
//     cell: ({ row }) => (
//       <div className="font-sans_medium">{row.getValue("validator")}</div>
//     ),
//   },
//   {
//     accessorKey: "execution_status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("execution_status")}</div>
//     ),
//   },
//   {
//     accessorKey: "block_number",
//     header: "Block",
//     cell: ({ row }) => row.getValue("block_number") || "N/A",
//   },
//   {
//     accessorKey: "transaction_hash",
//     header: "Transaction Hash",
//     cell: ({ row }) => {
//       const hash: string = row.getValue("transaction_hash");
//       return (
//         <Link
//           target="_blank"
//           to={`https://sepolia.voyager.online/tx/${hash}`}
//           className="flex items-center gap-2"
//         >
//           {truncateAddr(hash, 10)} <ExternalLink className="size-4" />
//         </Link>
//       );
//     },
//   },
//   {
//     accessorKey: "actual_fee",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const fee: any = row.getValue("actual_fee");
//       return (
//         <div className="text-right">
//           {fee?.amount
//             ? `${parseInt(fee.amount, 16).toLocaleString()} ${fee.unit}`
//             : "N/A"}
//         </div>
//       );
//     },
//   },
// ];

// // State management for pagination
// const [pagination, setPagination] = React.useState<PaginationState>({
//   pageIndex: 0,
//   pageSize: 5,
// });

// const table = useReactTable({
//   data: refinedData,
//   columns,
//   onPaginationChange: setPagination,
//   getCoreRowModel: getCoreRowModel(),
//   getPaginationRowModel: getPaginationRowModel(),
//   state: {
//     pagination,
//   },
// });

//   return (
//     <div className="w-full">
// <Table>
//   <TableHeader>
//     {table.getHeaderGroups().map((headerGroup) => (
//       <TableRow key={headerGroup.id}>
//         {headerGroup.headers.map((header) => (
//           <TableHead key={header.id}>
//             {flexRender(
//               header.column.columnDef.header,
//               header.getContext(),
//             )}
//           </TableHead>
//         ))}
//       </TableRow>
//     ))}
//   </TableHeader>
//   <TableBody>
//     {table.getRowModel().rows.length ? (
//       table.getRowModel().rows.map((row) => (
//         <TableRow key={row.id}>
//           {row.getVisibleCells().map((cell) => (
//             <TableCell key={cell.id}>
//               {flexRender(cell.column.columnDef.cell, cell.getContext())}
//             </TableCell>
//           ))}
//         </TableRow>
//       ))
//     ) : (
//       <TableRow>
//         <TableCell colSpan={columns.length} className="h-24 text-center">
//           No results.
//         </TableCell>
//       </TableRow>
//     )}
//   </TableBody>
// </Table>

// <div className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
//   <div className="text-sm text-muted-foreground">
//     Page {pagination.pageIndex + 1} of {table.getPageCount()}
//   </div>
//   <div className="flex items-center gap-2">
//     <Button
//       variant="outline"
//       onClick={() => table.setPageIndex(0)}
//       disabled={!table.getCanPreviousPage()}
//     >
//       <ChevronsLeft className="size-5" />
//     </Button>
//     <Button
//       variant="outline"
//       onClick={() => table.previousPage()}
//       disabled={!table.getCanPreviousPage()}
//     >
//       Prev
//     </Button>
//     <Button
//       variant="outline"
//       onClick={() => table.nextPage()}
//       disabled={!table.getCanNextPage()}
//     >
//       Next
//     </Button>
//     <Button
//       variant="outline"
//       onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//       disabled={!table.getCanNextPage()}
//     >
//       <ChevronsRight className="size-5" />
//     </Button>
//   </div>
// </div>
//     </div>
//   );
// }
