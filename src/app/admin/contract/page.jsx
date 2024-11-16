'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Contract() {

    const { user, logout } = useAuth({ middleware: 'admin' });
    const [loading, setLoading] = useState(true);
    //security by role
    const alert = () => {
        Swal.fire({
            title: "Anda bukan admin!",
            text: "Anda tidak memiliki akses ke halaman ini!",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#6A9944",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/peternak'; // Redirect to /peternak
            }
        });
    }
    if (user === 'cattleman') {
        alert()
    }

    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] =
        useState({
            image: false,
        })

    const [rowSelection, setRowSelection] = useState({})

    const [contractData, setcontractData] = useState([]);

    const columns = [
        {
            accessorKey: "no",
            header: "No",
            cell: ({ row }) => row.index + 1, // Display row index, starting from 1
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Contract Code
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue("title")}</div>,
        },
        {
            accessorKey: "tanggal",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Contract Date
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue("tanggal")}</div>,

        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Status Contract
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) =>
            <div className="flex px-2 py-1">
                <div className="flex flex-col justify-center">
                    <h6 className="mb-0 text-sm leading-normal dark:text-white">
                        {row.getValue("status") === 'completed' && <span className="bg-green-500 badge">Completed</span>}
                        {row.getValue("status") === 'pending' && <span className="bg-yellow-500 badge">Pending</span>}
                        {row.getValue("status") === 'active' && <span className="bg-blue-500 badge">Active</span>}
                        {row.getValue("status") === 'returned' && <span className="bg-red-500 badge">Returned</span>}
                    </h6>
                    <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
                        {/* Additional description if needed */}
                    </p>
                </div>
            </div>

        },
        {
            accessorKey: 'id',
            header: 'Actions',
            cell: info => (
                <div>
                    <button className="text-xs text-white btn btn-warning" onClick={() => editFarm(Number(info.getValue()))}>Edit</button>
                    <button className="ml-2 text-xs btn btn-danger" onClick={() => deleteFarm(Number(info.getValue()))}>Delete</button>
                </div>
            ),
        }
    ];

    const [contract, setContract] = useState({
        id: 0,
        contract_code: "",
        request_id: "",
        cattle_id: "",
        farm_id: "",
        start_date: "",
        end_date: "",
        rate: "",
        intial_weight: "",
        intial_height: "",
        final_weight: "",
        status: "",
        total_cost: "",
    });


    const table = useReactTable({
        data: contractData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const getContractData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/contract`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            if (response.data.data !== undefined) {
                setcontractData(response.data.data);
                console.log('Contract :', response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                logout();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'error terjadi',
                    text: 'mohon coba lagi nanti.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContractData();
    }, []);

    return (
        <>
            <header className="mb-3">
                <a href="#" className="burger-btn d-block d-xl-none">
                    <i className="bi bi-justify fs-3" />
                </a>
            </header>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Contract</h3>
                    </div>
                    <br />
                    <div className="flex-auto px-0 pt-0 pb-2">
                        <div className="">
                            <div className="flex items-end w-full py-4" style={{ justifyContent: 'end' }}>
                                <Input
                                    placeholder="Filter Farm..."
                                    value={(table.getColumn("request_id")?.getFilterValue()) ?? ""}
                                    onChange={(event) =>
                                        table.getColumn("request_id")?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />
                            </div>
                            <div className="border rounded-md">
                                <Table className="border border-collapse border-gray-300">
                                    <TableHeader>
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map((header) => (
                                                    <TableHead key={header.id} className="border border-gray-300">
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {table.getRowModel().rows?.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    data-state={row.getIsSelected() && "selected"}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id} className="border border-gray-300">
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={columns.length}
                                                    className="h-24 text-center border border-gray-300"
                                                >
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                            </div>
                            <div className="flex items-center justify-end py-4 space-x-2">
                                <div className="flex-1 text-sm text-muted-foreground">
                                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                    {table.getFilteredRowModel().rows.length} row(s) selected.
                                </div>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>


    )
}




