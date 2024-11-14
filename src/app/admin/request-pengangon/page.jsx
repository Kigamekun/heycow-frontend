'use client'

import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { Button } from "@/components/ui/button"
import * as React from "react"

import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


import axios from "axios"
import Swal from "sweetalert2"


export default function Home() {
    const { user, logout } = useAuth({ middleware: 'admin' })
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState({
            image: false,

        })
    const [rowSelection, setRowSelection] = React.useState({})

    const [selectedFile, setSelectedFile] = React.useState();

    //  security by role 
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

    const [RequestPengangonData, setRequestPengangonData] = React.useState([]);
    const columns = [
        {
            accessorKey: "no",
            header: "No",
            cell: ({ row }) => row.index + 1, // Display row index, starting from 1
        },
        {
            accessorKey: "full_avatar_url",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Avatars
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => (

                <div className="flex px-2 py-1">
                    <div className="flex flex-col justify-center">
                        <img src={row.getValue("full_avatar_url") ?? 'https://th.bing.com/th/id/R.aece1145f2d3480e38bc9443a4998c04?rik=ey6pjfxR5wHPvQ&riu=http%3a%2f%2finstitutcommotions.com%2fwp-content%2fuploads%2f2018%2f05%2fblank-profile-picture-973460_960_720-1.png&ehk=cWQNlcoT06KT7deWxMnwK034GVCHVSXupbX4E5i1Psw%3d&risl=&pid=ImgRaw&r=0'} alt="avatar" className="w-10 h-10">
                        </img>
                    </div>
                </div>
            ),

        },

        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nama
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "address",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Address
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("address")}</div>,
        },
        {
            accessorKey: "phone_number",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nomor Telpon
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("phone_number")}</div>,
        },

        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
        },

        {
            accessorKey: "nik",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        NIK
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("nik")}</div>,
        },

        {
            accessorKey: "upah",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Upah
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">Rp {row.getValue("upah")}</div>,
        },
        {
            accessorKey: "ktp",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Upah
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) =>
                <div className="flex px-2 py-1">
                    <div className="flex flex-col justify-center">
                        <img src={row.getValue("ktp") ?? 'https://th.bing.com/th/id/R.aece1145f2d3480e38bc9443a4998c04?rik=ey6pjfxR5wHPvQ&riu=http%3a%2f%2finstitutcommotions.com%2fwp-content%2fuploads%2f2018%2f05%2fblank-profile-picture-973460_960_720-1.png&ehk=cWQNlcoT06KT7deWxMnwK034GVCHVSXupbX4E5i1Psw%3d&risl=&pid=ImgRaw&r=0'} alt="ktp">
                        </img>
                    </div>
                </div>
        },
        {
            accessorKey: "selfie_ktp",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Selfie KTP
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) =>
                <div className="flex px-2 py-1">
                    <div className="flex flex-col justify-center">
                        <img src={row.getValue("selfie_ktp") ?? 'https://th.bing.com/th/id/R.aece1145f2d3480e38bc9443a4998c04?rik=ey6pjfxR5wHPvQ&riu=http%3a%2f%2finstitutcommotions.com%2fwp-content%2fuploads%2f2018%2f05%2fblank-profile-picture-973460_960_720-1.png&ehk=cWQNlcoT06KT7deWxMnwK034GVCHVSXupbX4E5i1Psw%3d&risl=&pid=ImgRaw&r=0'} alt="ktp">
                        </img>
                    </div>
                </div>
        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Status Approval
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
        },

        {
            accessorKey: 'id',
            header: 'Actions',
            cell: info => (
                <div>
                    <button
                        className="text-xs text-white btn btn-success"
                        onClick={() => handleApprove(info.getValue())}
                    >
                        Approve
                    </button>
                    <button
                        className="ml-2 text-xs btn btn-danger"
                        onClick={() => handleReject(info.getValue())}
                    >
                        Reject
                    </button>
                </div>
            ),
        }
    ];

    const table = useReactTable({
        data: RequestPengangonData,
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



    const getRequestPengangonData = async () => {
        var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`, {
            headers: {
                'content-type': 'text/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(function (response) {
                if (response.data.data != undefined) {
                    setRequestPengangonData(response.data.data);
                    console.log(response.data.data);
                }
            }).catch(function (error) {
                if (error.response && error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })

                    logout()

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'error terjadi',
                        text: 'mohon coba lagi nanti.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    const deleteRequestPengangon = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Loading...',
                    text: 'Mohon tunggu sebentar...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                try {
                    await axios.delete(
                        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${id}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            }
                        }
                    );
                    await getUserData();
                    Swal.fire(
                        'Deleted!',
                        'Your User has been deleted.',
                        'success'
                    );
                } catch (error) {

                }
            }
        });
    };

    React.useEffect(() => {
        getRequestPengangonData();
    }, []);

    // Ini untuk Modal dialog ketika membuat data dengan form
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
                        <h3>Request Menjadi Pengangon</h3>
                    </div>
                    <br />
                    <div className="flex-auto px-0 pt-0 pb-2">
                        <div className="">
                            <div className="flex items-end w-full py-4" style={{ justifyContent: 'end' }}>
                                <Input
                                    placeholder="Filter User..."
                                    value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                                    onChange={(event) =>
                                        table.getColumn("name")?.setFilterValue(event.target.value)
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




