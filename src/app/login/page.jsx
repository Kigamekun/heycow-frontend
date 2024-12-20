/* eslint-disable @next/next/no-sync-scripts */
'use client';

import { Input } from "@/components/ui/input";
import heycow from '@/images/hey_cow.svg';
import { useAuth } from "@/lib/hooks/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Page() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const router = useRouter();

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/home',
    })
    const submitHandler = async (event) => {
        event.preventDefault()
        login({
            email,
            password,
            setErrors,
            setStatus,
        })
    }
    return (
        <>
            <main className="max-w-screen-sm min-h-full mx-auto my-0">


                <div className="justify-center d-flex my-7">
                    <Image
                        src={heycow}
                        alt="Descriptive Alt Text"
                        width={150}
                        height={50}
                    />
                </div>
                <div className="justify-center d-flex">
                    <div className="card w-[500px] h-[500px] shadow-xl p-4">
                        <div className="p-2 text-center">
                            <h1 className="text-black card-title">Sign in</h1>
                            <p>Welcome back Future Farmer, enjoy our app!</p>
                        </div>
                        
                        <div className="mx-4 card-body">
                            <form onSubmit={submitHandler} action="" className="space-y-6">
                                <div>
                                    <label htmlFor="email"><h5>Email</h5></label>       
                                    <Input type="text" 
                                        id="email"
                                        className="input input-bordered w-full h-[50px] " onChange={(event) => setEmail(event.target.value)}
                                        
                                        placeholder="Masukan Email Anda" 
                                    
                                    />
                                </div>
                                
                            

                                <div>
                                <label htmlFor="password"><h5>Password</h5></label>
                                    <Input type="password"
                                    className="input input-bordered w-full h-[50px]" onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Masukkan Password Anda" />
                                </div>

                                <br />
                                {/* <button
                                    type="submit"
                                    className="w-[350px] h-[] justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    Login
                                </button> */}
                                <button type="submit" className="bg-[#20A577] rounded-xl font-bold text-xl text-white h-[3rem] w-full">
                                    Login
                                </button> 
                                {/* <div className="text-red-200 divider">atau</div> */}
                                <div className="text-center">
                                    <p className="text-lg font-bold"> Belum punya akun?{" "}</p>
                                    <p className="text-lg font-bold">

                                        <Link href="/register" className="text-[#20A577]">
                                            Sign Up!
                                        </Link>
                                        {" "}Atau kembali sebagai <Link href="/" className="text-[#20A577]">
                                            Tamu
                                        </Link>
                                    </p>
                                    
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
                
                
            </main>
        </>
    );
}