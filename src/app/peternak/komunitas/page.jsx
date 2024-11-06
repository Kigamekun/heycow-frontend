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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function Page() {
    const{user, middleware} = useAuth(['cattleman', 'admin'])
    const [blogPostsData, setBlogPostsData] = React.useState(
        []
    );

    const [userData, setUserData] = React.useState(
        []
    )

    const [blogPosts, setBlogPost] = React.useState({
        id: 0,
        title: '',
        contet: '',
        categpry: '',
        full_image_url : ''
    });
    // const fetchImage = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertBase64(file);
    //     setBlogPost({ ...blogPosts, image: base64 });
    // }
    const getUserData = async () => {
        try { 
            

            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`,
                {headers :{
                    'Content-Type' : 'text/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }}
            )
            if(res.data.data) {
                setUserData(res.data.data.data);
                console.log('ada datanya');
                console.log(res.data.data.data)
            }
            
        } catch (error) {
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

    const getBlogPostsData = async () => {
        try { 
            

            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts`,
                {headers :{
                    'Content-Type' : 'text/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }}
            )
            if(res.data.data) {
                setBlogPostsData(res.data.data.data);
                console.log('ada datanya');
                console.log(res.data.data.data)
            }
            
        } catch (error) {
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
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (order) => {
      setSortOrder(order);
      const sortedData = [...blogPostsData].sort((a, b) => {
        if (order === 'asc') {
          return new Date(a.created_at) - new Date(b.created_at);
        } else {
          return new Date(b.created_at) - new Date(a.created_at);
        }
      });
      setBlogPostsData(sortedData);
    };
    const createBlog = async (e) => {
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
        bodyFormData.append('title', blogPosts.title);
        bodyFormData.append('content', blogPosts.content);
        bodyFormData.append('image', blogPosts.image);
        bodyFormData.append('category', blogPosts.category);
        
    
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
          getBlogPostsData();
    
          // Reset form fields
          setBlogPost({
            id: 0,
            title: '',
            contet: '',
            categpry: '',
            image : ''
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
    const getCattleData = async () => {

  
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`, {
            headers: {
              'content-type': 'text/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
          });
      
          if (res.data.data) {
            setCattleData(res.data.data.data);
            console.log('Ada datanya');
            console.log(res.data.data.data);
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
    console.log(blogPostsData);
    React.useEffect(() => {
        getBlogPostsData(),
        getUserData()
      }, [])
    
    return (
        <>
        <main>
            <h3 className="text-emerald-600">Community</h3>
            
            <div className="container-filter d-flex justify-center">
                <div className="card mt-3 w-[800px] "> 
                    <div className="card-body d-flex justify-between"> 
                      <Popover className="d-flex gap-3 cursor-pointer">
                        <PopoverTrigger className="d-flex gap-3">
                          <i class="bi bi-filter text-black text-xl"></i>
                          <p className="text-black text-lg">Filter</p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div onClick={() => handleSort('asc')}>
                            <p className="text-black text-lg">Sorting dari yang terbaru</p>
                          </div>
                          <div onClick={() => handleSort('desc')}>
                            <p className="text-black text-lg">Sorting dari yang terlama</p>
                          </div>
                          {/* <div className="d-flex gap-3 cursor-pointer" onClick={() => window.location.href = '/peternak/komunitas/forum'}>
                            <i class="bi bi-question-circle text-black text-xl"></i>
                            <p className="text-black text-lg">Sorting dari yang terbaru</p>  
                          </div> */}
                        </PopoverContent>
                      </Popover>
                        {/* <div className="d-flex gap-3 cursor-pointer">
                          <Popover className="d-flex gap-3 cursor-pointer">
                            
                          </Popover>
                            <i class="bi bi-filter text-black text-xl"></i>
                            <p className="text-black text-lg">Filter</p>
                        </div> */}
                      <Divider orientation="vertical" color="black"/>
                      <div className="d-flex gap-3 cursor-pointer" onClick={() => window.location.href = '/peternak/komunitas/forum'}>
                        <i class="bi bi-question-circle text-black text-xl"></i>
                        <p className="text-black text-lg">Tanyakan</p>
                      </div>
                      <Divider orientation="vertical"/>
                      <div className="d-flex gap-3 cursor-pointer" onClick={() => window.location.href = '/peternak/komunitas/jual'}>
                        <i class="bi bi-currency-exchange  text-black text-xl"></i>
                        <p className="text-black text-lg">Jual</p>
                      </div>
                  </div>
                </div>
            </div>

            <div className="d-flex justify-center">
                
                <div className="container-post grid grid-cols-1">
                    {blogPostsData?.map((post, index) => (
                        <div key={index} className="card mt-3 w-[800px] grid grid-cols-1 gap-6">
                            <div className="card-body">
                                <div className="container-post-profile d-flex justify-start gap-2">
                                    {/* <img src={post.image} alt="profile" className="w-[50px] h-[50px] rounded rounded-pill border" /> */}
                                    <Avatar src={post.user.avatar} alt="profile" />
                                    <div className="mt-1">
                                        <h6 className="text-black font-bold">{post.user.name}</h6>
                                        <p className="text-xs">{post.created_at}</p>
                                    </div>
                                </div>
                                <div className="container-post-content mt-3">
                                    <h4 className="text-black font-bold">{post.title}</h4>
                                    <p className="text-black">
                                        {post.content}
                                    </p>
                                    {/* <img src={post.image} alt="post" className="w-[100%] max-h-[400px] border" /> */}
                                    <Image src={post.full_image_url} alt="post" width={300} height={300} />
                                </div>
                                <div className="container-post-action d-flex gap-4 mt-3">
                                    <div className="Likes-count d-flex gap-2 text-md">
                                        <i class="bi bi-heart-fill text-red-600"></i>
                                        <p className="text-black">{post.likes_count}</p>
                                    </div>
                                    <div className="Likes-count d-flex gap-2 text-md ">
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
        
        </>
    );
}