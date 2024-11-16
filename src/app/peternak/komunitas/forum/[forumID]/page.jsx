'use client'
import * as react from 'react';
import axios from "axios";
import { useState } from "react";
import { useAuth } from '@/lib/hooks/auth';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import Swal from 'sweetalert2';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
export default function Page({params}) {
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' });

    const [forumDetail, setForumDetail] = useState([]); // State to store the jual detail
    const [cattle, setCattleData] =useState([]);
    const [my, myData] = useState([]);
    const [comments, setComments] = useState({
        content: ''
    })
    const getMe = async () => {
        console.log('fetching my data..')
        try{
            var response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/me`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
                
            })
            console.log('dataku' ,response.data)
            if(response.data){
                myData(response.data);
            }
        }catch(error){
            console.error('Error fetching my data:', error);
        }
    }

    const getForumDetail = async () => {
        try{
            var response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${params.forumID}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            console.log('Jual detail:', response.data.data);
            if(response.data.data){
                setForumDetail(response.data.data);
            }
        }catch(error){
            console.error('Error fetching jual detail:', error);

        }
    }
    
    // console.log('comment' , forumDetail.comments);
    const DeletePosts = async (id) => {
    if (user && (user.role === 'admin' || (forumDetail.user && forumDetail.user.id === user.id))) {
        try {
          const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log(res.data);
          // Optionally, you can add code here to update the UI after successful deletion
          Swal.fire({
            icon: 'success',
            title: 'Post deleted successfully',
            showConfirmButton: false,
            timer: 1500
          });
          getForumDetail(); // Refresh forum details after deletion
        } catch (error) {
          console.error('Error:', error.response);  // Log error lengkap dari response
          Swal.fire({
            icon: 'error',
            title: 'Anda tidak memiliki akses',
            text: error.response.data.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
    } };
   
    const createComment = async (e) => {
        e.preventDefault();
    
        const bodyFormData = new FormData();
        bodyFormData.append('content', comments.content);
    
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${params.forumID}/comments`,
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
            getForumDetail();
          // Reset form fields
          setComments({
            id: 0,
            content: '',
          })
    
          setOpen(false);
    
          Swal.fire({
            icon: 'success',
            title: 'BlogPost berhasil dibuat',
            text: 'Data blogpost berhasil dibuat',
            showConfirmButton: true,
            timer: 1500
          });
        
        } catch (error) {
        //   console.error('Error:', error.response);  // Log error lengkap dari response
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
    const handleInputChange = (e) => {
        setComments({ ...comments, content: e.target.value });
    };
    
    react.useEffect(() => {
        getMe();
        getForumDetail();
    }, [params.jualID]);
    return (
        <>
            <main className="grid-cols-1">
                <div className="d-flex justify-center">
                    <div className="card w-[45rem] grid grid-cols-1">
                        <div className="card-body">
                            <div className="settings post float-end">
                                <Popover size="sm">
                                    <PopoverTrigger>
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="d-flex gap-3 cursor-pointer">
                                            <div id="deletePost" onClick={DeletePosts}>
                                                <i className="bi bi-trash-fill text-md"></i>
                                                <p className="text-black text-md">Hapus</p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="profile-users  d-flex gap-3">
                                <img
                                    src={
                                        (forumDetail.user && forumDetail.user.full_avatar_url) ||
                                        'https://th.bing.com/th/id/OIP.YO6Vmx1wQhZoCc2U9N6GYgHaE8?rs=1&pid=ImgDetMain'
                                    }
                                    alt="profile"
                                    className="w-[50px] h-[50px] rounded-pill"
                                />
                                <div className="user-detail gap-0">
                                    <h5 className="font-bold text-black">
                                        {forumDetail.user && forumDetail.user.name}
                                    </h5>
                                    <p className="text-xs">
                                        {forumDetail && forumDetail.published_at}
                                    </p>
                                </div>
                            </div>

                            {/* main section */}
                            <div className="title-content mt-3 ">
                                <h4 className="font-bold text-black">
                                    {forumDetail && forumDetail.title}
                                </h4>
                                <p className="text-black">
                                    {forumDetail && forumDetail.content}
                                </p>
                                <div className="d-flex justify-center">
                                    <img src={forumDetail && forumDetail.full_image_url || 'https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Image-icon.png'} alt="post" className="w-[45rem]"/>
                                </div>
                            </div>
                            <div className="detail-cattle mt-3">
                                <div className="gap-4 mt-3 container-post-action d-flex">
                                    <div className="gap-2 Likes-count d-flex text-md">
                                        <i class="bi bi-heart-fill text-red-600"></i>
                                        <p className="text-black">{forumDetail.likes_count}</p>
                                    </div>
                                    <div className="gap-2 Likes-count d-flex text-md ">
                                        <i class="bi bi-chat-dots-fill text-emerald-500"></i>
                                        <p className="text-black">{forumDetail.comments_count}</p>
                                    </div>
                                </div>
                            </div>

                            {/* comment section */}
                            <div className="form-dan-comment mt-5 mb-3 ">
                            
                                <form onSubmit={createComment} className="bg-slate-100 p-3 rounded-xl">
                                <div className="d-flex gap-2">
                                    <img
                                    src={
                                        user && user.avatar ||
                                        'https://th.bing.com/th/id/OIP.YO6Vmx1wQhZoCc2U9N6GYgHaE8?rs=1&pid=ImgDetMain'
                                    }
                                    alt="profile"
                                    className="w-[55px] h-[55px] rounded-pill"
                                    />
                                    <Input
                                    className="bg-slate-50 rounded-pill px-4"
                                    value={comments.content}
                                    placeholder="Beri komentar!"
                                    onChange={handleInputChange}
                                    endContent={
                                        <i className="bi bi-send text-2xl cursor-pointer" type="submit" onClick={createComment}></i>
                                    }
                                    />
                                </div>
                                </form>
                               
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-center">
                    <div className="card w-[45rem] ">
                        <div className="card-body">
                        {forumDetail.comments && forumDetail.comments.length > 0 ? (
                                    forumDetail.comments.map((comment, index) => (
                                        <div key={index} className="comment">
                                            <p>{comment.content}</p>
                                        </div>
                                        ))
                                    ) : (
                                    <div className="no-comments">
                                        <p>No comments available.</p>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                
            </main>
        </>
    );
}