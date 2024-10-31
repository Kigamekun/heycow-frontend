'use client'

import * as React from 'react';
import { useAuth } from '@/lib/hooks/auth';
import Image from 'next/image';

// kita buat function fetching api

export default function Profile() {
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin  '})
    const [avatar, setAvatar] = React.useState('');
    React.useEffect(() => {
        if (user && user.avatar) {
          // Asumsikan user.avatar berisi URL avatar
          const avatarUrl = user.avatar.startsWith('http') || user.avatar.startsWith('/') 
        ? user.avatar 
        : `${process.env.NEXT_PUBLIC_BACKEND_HOST}/${user.avatar}`;
      console.log('Avatar URL:', avatarUrl); // Debugging URL avatar
      setAvatar(avatarUrl);
        //   setAvatar(user.avatar);
    //     const avatarUrl = user.avatar.startsWith('http') ? user.avatar : `/${user.avatar}`;
    //   setAvatar(avatarUrl);
        }
      }, [user]);

    return(
        // <main>
        //     <div className='edit-profile-card d-flex justify-center'>
        //         <div className='card w-[650px]'>
        //             <div className='card-body mb-[-1.5rem] '>
        //                 <button className='btn btn-success float-end'>
        //                     Edit Profile
        //                 </button>
        //                 <div>
        //                     <div className='profile-picture d-flex justify-center'>
        //                         <img src='https://i.pinimg.com/564x/98/cc/95/98cc95b8102b05de6c4eed6f67d80f0c.jpg' className='w-[100px] h-[100px] rounded rounded-pill align-middle ml-[7rem]'/>
        //                     </div>
        //                     <h5 className='mt-3 text-black font-bold text-center'>Mulyono</h5>
        //                 </div>
        //             </div>
        //             <div className='profile-data card-body  px-5'>
        //                 <div className='grid grid-cols-2 gap-3'>
        //                     <div>
        //                         <p className='text-md mb-[-0.2rem] text-black font-bold'>
        //                             No. Telp
        //                         </p>
        //                         <div className='border rounded-md h-[3rem] py-2 px-1'>
        //                                 <p className='text-md text-black font-light'>
        //                                     081282520510
        //                                 </p>
        //                         </div>
        //                     </div>

        //                     <div>
        //                         <p className='text-md mb-[-0.2rem] text-black font-bold'>
        //                             Email
        //                         </p>
        //                         <div className='border rounded-md h-[3rem] py-2 px-1'>
        //                                 <p className='text-md text-black font-light'>
        //                                     mulyono25@gmail.com
        //                                 </p>
        //                         </div>
        //                     </div>

        //                     <div>
        //                         <p className='text-md mb-[-0.2rem] text-black font-bold'>
        //                             Role
        //                         </p>
        //                         <div className='border rounded-md bg-gray-300 h-[3rem] py-2 px-1'>
        //                                 <p className='text-md text-black font-light'>
        //                                     Peternak
        //                                 </p>
        //                         </div>
        //                     </div>

        //                     <div>
        //                         <p className='text-md mb-[-0.2rem] text-black font-bold'>
        //                             Farm
        //                         </p>
        //                         <div className='border rounded-md h-[3rem] py-2 px-1'>
        //                             <p className='text-md text-black font-light'>
        //                                 Mulyono Farm
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className='mt-3'>
        //                     <p className='text-md mb-[-0.2rem] text-black font-bold'>
        //                         Bio Profile
        //                     </p>
        //                     <div className='border rounded-md py-2 px-1'>
        //                         <p className='text-md text-black font-light'>
        //                             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        //                         </p>
        //                     </div>
        //                  </div> 
        //             </div>
                    
        //         </div>
        //     </div>
            
        // </main>
        <main>
            <div className='edit-profile-card d-flex justify-center'>
                <div className='card w-[650px]'>
                    <div className='card-body mb-[-1.5rem] '>
                        <button className='btn btn-success float-end '>
                            <i className='bi mr-3 text-white bi-pencil-fill'/> 
                            Edit Profile
                        </button>
                        <div>
                            <div className='profile-picture d-flex justify-center'>
                                {avatar ? (
                                    <Image src={avatar} 
                                    width={250}
                                    height={50}
                                    className='w-[100px] h-[100px] rounded rounded-pill align-middle ml-[7rem]' />
                                    ) : (
                                    <div className='w-[100px] h-[100px] rounded rounded-pill align-middle ml-[7rem] bg-gray-200'></div>
                                )}
                                
                            </div>
                            <h5 className='mt-3 text-black font-bold text-center'>{user ? user.name : "mulyono"}</h5>
                        </div>
                    </div>
                    <div className='profile-data card-body  px-5'>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    No. Telp
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user ? user.phone_number : "081282520510"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Email
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user? user.email : "mulyono25@gmail.com"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Role
                                </p>
                                <div className='border rounded-md bg-gray-300 h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user ? user.role : 'user'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Farm
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user ? user.farm : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                Bio Profile
                            </p>
                            <div className='border rounded-md py-2 px-1'>
                                <p className='text-md text-black font-light'>
                                    {user ? user.bio : '-'}
                                </p>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </main>
    );
}