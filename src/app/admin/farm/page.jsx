'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

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

  const [farmData, setFarmData] = useState([]);

  const [userData, setUserData] = useState([]);

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
            Name
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
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
      cell: ({ row }) => <div>{row.getValue("address")}</div>,

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

  const [farm, setFarm] = useState({
    id: 0,
    name: "",
    address: "",
    user_id: "",
  });


  const table = useReactTable({
    data: farmData,
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
    setFarm({ ...farm, [name]: value });
  }

  const handleSelectChange = (event) => {
    const name = event.target.name;
    const { value } = event.target.selectedOptions[0];
    console.log(value);
    setFarm({ ...farm, [name]: value });
  }

  const [open, setOpen] = useState(false)



  const getUserData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setUserData(response.data.data);
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


  const getFarmData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.data.data !== undefined) {
        setFarmData(response.data.data.data);
        console.log('Farm dsada:', response.data.data.data);
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

  const createFarm = async (e) => {
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
    bodyFormData.append('name', farm.name);
    bodyFormData.append('address', farm.address);
    bodyFormData.append('user_id', farm.user_id)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      // Refresh farm data
      getFarmData();
      getUserData();
      // Reset form fields
      setFarm({
        id: 0,
        name: "",
        address: "",
        user_id: ""
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

  const editFarm = async (id) => {
    let fr = farmData.find((f) => f.id === id);
    console.log(fr)
    if (fr) {
      setFarm({
        id: fr.id,
        name: fr.name,
        address: fr.address,
        user_id: fr.user_id
      });
      setOpen(true);
    }
  }


  const createData = async () => {
    setFarm({
      id: 0,
      name: "",
      address: "",
      user_id: ""
    });
    setOpen(true);
  }

  const updateFarm = async (e) => {

    e.preventDefault();
    Swal.fire({
      title: 'Loading...',

      text: 'Mohon tunggu sebentar...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    var res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms/${farm.id}`,
      {
        name: farm.name,
        address: farm.address,
        user_id: farm.user_id
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

        },
      }
    )
      .then(function (response) {
        getFarmData();
        setFarm({
          id: 0,
          name: "",
          address: "",
          user_id: "",

        })
        Swal.close()

        setOpen(false);

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
            title: 'User Hanya Boleh Memiliki Farm Satu',
            text: 'mohon coba lagi nanti.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  const deleteFarm = async (id) => {
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
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms/${id}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            }
          );
          await getFarmData();
          Swal.fire(
            'Deleted!',
            'Your farm has been deleted.',
            'success'
          );
        } catch (error) {

        }
      }
    });
  };

  useEffect(() => {
    getFarmData();
    getUserData();
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
            <h3>Farm</h3>
            <div>
              <Button variant="outline" onClick={createData}>Create Farm</Button>
              <Dialog open={open} onOpenChange={setOpen}>
                {/* Add a ref to the dialog */}
                <DialogContent >
                  <DialogHeader>
                    <DialogTitle className="mb-4">{farm.id != 0 ? 'Update' : 'Create'} Farm</DialogTitle>
                    <DialogDescription>
                      <form method="dialog" onSubmit={farm.id != 0 ? updateFarm : createFarm}>
                        <label className="mb-2 text-black float-start"> Farm Name </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={farm.name}
                          type="text"
                          name="name"
                          placeholder="Name"
                          onChange={handleInputChange}
                        />
                        <label className="mb-2 text-black float-start"> Address </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={farm.address}
                          type="text"
                          name="address"
                          placeholder="Address"
                          onChange={handleInputChange}
                        />
                        <label className="mb-2 text-black float-start"> Choose Farm Owner </label>
                        <select
                          name="user_id"
                          // s
                          onChange={handleSelectChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                        >
                          <option value="">Pilih Pemilik Farm</option>
                          {
                            userData && userData.map((b) => {

                              if (farm.user_id == b.id) {
                                return <option key={b.id} value={b.id} selected>{b.name}</option>;


                              } else {
                                return <option key={b.id} value={b.id} >{b.name}</option>;

                              }
                            })
                          }

                        </select>
                        <div className="flex justify-end gap-3 mb-3">
                          <button type="submit" className="btn-modal">{farm.id != 0 ? 'Update' : 'Create'}</button>
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
                  placeholder="Filter Farm..."
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




