'use client'
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
import { Barn, Cow, Lasso, User } from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";


import Chart from 'chart.js/auto';
import Link from "next/link";
import Head from "next/head";

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

  const doughnutCanvas = useRef();
  const barCanvas = useRef();
  const [chartData, setChartData] = useState([])
  const [contractData, setContractData] = useState([])
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
  const getContract = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/contract`, {
        headers: {
          'content-type': 'text/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      console.log(res.data.data);
      setContractData(res.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
          title: 'error terjadi',
          text: 'mohon coba lagi nanti.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
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
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/users")
      if(!response.ok){
        console.error("Bad Response")
      }
      const data = await response.json()
      // console.log(data)
      const firstTen = data.users.splice(0,10);
      setChartData(firstTen);
    };
    fetchData()
    
  }, [])

  useEffect(() => {
    getContract();
    getCattleData();
    let doughnutChart = Chart.getChart('myChart');
    if (doughnutChart !== undefined) {
      doughnutChart.destroy();
    }

    let barChart = Chart.getChart('dChart');
    if (barChart !== undefined) {
      barChart.destroy();
    }
    const sickCattle = cattleData.filter(cattle => cattle.status === 'sakit');
    const soldCattle = cattleData.filter(cattle => cattle.status === 'dijual');
    const deathCattle = cattleData.filter(cattle => cattle.status === 'mati');
    const sehatCattle = cattleData.filter(cattle => cattle.status === 'sehat');
    
    const label = chartData.map((items) => items.firstName)
    const data = chartData.map((items) => items.weight)
  
    new Chart(doughnutCanvas.current, {
      type: 'doughnut',
      data: {
        labels:  ['Sehat', 'Sakit', 'Mati'],
        datasets: [
          {
            label: 'Dataset Sapi',
            data: [sehatCattle.length, sickCattle.length, deathCattle.length],
            backgroundColor: [
              'rgba(32, 165, 119, 1)',
              'rgba(250, 204, 21, 1)',
              'rgba(189, 25, 25, 1)',
            ],
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        },
      },
    });

    // const labels =  Array.from({ length: 9 }, (_, i) =>
    //   new Date(0, i).toLocaleString('default', { month: 'long' })
    // );
    

    new Chart(barCanvas.current, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Data Penjualan Sapi',
            data: data,
            backgroundColor: [
              'rgba(32, 165, 119, 1)',
            ],
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
        },
        scales:{
          x:{
            grid:{
              drawOnChartArea: false,
              beginAtZero: true
            }
          },
          y:{
            grid:{
              drawOnChartArea: false,
              beginAtZero: true
            }
          }
        },
      },
    });
  }, [chartData]);
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

          
      <div className="row">
        <div className="mb-3 col-md-8">
          <div className="card">
            <div className="justify-center card-body">
              <div className="justify-center">
                <h5 className="mb-4">Data Penjualan Sapi</h5><hr></hr>
                  <div className="container-bar">
                    <canvas ref={barCanvas} id="dChart"></canvas>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="justify-center">
                <h5 className="mb-4">Data Sapi</h5><hr></hr>
                  <div className="container">
                    <canvas ref={doughnutCanvas} id="myChart"></canvas>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}




