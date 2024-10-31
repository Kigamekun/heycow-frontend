'use client'
import * as React from "react";
import Swal from "sweetalert2";
import { useAuth } from "@/lib/hooks/auth";
import { redirect } from "next/dist/server/api-utils";

export default function AlertPenyusup() {
    const { user, logout } = useAuth({ middleware: 'admin' })

    if (user.role !== 'admin') {
        Swal.fire({
            title: "Anda bukan admin!",
            text: "Anda tidak memiliki akses ke halaman ini!",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#6A9944",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                // logout(); // Execute the logout function
                redirect('/peternak')
            }
        });
    } else {
        Swal.fire({
            title: "Anda bukan admin!",
            text: "Anda tidak memiliki akses ke halaman ini!",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#6A9944",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                logout(); // Execute the logout function
            }
        });
    }
}