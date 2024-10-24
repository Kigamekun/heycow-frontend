'use client'
import { useState } from 'react';
import * as React from "react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
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


export default function Cattle() {
  const { user, logout } = useAuth({ middleware: 'admin' })
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  // const [error, setError] = useState(false);
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
          <div className="flex text-center flex-col justify-center">
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
      accessorKey: "breed.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Jenis Sapi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {

        if (row.original.breed != null) {
            return <div className="lowercase">{row.original.breed.name}</div>
        }
        else {
            
            return <div className="lowercase">-</div>
        }

      },
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
      accessorKey: "farm.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
           Adrress
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {

        if (row.original.farm != null) {
            return <div className="lowercase">{row.original.farm.name}</div>
        }
        else {
            
            return <div className="lowercase">-</div>
        }

      },

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
    farm: "",
    breed_id: "" ,
    type : "",
    status : "",
    birth_date : "",
    birth_weight : "",
    birth_height : "",
    iot_device_id : "",
    last_vaccination : ""


});


const [IotDeviceData, setIotDeviceData] = React.useState(
 []
);

const [breedsData, setBreedsData] = React.useState(
 []
);

const [farmData, setFarmData] = React.useState(
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

  

  const handleSelectChange = (event) => {
    
    const name = event.target.name;
    const {value} = event.target.selectedOptions[0];
    console.log(value);
    setCattle({ ...cattle, [name]: value });

  }

  const [open, setOpen] = React.useState(false)


  // Breed Data
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
  
  // mengambil farm data
  const getFarmData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setFarmData(response.data.data);
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


  // mengambil Iot Data
  const getIotDeviceData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
  
// mengambil semua cattle Data
  const getCattleData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
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



  // Membuat cattle data
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
    bodyFormData.append('breed_id', cattle.breed_id);
    bodyFormData.append('status', cattle.status);
    bodyFormData.append('gender', cattle.gender);
    bodyFormData.append('type', cattle.type);
    bodyFormData.append('farm', cattle.farm);
    bodyFormData.append('birth_date', cattle.birth_date);
    bodyFormData.append('birth_weight', cattle.birth_weight);
    bodyFormData.append('birth_height', cattle.birth_height);
    bodyFormData.append('iot_device_id', cattle.iot_device_id);
    bodyFormData.append('last_vaccination', cattle.last_vaccination);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      console.log(res.data) ;
      // Refresh cattle data
      getCattleData();

      // Reset form fields
      setCattle({
        id: 0,
        name: "",
        breed_id: "" ,
        gender : "",
        type : "",
        farm : "",
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
      console.error('Error:', error.response);  // Log error lengkap dari response
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
    let ct = cattleData.find((f) => f.id === id );
    console.log(ct)
    if (ct) {
      setCattle({
        id : ct.id,
        name: ct.name,
        breed_id: ct.breed_id ,
        gender : ct.gender,
        type : ct.type,
        status : ct.status,
        farm : ct.farm,
        birth_date : ct.birth_date,
        birth_weight : ct.birth_weight,
        birth_height : ct.birth_height,
        iot_device_id : ct.iot_device_id,
        last_vaccination : ct.last_vaccination

      
      });
      setOpen(true);
    }
  }

  const createData = async () => {
    setCattle({
      id: 0,
            name: "",
            breed_id: "" ,
            farm : "",
            gender : "",
            type : "",
            status : "",
            farm : " ",
            birth_date : "",
            birth_weight : "",
            birth_height : "",
            iot_device_id : "",
            last_vaccination : ""
    });
    setOpen(true);
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
    bodyFormData.append('breed_id', cattle.breed_id);
    bodyFormData.append('status', cattle.status);
    bodyFormData.append('gender', cattle.gender);
    bodyFormData.append('type', cattle.type);
    bodyFormData.append('farm', cattle.farm);
    bodyFormData.append('birth_date', cattle.birth_date);
    bodyFormData.append('birth_weight', cattle.birth_weight);
    bodyFormData.append('birth_height', cattle.birth_height);
    bodyFormData.append('iot_device_id', cattle.iot_device_id);
    bodyFormData.append('last_vaccination', cattle.last_vaccination);

    var res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${cattle.id}`,
      {
        name: cattle.name,
        breed_id: cattle.breed_id ,
        gender : cattle.gender,
        type : cattle.type,
        farm : cattle.farm,
        status : cattle.status,
        birth_date : cattle.birth_date,
        birth_weight : cattle.birth_weight,
        birth_height : cattle.birth_height,
        iot_device_id : cattle.iot_device_id,
        last_vaccination : cattle.last_vaccination

      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

        },
      },
     
    )
      .then(function (response) {
        getCattleData();
        setCattle({
            id: 0,
            name: "",
            breed_id: "" ,
            gender : "",
            type : "",
            status : "",
            farm : "",
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
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
    getBreedsData();
    getFarmData();
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
          <div className="d-flex justify-content-between align-items-left">
            <h3>Cattle</h3>
            <div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={createData}>Create Cattle</Button>
                </DialogTrigger>

                {/* Add a ref to the dialog */}
                <DialogContent  className={"lg:max-w-[200px]-lg overflow-y-scroll max-h-screen"} >
                  <DialogHeader>
                    <DialogTitle>{cattle.id != 0 ? 'Update' :'Create'} Cattle</DialogTitle>
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


                        <div>
                          <label className="mt-5 input-bordered w-full">
                            <select
                              name="breed_id"
                              onChange={handleSelectChange}
                              className="input input-bordered w-full mt-1"
                            >
                              <option value="">Breed</option>
                              {breedsData && breedsData.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                              ))}
                            </select>
                          </label>
                        </div>
                       
                        <label className="mt-5 input-bordered w-full">
                            <select
                                name="status"
                                // value={cattle.status}
                                onChange={handleSelectChange}
                                className="input input-bordered w-full mt-1"
                            >
                                <option value="">Pilih Status Sapimu</option>
                                <option value="sehat">Sehat</option>
                                <option value="sakit">Sakit</option>
                                <option value="mati">Mati</option>
                            </select>
                        </label>
                       
                        <div className="mt-5 input-bordered w-full flex justify-start gap-3     ">
                            <label>
                                <input
                                type="radio"
                                name="gender"
                                value="jantan"
                                checked={cattle.gender === 'jantan'}
                                onChange={handleInputChange}
                                />
                                Jantan
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

                        <label className="mt-5 input-bordered w-full">
                            <select
                                name="type"
                                // value={cattle.type}
                                onChange={handleSelectChange}
                                className="input input-bordered w-full mt-1"
                            >
                                <option value="">Pilih Jenis Sapimu</option>
                                <option value="pedaging">Sapi Pedaging</option>
                                <option value="peranakan">Sapi Peternak</option>
                                <option value="perah">Sapi Perah</option>
                            </select>
                        </label>

                        <div>
                          <label className="mt-5 input-bordered w-full">
                            <select
                              name="farm"
                              onChange={handleSelectChange}
                              className="input input-bordered w-full mt-1"
                            >
                              <option value="">Pilih nama farm mu</option>
                              {farmData && farmData.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                              ))}
                            </select>
                          </label>
                        </div>

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

                        <label className="mt-5 input-bordered w-full">
                            <select
                                name="iot_device_id"
                                onChange={handleSelectChange}
                                className="input input-bordered w-full mt-1"
                            >
                                <option value="">iot device</option>

                                {
                                    IotDeviceData && IotDeviceData.map((b) => {
                                        return <option key={b.id} value={b.id}>{b.serial_number}</option>
                                    })
                                }
                                
                            </select>
                        </label>
                 
                        <div className="flex flex-col items-start mt-5">
                          <label htmlFor="last_vaccination" className="w-full">Last Vaccination</label>
                          <input
                            className="input input-bordered w-full"
                            id="last_vaccination"
                            value={cattle.last_vaccination}
                            type="date"
                            name="last_vaccination"
                            placeholder="last_vaccination"
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="mt-5 flex justify-end gap-3">
                          <button type="submit" className="btn">{cattle.id != 0 ? 'Update' :'Create'} Cattle</button>
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




