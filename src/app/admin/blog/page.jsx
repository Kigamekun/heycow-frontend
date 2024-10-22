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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

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
import { ArrowUpDown, Files } from "lucide-react"


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


  const [UserData, setUserData] = React.useState([]);
  const columns = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => row.index + 1, // Display row index, starting from 1
    },
    {
      accessorKey: "avatar",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Avatar
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (

        <div className="flex px-2 py-1">
          <div className="flex flex-col justify-center">
            <img className="mb-0 text-sm leading-normal dark:text-white">
              {row.getValue()}
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
      accessorKey: "password",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Password
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("password")}</div>,
    },
    
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
    },
    // {
    //     accessorKey: "status",
    //     header: ({ column }) => {
    //       return (
    //         <Button
    //           variant="ghost"
    //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //           Status
    //           <ArrowUpDown className="w-4 h-4 ml-2" />
    //         </Button>
    //       )
    //     },
    //     cell: ({ row }) => (
  
    //       <div className="flex px-2 py-1">
    //         <div>
  
    //         </div>
    //         <div className="flex flex-col justify-center">
    //           <h6 className="mb-0 text-sm leading-normal dark:text-white">
    //             {row.getValue("status") == 'active' ? <span class="badge bg-success">Active</span> : <span class="badge bg-danger">Inactive</span>}
    //           </h6>
    //           <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
    //           </p>
    //         </div>
    //       </div>
    //     ),
        
    //   },

    {
      accessorKey: 'id',
      header: 'Actions',
      cell: info => (
        <div>
          <button className="text-xs text-white btn btn-warning" onClick={() => editUser(Number(info.getValue()))}>Edit</button>
          <button className="ml-2 text-xs btn btn-danger" onClick={() => delete(Number(info.getValue()))}>Delete</button>
        </div>
      ),
    }

  ];
  const [User, setUser] = React.useState({
    id: 0,
    avatar: '',
    name: '',
    address: '',
    phone_number: '',
    email: '',
    password: '',
    role: ''

  });


  const table = useReactTable({
    data: UserData,
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
    const { name, value, files } = event.target;
    if (name === 'avatar') {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: files[0], // Handle file input
      }));
      console.log(`Updated ${name}: ${files[0].name}`); // Log file name
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
      console.log(`Updated ${name}: ${value}`); // Log value
    }
  }

  const handleSelectChange = (event) => {
    const name = event.target.name;
    const {value} = event.target.selectedOptions[0];
    console.log(value);
    setUser({ ...User, [name]: value });

  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files ? event.target.files[0] : undefined);
  }
  const [open, setOpen] = React.useState(false)

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

  const createUser = async (e) => {
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
    // bodyFormData.append('avatar', User.avatar);
    if (selectedFile) {
      bodyFormData.append('avatar', selectedFile);
  }
  
    bodyFormData.append('name', User.name);
    bodyFormData.append('address', User.address);
    bodyFormData.append('phone_number', User.phone_number);
    bodyFormData.append('email', User.email);
    bodyFormData.append('password', User.password);
    bodyFormData.append('role', User.role);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      // Refresh User data
      getUserData();

      // Reset form fields
      setUser({
        id: 0,
        avatar: Files || undefined,
        name: '',
        address: '',
        phone_number: '',
        email: '',
        password: '',
        role: ''
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

  const editUser = async (id) => {
    let fr = UserData.find((f) => f.id === id);
    console.log(fr)
    if (fr) {
      setUser({
        id: fr.id,
        avatar: fr.avatar,
        name: fr.name,
        status: fr.status,
      });
      setOpen(true);
    }
  }


  const createData = async () => {
    setUser({
      id: 0,
      avatar: '',
      name: '',
      address: '',
      phone_number: '',
      email: '',
      password: '',
      role: ''

    });
    setOpen(true);
  }

  const updateUser = async (e) => {


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
    bodyFormData.append('avatar', User.avatar);
    bodyFormData.append('name', User.name);
    bodyFormData.append('status', User.address);
    bodyFormData.append('phone_number', User.phone_number);
    bodyFormData.append('role', User.role);

    var res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${User.id}`,
      {
        avatar: User.avatar,
        name: User.name,
        address: User.address,
        phone_number: User.phone_number,
        role: User.role

      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

        },
      }
    )
      .then(function (response) {
        getUserData();
        setUser({
          id: 0,
          avatar: '',
          name: '',
          address: '',
          phone_number: '',
          role: ''

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

  const deleteUser = async (id) => {
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
    getUserData();
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
            <h3>User Account</h3>
            <div>
            <Button variant="outline" onClick={createData}>Create Account</Button>


              <Dialog open={open} onOpenChange={setOpen}>
               

                {/* Add a ref to the dialog */}
                <DialogContent >
                  <DialogHeader>
                    <DialogTitle className="mb-4">{User.id != 0 ? 'Update' :'Create'} User</DialogTitle>
                    <DialogDescription>
                      <form method="dialog" onSubmit={User.id != 0 ? updateUser : createUser}>
                        {/* untuk masukkan file, gunakan dropify */}
                        <input
                          className="file-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          // value={User.avatar}
                          type="file"
                          name="avatar"
                          placeholder="Chose your avatar"
                          onChange={handleFileSelect}
                        />
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={User.name}
                          type="text"
                          name="name"
                          placeholder="Username"
                          onChange={handleInputChange}
                        />
                       
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={User.address}
                          type="text"
                          name="address"
                          placeholder="Masukkan Alamatmu"
                          onChange={handleInputChange}
                        />

                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={User.phone_number}
                          type="text"
                          name="phone_number"
                          placeholder="Masukkan Nomor Telponmu"
                          onChange={handleInputChange}
                        />

                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={User.email}
                          type="email"
                          name="email"
                          placeholder="Masukkan Emailmu"
                          onChange={handleInputChange}
                        />

                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={User.password}
                          type="text"
                          name="password"
                          placeholder="Masukkan Passwordmu! minimal 8 karakter"
                          onChange={handleInputChange}
                        />

                        <label className=" input-bordered w-full">
                            <select
                                name="role"
                                // value={cattle.status}
                                onChange={handleSelectChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                            >
                                <option value="">Pilih Role User</option>
                                <option value="admin">Admin</option>
                                <option value="cattleman">Peternak</option>

                            </select>
                        </label>
                        
                        <div className="mt-5 flex justify-end gap-3">
                          <button type="submit" className="btn">{User.id != 0 ? 'Update' :'Create'} User</button>
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
                  placeholder="Filter User..."
                  value={(table.getColumn("avatar")?.getFilterValue()) ?? ""}
                  onChange={(event) =>
                    table.getColumn("avatar")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
              <div className="border rounded-md">
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




