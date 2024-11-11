'use client'

import { swal } from "@/public/assets/extensions/sweetalert2/sweetalert2.all";
import axios from "axios";
import Script from "next/script";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator"
import { Avatar } from "@nextui-org/react";
import { useAuth } from "@/lib/hooks/auth";

// Bagian modals
import { Button } from "@/components/ui/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from '@nextui-org/modal';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
  
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

export default function JualPage() {
    const [jualData, setJualData] = React.useState([]);
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
    const [jual, setJual] = React.useState({
        id: 0,
        title: '',
        content: '',
        image: '',
        category: 'jual',
    });
    const categories = ['forum', 'jual'];

    const {user, middleware} = useAuth(['cattleman', 'admin'])
    const getForumData = async () => {
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts?category=jual`,{
                headers :{
                    'Content-Type' : 'text/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.data) {
                setJualData(res.data.data.data);
                console.log('ada datanya');
                console.log(res.data.data.data)
            }

        }catch (error) {
            if(error.response && error.response.status === 401){
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
    }
    const createJual = async (e) => {
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
        bodyFormData.append('title', jual.title);
        bodyFormData.append('content', jual.content);
        bodyFormData.append('image', jual.image);
        bodyFormData.append('category', jual.category);
        
    
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
          console.log(res.data) ;
          // Refresh cattle data
          getForumData();
    
          // Reset form fields
          setJual({
            id: 0,
            title: '',
            content: '',
            category: '',
            image : ''
          });
    
          onClose();
    
          Swal.fire({
            icon: 'success',
            title: 'BlogPost berhasil dibuat',
            text: 'Data blogpost berhasil dibuat',
            showConfirmButton: true,
            timer: 1500
          });
        
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
          } 
        }
    };

    // membuat data blogpost 
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
    
          onClose();
    
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
      const DeletePosts = async (id) => {
        if (user && user.role === 'admin') {
            try {
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(res.data);
                // Optionally, you can add code here to update the UI after successful deletion
            } catch (error) {
                console.error('Error:', error.response);  // Log error lengkap dari response
                Swal.fire({
                    icon: 'error',
                    title: 'Error deleting post',
                    text: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Anda tidak memiliki akses',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
      const handleSort = (order) => {
        setSortOrder(order);
        const sortedData = [...jualData].sort((a, b) => {
          if (order === 'asc') {
            return new Date(a.created_at) - new Date(b.created_at);
          } else {
            return new Date(b.created_at) - new Date(a.created_at);
          }
        });
        setJualData(sortedData);
      };
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setJual({ ...jual, [name]: value });
      };
  
      const handleFileChange = (event) => {
          setJual({ ...jual, image: event.target.files[0] });
      };
  
      const handleSelectChange = (event) => {
        setJual({ ...jual, category: event.target.value });
    };
    console.log('data jualnya: ',jualData);
    React.useEffect(() => {
        getForumData();
      }, [])
  return (
    <>
        <main>
            <h3 className="text-emerald-600">Community</h3>
            <div className="container-filter d-flex justify-center">
                <div className="card mt-3 w-[800px] "> 
                <div className="justify-around mt-2 card-body d-flex"> 
                      <Popover className="gap-3 cursor-pointer d-flex">
                        <PopoverTrigger className="gap-3 d-flex">
                          <i class="bi bi-filter text-black text-xl"></i>
                          <p className="text-lg text-black">Filter</p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div onClick={() => handleSort('asc')}>
                            <p className="text-lg text-black">Sorting dari yang terbaru</p>
                          </div>
                          <div onClick={() => handleSort('desc')}>
                            <p className="text-lg text-black">Sorting dari yang terlama</p>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Divider orientation="vertical" color="black"/>
                      <div className="gap-3 cursor-pointer d-flex" onClick={onOpen}>
                        <i class="bi bi-clipboard-plus text-xl text-black"></i>
                        <p className="text-lg text-black">Buat Post</p>
                      </div>  
                      
                      <Divider orientation="vertical" color="black"/>
                      <div className="gap-3 cursor-pointer d-flex" onClick={() => window.location.href = '/peternak/komunitas/forum'}>
                        <i class="bi bi-question-circle text-black text-xl"></i>
                        <p className="text-lg text-black">Tanyakan</p>
                      </div>

                      <Divider orientation="vertical"/>
                      <div className="gap-3 cursor-pointer d-flex" onClick={() => window.location.href = '/peternak/komunitas/jual'}>
                        <i class="bi bi-currency-exchange  text-black text-xl"></i>
                        <p className="text-lg text-black">Jual</p>
                      </div>
                  </div>
                </div>
            </div>

            <div className="d-flex justify-center">
            <div className="grid grid-cols-1 container-post">
                    {jualData?.map((post, index) => (
                        <div key={index} className="card mt-3 w-[800px] grid grid-cols-1 gap-6">
                            <div className="card-body">
                              <div className="settings post float-end">
                                <Popover size="sm">
                                  <PopoverTrigger>
                                    <i class="bi bi-three-dots-vertical"></i>
                                  </PopoverTrigger>
                                  <PopoverContent >
                                    <div className="d-flex gap-3 cursor-pointer">
                                      <div id="deletePost" onClick={DeletePosts}> 
                                        <i class="bi bi-trash-fill text-md"></i>
                                        <p className="text-black text-md">Hapus</p>  
                                      </div>
                                      
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="justify-start gap-2 container-post-profile d-flex">
                                {/* <img src={post.image} alt="profile" className="w-[50px] h-[50px] rounded rounded-pill border" /> */}
                                <img src={post.user.full_avatar_url || 'https://th.bing.com/th/id/OIP.YO6Vmx1wQhZoCc2U9N6GYgHaE8?rs=1&pid=ImgDetMain'} alt="profile" className="w-[50px] h-[50px] rounded-pill"/>
                                <div className="mt-1">
                                  <h6 className="font-bold text-black">{post.user.name}</h6>
                                    <p className="text-xs">{post.published_at}</p>
                                </div>
                              </div>
                                <div className="mt-3 container-post-content">
                                    <h4 className="font-bold text-black">{post.title}</h4>
                                    <p className="text-black">
                                        {post.content}
                                    </p>
                                    {/* <img src={post.image} alt="post" className="w-[100%] max-h-[400px] border" /> */}
                                    <img src={post.full_image_url || 'https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Image-icon.png'} alt="post" className="w-[30rem]"/>
                                </div>
                                <div className="gap-4 mt-3 container-post-action d-flex">
                                    <div className="gap-2 Likes-count d-flex text-md">
                                        <i class="bi bi-heart-fill text-red-600"></i>
                                        <p className="text-black">{post.likes_count}</p>
                                    </div>
                                    <div className="gap-2 Likes-count d-flex text-md ">
                                        <i class="bi bi-chat-dots-fill text-emerald-500"></i>
                                        <p className="text-black">{post.comments_count}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </main>
        {/* Modals */}
        {/* MODALS  */}
          <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                placement="center"
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-black bg-opacity-50"
                }}
            >
                <ModalContent className="w-[600px] bg-white rounded-xl ">
                    {(onClose) => (
                        <>
                            <ModalHeader className="dialog-title flex flex-col gap-1 px-6 mt-6">
                                <h3 className="text-black font-bold text-center">Create Post</h3>
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={createJual}>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="title" className="text-black font-bold">
                                                <h6>
                                                    Title<span className="text-red-600">*</span>
                                                </h6>
                                            </label>
                                            <Input
                                                isRequired
                                                value={jual.title}
                                                id="title"
                                                name="title"
                                                autoFocus
                                                type="text"
                                                placeholder="Input your jual title"
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="content" className="text-black font-bold">
                                                <h6>
                                                    Caption<span className="text-red-600">*</span>
                                                </h6>
                                            </label>
                                            <Input
                                                isRequired
                                                value={jual.content}
                                                id="content"
                                                name="content"
                                                autoFocus
                                                type="text"
                                                placeholder="Input your jual caption"
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="category" className="text-black font-bold">
                                                <h6>
                                                    Category<span className="text-red-600">*</span>
                                                </h6>
                                            </label>
                                            <Select
                                                id="category"
                                                name="category"
                                                value={jual.category}
                                                variant="bordered"
                                                placeholder="Select a category"
                                                className="w-full h-[2.8rem]"
                                                onChange={handleSelectChange}
                                            >
                                                {categories.map((category) => (
                                                    <SelectItem className="bg-white w-full" key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="image" className="text-black font-bold">
                                                <h6>
                                                    Image
                                                </h6>
                                            </label>
                                            <Input
                                                id="image"
                                                name="image"
                                                autoFocus
                                                type="file"
                                                
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                    <ModalFooter>
                                        <Button type="submit" className="bg-emerald-600 text-md">
                                            Submit
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
    </>
  )
}