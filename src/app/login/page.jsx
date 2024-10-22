/* eslint-disable @next/next/no-sync-scripts */
'use client';

import { useAuth } from "@/lib/hooks/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input"

import { MailIcon } from "lucide-react";

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
            <main className="my-0 mx-auto min-h-full max-w-screen-sm">


                <div className="d-flex justify-center">
                    <Image
                        src="/path/to/your/image.jpg"
                        alt="Descriptive Alt Text"
                        width={500}
                        height={150}
                    />
                </div>
                <div className="card shadow-xl p-6">
                    <div className="p-3 text-center">
                        <h1 className="card-title text-black">Sign in</h1>
                        <p>Welcome to Future Farmer, enjoy our app!</p>
                    </div>
                    
                    <div className="card-body mx-4">
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
                            {/* <div className="divider text-red-200">atau</div> */}
                            <div className="text-center">
                               <p className="font-bold text-lg"> Belum punya akun?{" "}</p>
                                <p className="font-bold text-lg">

                                    <Link href="/register" className="text-[#20A577]">
                                        Sign Up!
                                    </Link>
                                    {" "}Atau kembali sebagai <Link href="/home" className="text-[#20A577]">
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