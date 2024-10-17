/* eslint-disable @next/next/no-sync-scripts */
'use client';

import { useAuth } from "@/lib/hooks/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input"

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

                <form onSubmit={submitHandler} action="" className="mt-10 space-y-2">

                    <Input type="text"
                        className="input input-bordered w-full " onChange={(event) => setEmail(event.target.value)}
                        placeholder="Masukan Username Anda" />
                    <Input type="password"
                        className="input input-bordered w-full " onChange={(event) => setPassword(event.target.value)}
                        placeholder="Masukkan Password Anda" />
                    <br />
                    <button
                        type="submit"
                        className="w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Login
                    </button>
                    <div className="divider text-red-200">atau</div>
                    <div className="text-center">
                        Belum punya akun?{" "}
                        <Link href="/auth/register" className="text-red-600">
                            Daftar Sekarang!
                        </Link>
                        {" "}Atau kembali sebagai <Link href="/home" className="text-red-600">
                            Tamu
                        </Link>
                    </div>
                </form>
            </main>
        </>
    );
}