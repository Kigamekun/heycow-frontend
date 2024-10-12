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

  const [farmData, setFarmData] = React.useState([]);
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
              {row.getValue("name")}
            </h6>
            <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
            </p>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            address
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("address")}</div>,
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
  const [farm, setFarm] = React.useState({
    id: 0,
    name: '',
    address: '',
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

  const [open, setOpen] = React.useState(false)







  

  const getFarmData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setFarmData(response.data.data);
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

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,
          }
        }
      );

      // Refresh farm data
      getFarmData();

      // Reset form fields
      setFarm({
        id: 0,
        name: '',
        address: '',
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
      });
      setOpen(true);
    }
  }


  const createData = async () => {
    setFarm({
      id: 0,
      name: '',
      address: '',
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
    var bodyFormData = new FormData();

    bodyFormData.append('name', farm.name);
    bodyFormData.append('address', farm.address);

    var res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms/${farm.id}`,
      {
        name: farm.name,
        address: farm.address,

      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,

        },
      }
    )
      .then(function (response) {
        getFarmData();
        setFarm({
          id: 0,
          name: '',
          address: '',

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
                'Authorization': `Bearer 4|iWxmrEiTEsbGE37izKHXMfHg4t1tVWwemFpzgWBd4e83e9a3`,
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

  React.useEffect(() => {
    getFarmData();
  }, []);

  return (<></>

  )
}




