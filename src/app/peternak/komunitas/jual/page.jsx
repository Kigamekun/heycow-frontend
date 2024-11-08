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

export default function JualPage() {
    const [jualData, setJualData] = React.useState([]);
    const [jual, setJual] = React.useState({
        id: 0,
        title: '',
        content: '',
        image: '',
        category: 'jual',
    });
    
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
    const createForum = async (e) => {
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
          getForumData();
    
          // Reset form fields
          setJualData({
            id: 0,
            title: '',
            contet: '',
            categpry: 'jual',
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
    console.log(jualData);
    React.useEffect(() => {
        getForumData()
      }, [])
  return (
    <>
        <main>
            <h3 className="text-emerald-600">Community</h3>
            <div className="container-filter d-flex justify-center">
                <div className="card mt-3 w-[800px] "> 
                    <div className="card-body d-flex justify-between"> 
                        <div className="d-flex gap-3 cursor-pointer">
                            <i class="bi bi-filter text-black text-xl"></i>
                            <p className="text-black text-lg">Filter</p>
                        </div>
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
                    {jualData?.map((post, index) => (
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
  )
}