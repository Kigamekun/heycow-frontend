'use client'

import * as React from "react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"


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
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"


export default function cattle() {

  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState({
      image: false,

    })
  const [rowSelection, setRowSelection] = React.useState({})

  const [cattleData, setCattleData] = React.useState([]);
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
            name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (

        <div className="flex px-2 py-1">
          <div>

          </div>
          <div className="flex flex-col justify-center">
            <h6 className="mb-0 text-sm leading-normal dark:text-white">
              {row.getValue("name")}
            </h6>
            <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
            </p>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
    },

    
    {
      accessorKey: "gender",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            gender
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("gender")}</div>,
    },

    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("type")}</div>,
    },

    
    {
      accessorKey: "birth_date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            birth_date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("birth_date")}</div>,
    },

    {
      accessorKey: "birth_weight",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            birth_weight
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("birth_weight")}</div>,
    },


    {
      accessorKey: "birth_height",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            birth_height
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("birth_height")}</div>,
    },

    {
      accessorKey: "iot_device.serial_number",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            iot_device
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {

        if (row.original.iot_device != null) {
            return <div className="lowercase">{row.original.iot_device.serial_number}</div>
        }
        else {
            
            return <div className="lowercase">-</div>
        }

      },

    },  

     {
      accessorKey: "last_vaccination",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            last_vaccination
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("last_vaccination")}</div>,
    },  

    {
      accessorKey: 'id',
      header: 'Actions',
      cell: info => (
        <div>
          <button className="btn btn-warning text-white text-xs" onClick={() => editCattle(Number(info.getValue()))}>Edit</button>
          <button className="btn btn-danger text-xs ml-2" onClick={() => deleteCattle(Number(info.getValue()))}>Delete</button>
        </div>
      ),
    }
  ];
  const [cattle, setCattle] = React.useState({
    id: 0,
    name: "",
    address: "",
    breed_id: "" ,
    breed : "",
    type : "",
    status : "",
    birth_date : "",
    birth_weight : "",
    birth_height : "",
    iot_device_id : ""


});



const [IotDeviceData, setIotDeviceData] = React.useState(
 []
);

const [breedsData, setBreedsData] = React.useState(
 []
);


  const table = useReactTable({
    data: cattleData,
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
    setCattle({ ...cattle, [name]: value });
  }

  const [open, setOpen] = React.useState(false)


  // Breed Data
  const getBreedData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/breeds`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setBreedsData(response.data.data);
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
  



  // Iot Data
  const getIotDeviceData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setIotDeviceData(response.data.data);
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
  
// cattle Data
  const getCattleData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setCattleData(response.data.data);
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

  const createCattle = async (e) => {
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
    bodyFormData.append('name', cattle.name);
    bodyFormData.append('status', cattle.breed_id);
    bodyFormData.append('status', cattle.status);
    bodyFormData.append('gender', cattle.gender);
    bodyFormData.append('type', cattle.type);
    bodyFormData.append('birth_date', cattle.birth_date);
    bodyFormData.append('birth_weight', cattle.birth_weight);
    bodyFormData.append('birth_height', cattle.birth_height);
    bodyFormData.append('iot_devices', cattle.iot_devices);
    bodyFormData.append('last_vaccination', cattle.last_vaccination);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,
          }
        }
      );

      // Refresh cattle data
      getCattleData();

      // Reset form fields
      setCattle({
        id: 0,
        name: "",
        breed_id: "" ,
        breed : "",
        gender : "",
        type : "",
        status : "",
        birth_date : "",
        birth_weight : "",
        birth_height : "",
        iot_device_id : "",
        last_vaccination : ""
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

  const editCattle = async (id) => {
    let fr = cattleData.find((f) => f.id === id);
    console.log(fr)
    if (fr) {
      setCattle({
        id: fr.id,
        name: fr.name,
        address: fr.address,
      });
      setOpen(true);
    }
  }


  const updateCattle = async (e) => {


    e.preventDefault();
    Swal.fire({
      title: 'Loading...',

      text: 'Mohon tunggu sebentar...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    var bodyFormData = new FormData();

    bodyFormData.append('name', cattle.name);
    bodyFormData.append('status', cattle.breed_id);
    bodyFormData.append('status', cattle.status);
    bodyFormData.append('gender', cattle.gender);
    bodyFormData.append('type', cattle.type);
    bodyFormData.append('birth_date', cattle.birth_date);
    bodyFormData.append('birth_weight', cattle.birth_weight);
    bodyFormData.append('birth_height', cattle.birth_height);
    bodyFormData.append('iot_devices', cattle.iot_devices);
    bodyFormData.append('last_vaccination', cattle.last_vaccination);

    var res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${cattle.id}`,
      {
        name: cattle.name,
        address: cattle.address,

      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,

        },
      }
    )
      .then(function (response) {
        getCattleData();
        setCattle({
            id: 0,
            name: "",
            breed_id: "" ,
            breed : "",
            gender : "",
            type : "",
            status : "",
            birth_date : "",
            birth_weight : "",
            birth_height : "",
            iot_device_id : "",
            last_vaccination : ""

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

  const deleteCattle = async (id) => {
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
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${id}`,
            {
              headers: {
                'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,
              }
            }
          );
          await getCattleData();
          Swal.fire(
            'Deleted!',
            'Your cattle has been deleted.',
            'success'
          );
        } catch (error) {

        }
      }
    });
  };

  React.useEffect(() => {
    getCattleData();
    getBreedData();
    getIotDeviceData();

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
            <h3>Cattle</h3>
            <div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Create Cattle</Button>
                </DialogTrigger>

                {/* Add a ref to the dialog */}
                <DialogContent  className={"lg:max-w-[200px]-lg overflow-y-scroll max-h-screen"} >
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      <form method="dialog" onSubmit={cattle.id != 0 ? updateCattle : createCattle}>
                        <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.name}
                          type="text"
                          name="name"
                          placeholder="Name"
                          onChange={handleInputChange}
                        />

                        <label className="mt-5 input-bordered w-full">
                            <select
                                name="status"
                                value={cattle.breed_id}
                                onChange={handleInputChange}
                                className="input input-bordered w-full mt-1"
                            >
                                <option value="">Breed</option>

                                {
                                    breedsData && breedsData.map((b) => {
                                        return <option key={b.id} value={b.id}>{b.name}</option>
                                    })
                                }
                                {/* <option value="sehat">Sehat</option>
                                <option value="sakit">Sakit</option>
                                <option value="mati">Mati</option> */}
                            </select>
                        </label>
                        {/* <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.status}
                          type="select"
                          name="status"
                          placeholder="status"
                          onChange={handleInputChange}
                        /> */}
                    <label className="mt-5 input-bordered w-full">
                        <select
                            name="status"
                            value={cattle.status}
                            onChange={handleInputChange}
                            className="input input-bordered w-full mt-1"
                        >
                            <option value="">Pilih Status Sapimu</option>
                            <option value="Sehat">Sehat</option>
                            <option value="Sakit">Sakit</option>
                            <option value="Mati">Mati</option>
                        </select>
                    </label>
                       
                        {/* <div className="mt-5 input-bordered w-full ">
                            <label>
                                Status:
                                <select name="status" value={cattle.status} onChange={handleInputChange}>
                                    <option value="status1">Status 1</option>
                                    <option value="status2">Status 2</option>
                                    <option value="status3">Status 3</option>
                                </select>
                            </label>
                        </div> */}

                        {/* <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.gender}
                          type="text"
                          name="gender"
                          placeholder="gender"
                          onChange={handleInputChange}
                        /> */}

                        <div className="mt-5 input-bordered w-full flex justify-start gap-3     ">
                            <label>
                                <input
                                type="radio"
                                name="gender"
                                value="pejantan"
                                checked={cattle.gender === 'pejantan'}
                                onChange={handleInputChange}
                                />
                                Pejantan
                            </label>
                            <label>
                                <input
                                type="radio"
                                name="gender"
                                value="betina"
                                checked={cattle.gender === 'betina'}
                                onChange={handleInputChange}
                                />
                                Betina
                            </label>
                        </div>
                        {/* <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.type}
                          type="text"
                          name="type"
                          placeholder="type"
                          onChange={handleInputChange}
                        /> */}

                        <label className="mt-5 input-bordered w-full">
                            <select
                                name="type"
                                value={cattle.type}
                                onChange={handleInputChange}
                                className="input input-bordered w-full mt-1"
                            >
                                <option value="">Pilih Jenis Sapimu</option>
                                <option value="pedaging">Sapi Pedaging</option>
                                <option value="peternak">Sapi Peternak</option>
                                <option value="perah">Sapi Perah</option>
                            </select>
                        </label>

                        <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.birth_date}
                          type="date"
                          name="birth_date"
                          placeholder="birth_date"
                          onChange={handleInputChange}
                        />
                        <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.birth_weight}
                          type="text"
                          name="birth_weight"
                          placeholder="birth_weight"
                          onChange={handleInputChange}
                        />
                         <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.birth_height}
                          type="text"
                          name="birth_height"
                          placeholder="birth_height"
                          onChange={handleInputChange}
                        />
                        {/* <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.iot_devices}
                          type="text"
                          name="iot_devices"
                          placeholder="iot_devices"
                          onChange={handleInputChange}
                        /> */}
                        <label className="mt-5 input-bordered w-full">
                            <select
                                name="status"
                                value={cattle.iot_devices}
                                onChange={handleInputChange}
                                className="input input-bordered w-full mt-1"
                            >
                                <option value="">Breed</option>

                                {
                                    IotDeviceData && IotDeviceData.map((b) => {
                                        return <option key={b.id} value={b.id}>{b.name}</option>
                                    })
                                }
                                {/* <option value="sehat">Sehat</option>
                                <option value="sakit">Sakit</option>
                                <option value="mati">Mati</option> */}
                            </select>
                        </label>
                        <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.last_vaccination}
                          type="date"
                          name="last_vaccination"
                          placeholder="last_vaccination"
                          onChange={handleInputChange}
                        />
                        <div className="mt-5 flex justify-end gap-3">
                          <button type="submit" className="btn">Create</button>
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
                  placeholder="Filter Cattle..."
                  value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            </TableHead>
                          )
                        })}
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
                            <TableCell key={cell.id}>
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
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
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



