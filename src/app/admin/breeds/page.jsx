'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useEffect, useState } from "react"

import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi

import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios"
import Swal from "sweetalert2"


export default function Home() {
    const { user, logout } = useAuth({ middleware: 'admin' })
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState({
            image: false,

        })
    const [rowSelection, setRowSelection] = useState({})
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
    const [breedsData, setBreedsData] = useState([]);
    const columns = [
        {
            accessorKey: "no",
            header: "No",
            cell: ({ row }) => row.index + 1, // Display row index, starting from 1
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Installation Date
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
        },

        {
            accessorKey: "country",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Installation Date
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue("country")}</div>,
        },
        {
            accessorKey: "type",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Type
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue("type")}</div>,
        },
        {
            accessorKey: "characteristics",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Characteristics
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="">{row.getValue("characteristics")}</div>,
        },

        {
            accessorKey: 'id',
            header: 'Actions',
            cell: info => (
                <div>
                    <button className="text-xs text-white btn btn-warning" onClick={() => editBreeds(Number(info.getValue()))}>Edit</button>
                    <button className="ml-2 text-xs btn btn-danger" onClick={() => deleteBreeds(Number(info.getValue()))}>Delete</button>
                </div>
            ),
        }

    ];
    const [breeds, setBreeds] = useState({
        id: 0,
        name: '',
        country: '',
        type: '',
        characteristics: ''
    });


    const table = useReactTable({
        data: breedsData,
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


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBreeds({ ...breeds, [name]: value });
    }

    const [open, setOpen] = useState(false)

    const getBreedsData = async () => {
        var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/breeds`, {
            headers: {
                'content-type': 'text/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(function (response) {
                if (response.data.data != undefined) {
                    setBreedsData(response.data.data);
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

    const createBreeds = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Loading...',
            text: 'Mohon tunggu sebentar...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const bodyFormData = new FormData();
        bodyFormData.append('name', breeds.name);
        bodyFormData.append('country', breeds.country);
        bodyFormData.append('type', breeds.type);
        bodyFormData.append('characteristics', breeds.characteristics);

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/breeds`,
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );

            getBreedsData();

            // Reset form fields
            setBreeds({
                id: 0,
                name: '',
                country: '',
                type: '',
                characteristics: ''
            });

            setOpen(false);

            Swal.close();
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
                    title: 'Error terjadi',
                    text: 'Mohon coba lagi nanti.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    const editBreeds = async (id) => {
        let bd = breedsData.find((f) => f.id === id);
        console.log(bd)
        if (bd) {
            setBreeds({
                id: bd.id,
                name: bd.name,
                country: bd.country,
                type: bd.type,
                characteristics: bd.characteristics
            });
            setOpen(true);
        }
    }


    const createData = async () => {
        setBreeds({
            id: 0,
            name: '',
            country: '',
            type: '',
            characteristics: ''
        });
        setOpen(true);
    }

    const updateBreeds = async (e) => {
        e.preventDefault();
    
        Swal.fire({
            title: 'Loading...',
            text: 'Mohon tunggu sebentar...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/breeds/${breeds.id}`,
                {
                    name: breeds.name,
                    country: breeds.country,
                    type: breeds.type,
                    characteristics: breeds.characteristics
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
    
            // Refresh breed data and close the dialog
            await getBreedsData();
            setBreeds({
                id: 0,
                name: '',
                country: '',
                type: '',
                characteristics: ''
            });
            setOpen(false);
            Swal.close();
    
        } catch (error) {
            Swal.close();
    
            // Handle specific 401 error for unauthorized access
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                logout();
            } else {
                // Handle general errors
                Swal.fire({
                    icon: 'error',
                    title: 'Error occurred',
                    text: 'Please try again later.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    const deleteBreeds = async (id) => {
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
                        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/breeds/${id}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            }
                        }
                    );
                    await getBreedsData();
                    Swal.fire(
                        'Deleted!',
                        'Breeds has been deleted.',
                        'success'
                    );
                } catch (error) {

                }
            }
        });
    };

    useEffect(() => {
        getBreedsData();
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
                        <h3>Breeds</h3>
                        <div>
                            <Button variant="outline" onClick={createData}>Create Breeds</Button>


                            <Dialog open={open} onOpenChange={setOpen}>


                                {/* Add a ref to the dialog */}
                                <DialogContent >
                                    <DialogHeader>
                                        <DialogTitle className="mb-4">{breeds.id != 0 ? 'Update' : 'Create'} breeds</DialogTitle>
                                        <DialogDescription>
                                            <form method="dialog" onSubmit={breeds.id != 0 ? updateBreeds : createBreeds}>
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    value={breeds.name}
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    value={breeds.country}
                                                    type="text"
                                                    name="country"
                                                    placeholder="Country"
                                                    onChange={handleInputChange}
                                                />
                                                <select
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    name="type"
                                                    value={breeds.type}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="" disabled>Select Type</option>
                                                    <option value="potong">Potong</option>
                                                    <option value="perah">Perah</option>
                                                    <option value="ganda">ganda</option>
                                                </select>
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    value={breeds.characteristics}
                                                    type="text"
                                                    name="characteristics"
                                                    placeholder="Characteristics"
                                                    onChange={handleInputChange}
                                                />
                                                <div className="flex justify-end gap-3 mt-5">
                                                    <button type="submit" className="btn-modal">{breeds.id != 0 ? 'Update' : 'Create'}</button>
                                                </div>
                                            </form>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <br />
                    <div className="flex-auto px-0 pt-0 pb-2">
                        <div className="">
                            <div className="flex items-end w-full py-4" style={{ justifyContent: 'end' }}>
                                <Input
                                    placeholder="Filter Breeds..."
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




