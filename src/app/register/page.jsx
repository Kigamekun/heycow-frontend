/* eslint-disable @next/next/no-sync-scripts */
'use client';

import Image from "next/image";
import heycow from '@/images/hey_cow.svg'
import { useAuth } from "@/lib/hooks/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

export default function Page() {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/home',
    })
    const submitHandler = async (event) => {
        event.preventDefault();
        register({
            name,
            email,
            address,
            password,
            confirmPassword,
            setErrors,
            setStatus,
        });
    };

    return (
        <>
            <main className="my-0 mx-auto min-h-full max-w-screen-sm">
                <div className="d-flex justify-center my-5">
                <Image
                    src={heycow}
                    alt="Descriptive Alt Text"
                    width={150}
                    height={50}
                />
                </div>
                <div className="card w-[650px] shadow-xl p-6">
                    <div className="p-3 text-center">
                        <h1 className="card-title text-black">Create an Account</h1>
                        <p>Welcome Future Farmer, enjoy our app!</p>
                    </div>
                    
                    <div className="card-body mx-4">
                        <form onSubmit={submitHandler} action="" className="space-y-6">
                            <div>
                                <label htmlFor="name"><h5>Username<span className="text-red-500">*</span></h5></label>
                                <Input type="text" id="name"
                                className="input input-bordered w-full h-[50px]" onChange={(event) => setName(event.target.value)}
                                placeholder="Masukkan Nama Anda" />
                            </div>
                            
                            <div>
                                <label htmlFor="email"><h5>Email<span className="text-red-500">*</span></h5></label>       
                                <Input type="text" 
                                    id="email"
                                    className="input input-bordered w-full h-[50px] " onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Masukan Email Anda" 
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="address"><h5>Address<span className="text-red-500"></span></h5></label>
                                <Input type="text" id="address"
                                className="input input-bordered w-full h-[50px]" onChange={(event) => setAddress(event.target.value)}
                                placeholder="Masukkan Alamat Anda" />
                            </div>

                            <div>
                                <label htmlFor="password"><h5>Password<span className="text-red-500">*</span></h5></label>
                                <Input type="password" id="password"
                                className="input input-bordered w-full h-[50px]" onChange={(event) => setPassword(event.target.value)}
                                placeholder="Masukkan Password Anda" />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword"><h5>Confirm Your Password<span className="text-red-500">*</span></h5></label>
                                <Input type="password" id="confirmPassword"
                                className="input input-bordered w-full h-[50px]" onChange={(event) => setConfirmPassword(event.target.value)}
                                placeholder="Konfirmasi Password Anda" />
                            </div>

                            <br />
                            <button type="submit" className="bg-[#20A577] rounded-xl font-bold text-xl text-white h-[3rem] w-full">
                                Register
                            </button>
                            <div className="text-center">
                               <p className="font-bold text-lg"> Sudah punya akun?{" "}</p>
                                <p className="font-bold text-lg">
                                    <Link href="/login" className="text-[#20A577]">
                                        Sign in!
                                    </Link>
                                    {" "}Atau kembali sebagai <Link href="/" className="text-[#20A577]">
                                        Tamu
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                
                </div>
            </main>
        </>
    );
}