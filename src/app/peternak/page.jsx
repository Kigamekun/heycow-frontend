'use client';

import { useAuth } from "@/lib/hooks/auth"; // Hook for authentication
import axios from 'axios';
import Chart from 'chart.js/auto';
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Book, Cow, Lasso, PaperPlane } from "@phosphor-icons/react";
import Head from "next/head";


export default function Home() {
  const { user, logout } = useAuth({ middleware: 'admin' });
  const [cattleData, setCattleData] = useState([]);
  const doughnutCanvas = useRef();
  const barCanvas = useRef();
  const [chartData, setChartData] = useState([])
  const [contractData, setContractData] = useState([])
  // get Cattle Data
  const getCattleData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`, {
        headers: {
          'content-type': 'text/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
  
      if (res.data.data) {
        setCattleData(res.data.data);
        console.log('Ada datanya');
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
  const getStatusColor = (status) => {
    switch (status) {
      case 'sehat':
        return 'bg-emerald-600';
      case 'sakit':
        return 'bg-red-400';
      case 'dijual':
        return 'bg-yellow-400';
      case 'mati':
        return 'bg-red-800';
      default:
        return 'bg-gray-400';
    }
  };

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
  const sickCattle = cattleData.filter(cattle => cattle.status === 'sakit');
  const totalIotDevices = cattleData.filter(cattle => cattle.iot_device).length;
  const contractJumlah = contractData.length;
  
  return (
    <>
      


      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3" />
        </a>
      </header>
      
      <h3 className="mb-4 ml-2 text-emerald-600">Home</h3>
        <div className="row">
          <div className="col-sm-6 col-md-3 mb-3">
            <div className="border border-success card">
              <div className="gap-10 float-start card-body d-flex">
                <Cow className="text-emerald-600" size={50} />
                <div className="flex-col d-flex ">
                  <h6 className="text-emerald-600">Sapi</h6>
                  <p>{cattleData.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 col-sm-6 col-md-3">
            <div className="border border-success card">
              <div className="gap-10 float-start card-body d-flex">
              <Cow className="text-red-400" size={50} />
                <div className="flex-col d-flex ">
                  <h6 className="text-red-400">Sakit</h6>
                  <p>{sickCattle.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 col-sm-6 col-md-3">
            <div className="border border-success card">
              <div className="gap-10 float-start card-body d-flex">
                <Lasso className="text-yellow-600" size={50} />
                  <div className="flex-col d-flex ">
                    <h6 className="text-yellow-600">Device</h6>
                    <p>{totalIotDevices}</p>
                  </div>
              </div>
            </div>
          </div>
          <div className="mb-3 col-sm-6 col-md-3">
            <div className="border border-success card">
              <div className="gap-14 float-start card-body d-flex">
                <i className="bi bi-pass-fill text-gray-800 text-[2.5rem]" />
                  <div className="flex-col d-flex ">
                    <h6 className="text-gray-800">Total Contract</h6>
                    <p>{contractJumlah}</p>
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
      <h3 className="mb-4 ml-2 text-emerald-600">Daftar Ternak</h3>
      <div className="row">
        <div className="container grid flex-col max-w-screen-xl grid-cols-1 gap-3 mt-5 cursor-pointer sm:grid-cols-2 md:grid-cols-3">
          {cattleData && cattleData.map((cattle) => (
            <Link key={cattle.id} href={`/peternak/cattle/${cattle.id}?user=${user && user.id}`}>
              <div className="card">
                <div className="justify-between card-body d-flex">
                  <div>
                    <h3 className="text-emerald-600 text-ellipsis">{cattle && cattle.name}</h3>
                    <p className="text-black">{cattle.iot_device && cattle.iot_device.serial_number}</p>
                  </div>
                  <div>
                    <div className={`${getStatusColor(cattle.status)} rounded-md`}>
                      <p className="m-2 text-sm text-white">{cattle.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}