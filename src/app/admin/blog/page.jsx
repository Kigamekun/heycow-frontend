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

        <div className="flex px-2 py-1">
          <div className="flex flex-col justify-center">
            <img src={row.getValue("full_image_url") ?? 'https://th.bing.com/th/id/R.aece1145f2d3480e38bc9443a4998c04?rik=ey6pjfxR5wHPvQ&riu=http%3a%2f%2finstitutcommotions.com%2fwp-content%2fuploads%2f2018%2f05%2fblank-profile-picture-973460_960_720-1.png&ehk=cWQNlcoT06KT7deWxMnwK034GVCHVSXupbX4E5i1Psw%3d&risl=&pid=ImgRaw&r=0'} alt="image" className="w-10 h-10 rounded-full">
            </img>
          </div>
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("user_id")}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
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
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("content")}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("price")}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("cattle_id")}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("published")}</div>,
    },
    {
      accessorKey: "published_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Published Date
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("published_at")}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("comments_count")}</div>,
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
      cell: ({ row }) => <div className="lowercase">{row.getValue("likes_count")}</div>,
    },
    {
      accessorKey: 'id',
      header: 'Actions',
      cell: info => (
        <div>
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

  const handleSelectChange = (event) => {
    const name = event.target.name;
    const { value } = event.target.selectedOptions[0];
    console.log(value);
    setBlogPost({ ...User, [name]: value });

  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files ? event.target.files[0] : undefined);
  }
  const [open, setOpen] = useState(false)

  const getBlogPostData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts`, {
      headers: {
        'content-type': 'text/json',
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
    // bodyFormData.append('avatar', User.avatar);
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
    bodyFormData.append('comments_count', BlogPost.comments_count);
    bodyFormData.append('likes_count', BlogPost.likes_count);

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

      // Refresh User data
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

  const editBlogPost = async (id) => {
    let bp = BlogPostData.find((f) => f.id === id);
    console.log(bp)
    if (bp) {
      setBlogPost({
        id: bp.id,
        user_id: bp.user_id,
        title: bp.title,
        content: bp.content,
        category: bp.category,
        image: bp.image,
        price: bp.price,
        cattle_id: bp.cattle_id,
        published: bp.published,
        published_at: bp.published_at,
        comments_count: bp.comments_count,
        likes_count: bp.likes_count
      });
      setOpen(true);
    }
  }


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
      comments_count: '',
      likes_count: ''

    });
    setOpen(true);
  }

  const updateBlogPost = async (e) => {


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
    // bodyFormData.append('avatar', User.avatar);
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
    bodyFormData.append('comments_count', BlogPost.comments_count);
    bodyFormData.append('likes_count', BlogPost.likes_count);

    var res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${BlogPost.id}`,
      {
        user_id: BlogPost.user_id,
        title: BlogPost.title,
        content: BlogPost.content,
        category: BlogPost.category,
        price: BlogPost.price,
        cattle_id: BlogPost.cattle_id,
        published: BlogPost.published,
        published_at: BlogPost.published_at,
        comments_count: BlogPost.comments_count,
        likes_count: BlogPost.likes_count,

      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

        },
      }
    )
      .then(function (response) {
        getBlogPostData();
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
                        <input
                          className="file-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          // value={BlogPost.image}
                          type="file"
                          name="image"
                          placeholder="Chose your image"
                          onChange={handleFileSelect}
                        />
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.user_id}
                          type="text"
                          name="user_id"
                          placeholder="user_id"
                          onChange={handleInputChange}
                        />

                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.title}
                          type="text"
                          name="title"
                          placeholder="Masukkan Alamatmu"
                          onChange={handleInputChange}
                        />

                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.content}
                          type="text"
                          name="content"
                          placeholder="Masukkan Nomor Telponmu"
                          onChange={handleInputChange}
                        />

                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.category}
                          type="text"
                          name="category"
                          placeholder="Masukkan Emailmu"
                          onChange={handleInputChange}
                        />

                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.price}
                          type="text"
                          name="price"
                          placeholder="Masukkan Passwordmu! minimal 8 karakter"
                          onChange={handleInputChange}
                        />
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.published}
                          type="text"
                          name="published"
                          placeholder="Masukkan Passwordmu! minimal 8 karakter"
                          onChange={handleInputChange}
                        />
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.published_at}
                          type="text"
                          name="published_at"
                          placeholder="Masukkan Passwordmu! minimal 8 karakter"
                          onChange={handleInputChange}
                        />
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.comments_count}
                          type="text"
                          name="comment_count"
                          placeholder="Masukkan Passwordmu! minimal 8 karakter"
                          onChange={handleInputChange}
                        />
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          value={BlogPost.likes_count}
                          type="text"
                          name="likes_count"
                          placeholder="Masukkan Passwordmu! minimal 8 karakter"
                          onChange={handleInputChange}
                        />

                        {/* <label className="w-full input-bordered">
                            <select
                                name="role"
                                value={cattle.status}
                                onChange={handleSelectChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                            >
                                <option value="">Pilih Role User</option>
                                <option value="admin">Admin</option>
                                <option value="cattleman">Peternak</option>

                            </select>
                        </label> */}

                        <div className="flex justify-end gap-3 mt-5">
                          <button type="submit" className="btn">{BlogPost.id != 0 ? 'Update' : 'Create'} Blog Post</button>
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




