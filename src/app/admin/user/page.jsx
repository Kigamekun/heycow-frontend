'use client'

import { Button } from "@/components/ui/button"
import * as React from "react"

import {
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

  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState({
      image: false,

    })
  const [rowSelection, setRowSelection] = React.useState({})

  const [deviceData, setDeviceData] = React.useState([]);
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("installation_date")}</div>,
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
      accessorKey: 'id',
      header: 'Actions',
      cell: info => (
        <div>
          <button className="text-xs text-white btn btn-warning" onClick={() => editDevice(Number(info.getValue()))}>Edit</button>
          <button className="ml-2 text-xs btn btn-danger" onClick={() => deleteDevice(Number(info.getValue()))}>Delete</button>
        </div>
      ),
    }

  ];
  const [device, setDevice] = React.useState({
    id: 0,
    serial_number: '',
    installation_date: '',
    status: '',
  });


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

  const [open, setOpen] = React.useState(false)







  

  const getDeviceData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer 7|BCr1usIvBIKTbtXrI8fQElNE8OowER8ZJf0UgBpk1f075e6c`,
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

  const createDevice = async (e) => {
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
    bodyFormData.append('serial_number', device.serial_number);
    bodyFormData.append('installation_date', device.installation_date);
    bodyFormData.append('status', device.status);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer 7|BCr1usIvBIKTbtXrI8fQElNE8OowER8ZJf0UgBpk1f075e6c`,
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
    var bodyFormData = new FormData();

    bodyFormData.append('serial_number', device.serial_number);
    bodyFormData.append('installation_date', device.installation_date);
    bodyFormData.append('status', device.status);

    var res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices/${device.id}`,
      {
        serial_number: device.serial_number,
        installation_date: device.installation_date,
        status: device.status,

      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 7|BCr1usIvBIKTbtXrI8fQElNE8OowER8ZJf0UgBpk1f075e6c`,

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
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices/${id}`,
            {
              headers: {
                'Authorization': `Bearer 7|BCr1usIvBIKTbtXrI8fQElNE8OowER8ZJf0UgBpk1f075e6c`,
              }
            }
          );
          await getDeviceData();
          Swal.fire(
            'Deleted!',
            'Your device has been deleted.',
            'success'
          );
        } catch (error) {

        }
      }
    });
  };

  React.useEffect(() => {
    getDeviceData();
  }, []);

  return (
    <></>
  )
}




