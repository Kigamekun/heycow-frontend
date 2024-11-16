'use client'
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
import { Barn, Cow, Lasso, User } from "@phosphor-icons/react";
import Swal from "sweetalert2";

export default function Home() {
  const { user, logout } = useAuth({ middleware: 'admin' })

  const alert = () => {
    Swal.fire({
      title: "Anda bukan admin!",
      text: "Anda tidak memiliki akses ke halaman ini!",
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#6A9944",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/peternak'; // Redirect to /peternak
      }
    });
  }
  if (user === 'cattleman') {
    alert()
  }
  // if (useAuth!== 'admin') {
  //   return <AlertPenyusup />
  // }
  // const router = useRouter();
  // if (user = useAuth({middleware: !'ad'})) {
  //   return <AlertPenyusup />
  // }
  return (
    <>
      <h3 className="mb-4 ml-2 text-emerald-600">Admin Dashboard</h3>
      <div className="mt-3 row">
            <div className="col-sm-3">
              <div className="border border-success card">
                <div className="gap-10 float-start card-body d-flex">
                  <Cow size={50} className=" text-emerald-500 text-[2rem]" />
                  <div className="flex-col d-flex ">
                    <h6 className="font-bold text-emeralds-600">Jumlah Sapi</h6>
                    <p className="font-bold text-black">15</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="border border-success card">
                <div className="gap-10 float-start card-body d-flex">
                  <Lasso size={50} className=" text-emerald-500 text-[3rem]" />
                  <div className="flex-col d-flex ">
                    <h6 className="font-bold text-emerald-600">Jumlah Device</h6>
                    <p className="font-bold text-black">10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="border border-success card">
                <div className="gap-10 float-start card-body d-flex">
                  <Barn size={50} className=" text-emerald-400 text-[3rem]" />
                  <div className="flex-col d-flex ">
                    <h6 className="font-bold text-emerald-600">Jumlah Farm</h6>
                    <p className="font-bold text-black">7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="border border-success card">
                <div className="gap-10 float-start card-body d-flex">
                  <User size={50} className=" text-emerald-500 text-[3rem]" />
                  <div className="flex-col d-flex ">
                    <h6 className="text-emerald-600">User</h6>
                    <p className="font-bold text-blackss">15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}




