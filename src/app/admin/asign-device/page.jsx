'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

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


export default function AsignDevice() {
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
  const [deviceData, setDeviceData] = useState([]);
  const columns = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => row.index + 1, // Display row index, starting from 1
    },
    {
      accessorKey: "serial_number",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Serial Number
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (

        <div className="flex px-2 py-1">
          <div>

          </div>
          <div className="flex flex-col justify-center">
            <h6 className="mb-0 text-sm leading-normal dark:text-white">
              {row.getValue("serial_number")}
            </h6>
            <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
            </p>
          </div>
        </div>
      ),

    },

    {
      accessorKey: "installation_date",
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
      cell: ({ row }) => <div className="">{row.getValue("installation_date")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (

        <div className="flex px-2 py-1">
          <div>

          </div>
          <div className="flex flex-col justify-center">
            <h6 className="mb-0 text-sm leading-normal dark:text-white">
              {row.getValue("status") == 'active' ? <span class="badge bg-success">Active</span> : <span class="badge bg-danger">Inactive</span>}
            </h6>
            <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
            </p>
          </div>
        </div>
      ),

    },
    {
      accessorKey: "user_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User Assigned
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("user_name")}</div>,
    },

    {
      accessorKey: 'id',
      header: 'Actions',
      cell: info => (
        <div className="flex space-x-2">
          <button className="text-xs text-white btn btn-success" onClick={() => editDevice(Number(info.getValue()))}>Assign</button>
          <button className="text-xs text-white btn btn-danger" onClick={() => deleteDevice(Number(info.getValue()))}>Unassign</button>
        </div>
      ),
    }

  ];


  const handleSelectChange = (event) => {
    const name = event.target.name;
    const { value } = event.target.selectedOptions[0];
    console.log(value);
    setDevice({ ...device, [name]: value });
  }

  const [device, setDevice] = useState({
    id: 0,
    serial_number: '',
    installation_date: '',
    status: '',
    user_id: '',
  });
  const [UserData, setUserData] = useState([]);


  const table = useReactTable({
    data: deviceData,
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
    setDevice({ ...device, [name]: value });
  }

  const [open, setOpen] = useState(false)

  const getDeviceData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setDeviceData(response.data.data);
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


  const createDevice = async (e) => {
    Swal.fire({
      title: 'Loading...',
      text: 'Mohon tunggu sebentar...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const bodyFormData = new FormData();
    bodyFormData.append('serial_number', device.serial_number);
    bodyFormData.append('installation_date', device.installation_date);
    bodyFormData.append('status', device.status);
    bodyFormData.append('user_id', device.user_id);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      // Refresh device data
      getDeviceData();

      // Reset form fields
      setDevice({
        id: 0,
        serial_number: '',
        installation_date: '',
        status: '',
        user_id: '',
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

  const editDevice = async (id) => {
    let fr = deviceData.find((f) => f.id === id);
    console.log(fr)
    if (fr) {
      setDevice({
        id: fr.id,
        serial_number: fr.serial_number,
        installation_date: fr.installation_date,
        status: fr.status,
        user_id: fr.user_id
      });
      setOpen(true);
    }
  }


  const createData = async () => {
    setDevice({
      id: 0,
      serial_number: '',
      installation_date: '',
      status: '',
      user_id: ''
    });
    setOpen(true);
  }

  const updateDevice = async (e) => {


    e.preventDefault();
    Swal.fire({
      title: 'Loading...',

      text: 'Mohon tunggu sebentar...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    var res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices/assign-iot-devices`,
      {
        user_id: device.user_id,
        iot_device_id: device.id,
        device_id: device.id

      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

        },
      }
    )
      .then(function (response) {
        getDeviceData();
        setDevice({
          id: 0,
          serial_number: '',
          installation_date: '',
          status: '',
          user_id: ''

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
            title: 'error terjadi',
            text: 'mohon coba lagi nanti.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  const deleteDevice = async (id) => {
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
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices/remove_devices/${id}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            }
          );
          await getDeviceData();
          Swal.fire(
            'Unnasign!',
            'The device has been unassigned.',
            'success'
          );
        } catch (error) {

        }
      }
    });
  };

  useEffect(() => {
    getDeviceData();
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
            <h3>Device</h3>
            <div>
              <Dialog open={open} onOpenChange={setOpen}>
                {/* Add a ref to the dialog */}
                <DialogContent >
                  <DialogHeader>
                    <DialogTitle className="mb-4">{device.id != 0 ? 'Update' : 'Create'} Device</DialogTitle>
                    <DialogDescription>
                      <form method="dialog" onSubmit={device.id != 0 ? updateDevice : createDevice}>
                        <label className="mb-2 text-black float-start"> Serial Number </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={device.serial_number}
                          type="text"
                          name="serial_number"
                          placeholder="Serial Number"
                          onChange={handleInputChange}
                        />
                        <label className="mb-2 text-black float-start"> Installation Date </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={device.installation_date}
                          type="date"
                          name="installation_date"
                          placeholder="Installation Date"
                          onChange={handleInputChange}
                        />
                        <label className="mb-2 text-black float-start"> Status </label>
                        <select
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="status"
                          value={device.status}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Select status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        <label className="mb-2 text-black float-start"> Choose Farm Owner </label>
                        <select
                          name="user_id"
                          // s
                          onChange={handleSelectChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                        >
                          <option value="">Pilih User yang di Assign</option>
                          {
                            UserData && UserData.map((b) => {

                                if (device.user_id == b.id) {
                                  return <option key={b.id} value={b.id} selected>{b.name}</option>;
                                } else {

                                  return <option key={b.id} value={b.id} >{b.name}</option>;
                                }
                            })
                          }
                        </select>
                        <div className="flex justify-end gap-3 mt-5">
                          <button type="submit" className="btn-modal">{device.id != 0 ? 'Update' : 'Create'}</button>
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
                  placeholder="Filter Device..."
                  value={(table.getColumn("serial_number")?.getFilterValue()) ?? ""}
                  onChange={(event) =>
                    table.getColumn("serial_number")?.setFilterValue(event.target.value)
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




