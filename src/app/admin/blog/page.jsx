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
import { useEffect, useState } from "react"

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
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState(
    []
  )
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
  const [columnVisibility, setColumnVisibility] =
    useState({
      image: false,

    })
  const [rowSelection, setRowSelection] = useState({})

  const [selectedFile, setSelectedFile] = useState();
  const [UserData, setUserData] = useState([])
  const [cattleData, setCattleData] = useState([]);


  const [BlogPostData, setBlogPostData] = useState([]);
  const columns = [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => row.index + 1, // Display row index, starting from 1
    },
    {
      accessorKey: "full_image_url",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Image
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => (

          <div className="flex items-center justify-center">
            <img src={row.getValue("full_image_url") ?? 'https://th.bing.com/th/id/R.aece1145f2d3480e38bc9443a4998c04?rik=ey6pjfxR5wHPvQ&riu=http%3a%2f%2finstitutcommotions.com%2fwp-content%2fuploads%2f2018%2f05%2fblank-profile-picture-973460_960_720-1.png&ehk=cWQNlcoT06KT7deWxMnwK034GVCHVSXupbX4E5i1Psw%3d&risl=&pid=ImgRaw&r=0'} 
            alt="image" className="w-16 h-16 rounded-full">
            </img>
          </div>
      ),

    },

    {
      accessorKey: "user_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User ID
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("user_id")}</div>,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "content",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Content
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const content = row.getValue("content");
        const maxLength = 50;
        const truncatedContent = content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
        
        return <div className="">{truncatedContent}</div>;
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) =>
        <div className="flex px-2 py-1">
          <div className="flex flex-col justify-center">
            <h6 className="mb-0 text-sm leading-normal dark:text-white">
              {row.getValue("category") == 'jual' ? <span class="badge bg-warning">Jual</span> : <span class="badge bg-primary">Forum</span>}
            </h6>
            <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
            </p>
          </div>
        </div>,
    },

    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("price")}</div>,
    },

    {
      accessorKey: "cattle_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cattle ID
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("cattle_id")}</div>,
    },
    {
      accessorKey: "published",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Published Status
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("published")}</div>,
    },
    {
      accessorKey: "published_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Published Date/Time
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("published_at")}</div>,
    },
    {
      accessorKey: "comments_count",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Comments Count
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("comments_count")}</div>,
    },
    {
      accessorKey: "likes_count",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Likes Count
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="">{row.getValue("likes_count")}</div>,
    },
    {
      accessorKey: 'id',
      header: 'Actions',
      cell: info => (
        <div className="flex space-x-2">
          <button className="text-xs text-white btn btn-warning" onClick={() => editBlogPost(Number(info.getValue()))}>Edit</button>
          <button className="ml-2 text-xs btn btn-danger" onClick={() => deleteBlogPost(Number(info.getValue()))}>Delete</button>
        </div>
      ),
    }
  ];
  const [BlogPost, setBlogPost] = useState({
    id: 0,
    user_id: '',
    title: '',
    content: '',
    category: '',
    image: '',
    price: '',
    cattle_id: '',
    published: '',
    published_at: '',
    comments_count: '',
    likes_count: ''
  });


  const table = useReactTable({
    data: BlogPostData,
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
      setBlogPost((prevBlogPost) => ({
        ...prevBlogPost,
        [name]: files[0], // Handle file input
      }));
      console.log(`Updated ${name}: ${files[0].name}`); // Log file name
    } else {
      setBlogPost((prevBlogPost) => ({
        ...prevBlogPost,
        [name]: value,
      }));
      console.log(`Updated ${name}: ${value}`); // Log value
    }
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`); // Debugging
    setBlogPost((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the corresponding field in state
    }));
  };


  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files ? event.target.files[0] : undefined);
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

  const getBlogPostData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setBlogPostData(response.data.data.data);
          console.log(response.data.data.data)
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

  const getCattleData = async () => {


    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`, {
        headers: {
          'content-type': 'text/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (res.data.data) {
        setCattleData(res.data.data);
        console.log('Ada datanya');
        console.log(res.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });

        logout();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'error terjadi',
          text: 'mohon coba lagi nanti.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const createBlogPost = async (e) => {
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
    if (selectedFile) {
      bodyFormData.append('image', selectedFile);
    }

    bodyFormData.append('user_id', BlogPost.user_id);
    bodyFormData.append('title', BlogPost.title);
    bodyFormData.append('content', BlogPost.content);
    bodyFormData.append('category', BlogPost.category);
    bodyFormData.append('price', BlogPost.price);
    bodyFormData.append('cattle_id', BlogPost.cattle_id);
    bodyFormData.append('published', BlogPost.published);
    bodyFormData.append('published_at', BlogPost.published_at);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      getBlogPostData();

      // Reset form fields
      setBlogPost({
        id: 0,
        user_id: '',
        title: '',
        content: '',
        category: '',
        image: '',
        price: '',
        cattle_id: '',
        published: '',
        published_at: '',
        comments_count: '',
        likes_count: ''
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

  const updateBlogPost = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Loading...',
      text: 'Mohon tunggu sebentar...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
  
    // Construct JSON object
    const payload = {
      user_id: BlogPost.user_id,
      title: BlogPost.title,
      content: BlogPost.content,
      category: BlogPost.category,
      price: BlogPost.price,
      cattle_id: BlogPost.cattle_id,
      published: BlogPost.published,
      published_at: BlogPost.published_at,
      image: selectedFile || BlogPost.image, // Optional: Include the current image if no new file is selected
    };
  
    console.log('Data being sent:', payload); // Debugging
  
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${BlogPost.id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      console.log('API response:', response.data); // Debugging
      getBlogPostData(); // Ensure it fetches fresh data
      setBlogPost({
        id: 0,
        user_id: '',
        title: '',
        content: '',
        category: '',
        image: '',
        price: '',
        cattle_id: '',
        published: '',
        published_at: '',
      });
      setOpen(false);
      Swal.close();
    } catch (error) {
      console.error('Error:', error.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: 'Please try again later.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  const createData = async () => {
    setBlogPost({
      id: 0,
      user_id: '',
      title: '',
      content: '',
      category: '',
      image: '',
      price: '',
      cattle_id: '',
      published: '',
      published_at: '',

    });
    setOpen(true);
  }

    const deleteBlogPost = async (id) => {
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
              `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${id}`,
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
              }
            );
            await getBlogPostData();
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
    

  useEffect(() => {
    getBlogPostData();
    getUserData();
    getCattleData();
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
            <h3>Community Blog Post</h3>
            <div>
              <Button variant="outline" onClick={createData}>Create Blog Post</Button>


              <Dialog open={open} onOpenChange={setOpen}>


                {/* Add a ref to the dialog */}
                <DialogContent className={"lg:max-w-[200px]-lg overflow-y-scroll max-h-screen"} >
                  <DialogHeader>
                    <DialogTitle className="mb-4">{BlogPost.id != 0 ? 'Update' : 'Create'} Blog Post</DialogTitle>
                    <DialogDescription>
                      <form method="dialog" onSubmit={BlogPost.id != 0 ? updateBlogPost : createBlogPost}>
                        {/* untuk masukkan file, gunakan dropify */}
                        <label className="mb-2 text-black float-start"> Image </label>
                        <input
                          className="file-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          // value={BlogPost.image}
                          type="file"
                          name="image"
                          placeholder="Pilih Gambar"
                          onChange={handleFileSelect}
                        />
                        <label className="mb-2 text-black float-start"> User </label>
                        <select
                          name="user_id"
                          value={BlogPost.user_id}
                          onChange={handleSelectChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                        >
                          <option value="">Pilih User</option>
                            {
                              UserData && UserData.map((a) => {
                                return <option key={a.id} value={a.id}>{a.name}</option>
                              })
                            }
                        </select>
                        <label className="mb-2 text-black float-start"> Title </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.title}
                          type="text"
                          name="title"
                          placeholder="Masukkan Judul"
                          onChange={handleInputChange}
                        />
                        <label className="mb-2 text-black float-start"> Content </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.content}
                          type="text"
                          name="content"
                          placeholder="Deskripsi Blog Post"
                          onChange={handleInputChange}
                        />
                        <label className="mb-3 text-black float-start"> Category </label>
                          <select
                            name="category"
                            value={BlogPost.category}
                            onChange={handleSelectChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          >
                            <option value="">Pilih Jenis Category</option>
                            <option value="jual">Jual</option>
                            <option value="forum">Forum</option>
                          </select>
                          <label className="mb-3 text-black float-start"> Price </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.price}
                          type="text"
                          name="price"
                          placeholder="Masukkan Harga"
                          onChange={handleInputChange}
                        />
                        <label className="mb-3 text-black float-start"> Cattle </label>
                        <select
                          name="cattle_id"
                          value={BlogPost.cattle_id}
                          onChange={handleSelectChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                        >
                          <option value="">Pilih Cattle</option>
                            {
                              cattleData && cattleData.map((b) => {
                                return <option key={b.id} value={b.id}>{b.name}</option>
                              })
                            }
                        </select>
                        <div className="flex justify-end gap-3 mt-5">
                          <button type="submit" className="btn-modal">{BlogPost.id != 0 ? 'Update' : 'Create'} Blog Post</button>
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
                  value={(table.getColumn("title")?.getFilterValue()) ?? ""}
                  onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
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




