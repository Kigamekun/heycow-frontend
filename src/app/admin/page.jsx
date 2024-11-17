'use client'
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
import { Barn, Cow, Lasso, User } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useState } from "react";
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

  const [cattle, setCattle] = useState({
    id: 0,
    name: "",
    user_id: "",
    farm: "",
    breed_id: "",
    type: "",
    status: "",
    birth_date: "",
    birth_weight: "",
    birth_height: "",
    iot_device_id: "",
    last_vaccination: ""
  });


  const [IotDeviceData, setIotDeviceData] = useState(
    []
  );

  const [farmData, setFarmData] = useState([]);

  const [userData, setuserData] = useState([]);

  const [cattleData, setCattleData] = useState([]); // Store cattle data
  const [cattleCount, setCattleCount] = useState([]);
  const [iotCount, setIotCount] = useState([]);
  const [farmCount, setFarmCount] = useState([]);
  const [userCount, setUserCount] = useState([]);


  const getUserData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data?.data != undefined) {
          setuserData(response.data.data);
          setUserCount(response.data.data.length);
          console.log(response.data.data);
        }
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })

          logout()

        } else {
          Swal.fire({
            icon: 'error',
            title: 'error terjadi',
            text: 'mohon coba lagi nanti.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  const getFarmData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data?.data != undefined) {
          setFarmData(response.data.data.data);
          setFarmCount(response.data.data.data.length);
          console.log(response.data.data.data);
        }
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })

          logout()

        } else {
          Swal.fire({
            icon: 'error',
            title: 'error terjadi',
            text: 'mohon coba lagi nanti.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  // mengambil Iot Data
  const getIotDeviceData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data?.data != undefined) {
          setIotDeviceData(response.data.data);
          setIotCount(response.data.data.length);
          console.log(response.data.data);
        }
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })

          logout()

        } else {
          Swal.fire({
            icon: 'error',
            title: 'error terjadi',
            text: 'mohon coba lagi nanti.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  // mengambil semua cattle Data
  const getCattleData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.data?.data) {
        setCattleData(response.data.data); // Save cattle data
        setCattleCount(response.data.data.length); // Save the count of cattle
      }
    } catch (error) {
      if (error.response?.status === 401) {
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
          title: 'Error occurred',
          text: 'Please try again later.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getCattleData();
    getFarmData();
    getIotDeviceData();
    getUserData();
  }, []);

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
                    <p className="font-bold text-black">{cattleCount}</p>
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
                    <p className="font-bold text-black">{iotCount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="border border-success card">
                <div className="gap-10 float-start card-body d-flex">
                  <Barn size={50} className=" text-emerald-500 text-[3rem]" />
                  <div className="flex-col d-flex ">
                    <h6 className="font-bold text-emerald-600">Jumlah Farm</h6>
                    <p className="font-bold text-black">{farmCount}</p>
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
                    <p className="font-bold text-blacks">{userCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}




