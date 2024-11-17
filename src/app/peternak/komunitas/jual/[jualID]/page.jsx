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
import Link from 'next/link';
export default function Page({params}) {
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' });
    const [likes, setLikes] = useState({
        
    });
    const [jualDetail, setJualDetail] = useState({
        id: 0,
        isLiked: false,
    },[]); // State to store the jual detail
    const [cattle, setCattleData] =useState([]);
    const [comments, setComments] = useState({
        content: ''
    })


    const getJualDetail = async () => {
        try{
            var response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${params.jualID}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            console.log('Jual detail:', response.data.data);
            if(response.data.data){
                setJualDetail(response.data.data);
            }
        }catch(error){
            console.error('Error fetching jual detail:', error);

        }
    }
    const getCattleData = async () => {
        console.log('fetching cattle data...');
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${jualDetail.cattle.id}`, {
            headers: {
              'content-type': 'text/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
          });
          console.log('data cattle', res.data.data);
          if (res.data.data) {
            setCattleData(res.data.data);
            console.log('Ada datanya' , res.data.data);
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
          } 
          
        }
    };
    console.log('comment' , jualDetail.comments);
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
   
    const LikePosts = async () => {
        const bodyFormData = new FormData();
        bodyFormData.append('like', 1);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${params.jualID}/likes`, bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res.data);
            setLikes(res.data);
            // Optionally, you can add code here to update the UI after successful like
        } catch (error) {
            console.error('Error:', error.response);  // Log error lengkap dari response
            Swal.fire({
                icon: 'error',
                title: 'Error liking post',
                text: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const unLikePosts = async () => {
        const bodyFormData = new FormData();
        bodyFormData.delete('like', 0);
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${params.jualID}/likes`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res.data);
            
            // Optionally, you can add code here to update the UI after successful unlike
        } catch (error) {
            console.error('Error:', error.response);  // Log error lengkap dari response
            Swal.fire({
                icon: 'error',
                title: 'Error unliking post',
                text: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const createComment = async (e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('content', comments.content);
    
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/blog-posts/${params.jualID}/comments`,
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
            getJualDetail();
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
    const handleInputChange = (e) => {
        setComments({ ...comments, content: e.target.value });
    };
    const formatPhoneNumber = (phoneNumber) => {
        if (phoneNumber && phoneNumber.startsWith('081')) {
            return '62' + phoneNumber.slice(1);
        }
        return phoneNumber;
    };
    react.useEffect(() => {
        getJualDetail();
        getCattleData();
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
                                        (jualDetail.user && jualDetail.user.full_avatar_url) ||
                                        'https://th.bing.com/th/id/OIP.YO6Vmx1wQhZoCc2U9N6GYgHaE8?rs=1&pid=ImgDetMain'
                                    }
                                    alt="profile"
                                    className="w-[50px] h-[50px] rounded-pill"
                                />
                                <div className="user-detail gap-0">
                                    <h5 className="font-bold text-black">
                                        {jualDetail.user && jualDetail.user.name}
                                    </h5>
                                    <p className="text-xs">
                                        {jualDetail && jualDetail.published_at}
                                    </p>
                                </div>
                            </div>

                            {/* main section */}
                            <div className="title-content mt-3 ">
                                <h4 className="font-bold text-black">
                                    {jualDetail && jualDetail.title}
                                </h4>
                                <p className="text-black">
                                    {jualDetail && jualDetail.content}
                                </p>
                                <div className="d-flex justify-center">
                                    <img src={jualDetail && jualDetail.full_image_url || 'https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Image-icon.png'} alt="post" className="w-[45rem]"/>
                                </div>
                            </div>
                            <div className="detail-cattle mt-3">
                                <h5>Detail Sapi</h5>
                                <div className="data-cattle">
                                    <p> Breed       : {jualDetail.cattle && jualDetail.cattle.name}</p>
                                    <p> Birth Date  : {jualDetail.cattle && jualDetail.cattle.birth_date}</p>
                                    <p> Weight      : {jualDetail.cattle && jualDetail.cattle.birth_weight} kg</p>
                                    <p> Height      : {jualDetail.cattle && jualDetail.cattle.birth_height} cm</p>
                                    <p> gender      : {jualDetail.cattle && jualDetail.cattle.gender}</p>
                                </div>
                                <div className="Harga-Button d-flex justify-between mt-[2rem]">
                                    <h3 className="text-black font-bold">Harga : {jualDetail && jualDetail.price}</h3>
                                    <Link href={`https://wa.me/`+formatPhoneNumber(jualDetail.user && jualDetail.user.phone_number)}>
                                    <Button className="bg-emerald-600 text-white text-xl rounded-lg">Beli</Button>
                                    </Link>
                                </div>
                                <div className="gap-4 mt-3 container-post-action d-flex">
                                    <div className="gap-2 Likes-count d-flex text-md">
                                        {/* <div 
                                            className="like-button" 
                                            onClick={() => {
                                                if (jualDetail.is_liked) {
                                                    unLikePosts(jualDetail.id);
                                                } else {
                                                    LikePosts(jualDetail.id);
                                                }
                                                setJualDetail({ ...jualDetail, is_liked: !jualDetail.is_liked });
                                            }}
                                        >
                                            <i className={`bi ${jualDetail.is_liked ? 'bi-heart-fill text-red-600' : 'bi-heart text-red-600'}`}></i>
                                        </div> */}
                                        <div
                                            className="like-button" 
                                            onClick={async () => {
                                                if (jualDetail.isLiked) {
                                                    await unLikePosts(jualDetail.id);
                                                } else {
                                                    await LikePosts(jualDetail.id);
                                                }
                                                getJualDetail();
                                            }}
                                        >
                                            <i className={`bi ${jualDetail.isLiked ? 'bi-heart-fill text-red-600' : 'bi-heart text-red-600'}`}></i>
                                        </div>

                                      
                                        <p className="text-black">{jualDetail.likes_count}</p>
                                    </div>
                                    <div className="gap-2 Likes-count d-flex text-md ">
                                        <i class="bi bi-chat-dots-fill text-emerald-500"></i>
                                        <p className="text-black">{jualDetail.comments_count}</p>
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
                        {jualDetail.comments && jualDetail.comments.length > 0 ? (
                                    jualDetail.comments.map((comment, index) => (
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