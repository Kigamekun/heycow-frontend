'use client';

import { useAuth } from "@/lib/hooks/auth"; // Hook for authentication
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Home() {
  const { user, logout } = useAuth({ middleware: 'admin' });
  const [cattleData, setCattleData] = useState([]);
  const doughnutCanvas = useRef();
  const barCanvas = useRef();
  const [chartData, setChartData] = useState([])

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
    getCattleData();
    let doughnutChart = Chart.getChart('myChart');
    if (doughnutChart !== undefined) {
      doughnutChart.destroy();
    }

    let barChart = Chart.getChart('dChart');
    if (barChart !== undefined) {
      barChart.destroy();
    }

    const label = chartData.map((items) => items.firstName)
    const data = chartData.map((items) => items.weight)

    new Chart(doughnutCanvas.current, {
      type: 'doughnut',
      data: {
        labels: ['Sehat', 'Sakit', 'Mati'],
        datasets: [
          {
            label: 'Dataset Sapi',
            data: [23, 12, 4],
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

  return (
    <>
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3" />
        </a>
      </header>
      
      <h3 className="mb-4 ml-2 text-emerald-600">Home</h3>
        <div className="row">
          <div className="col-sm-3">
              <div className="border border-success card">
                <div className="gap-10 float-start card-body d-flex">
                  <i className="bi bi-emoji-laughing-fill text-emerald-600 text-[2rem]" />
                    <div className="flex-col d-flex ">
                      <h6 className="text-emerald-600">Sehat</h6>
                      <p>15</p>
                    </div>
                </div>
              </div>
            </div>
          <div className="col-sm-3">
            <div className="border border-success card">
              <div className="gap-10 float-start card-body d-flex">
                <i className="bi bi-emoji-dizzy-fill text-red-400 text-[2rem]" />
                  <div className="flex-col d-flex ">
                    <h6 className="text-red-400">Sakit</h6>
                    <p>2</p>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="border border-success card">
              <div className="gap-10 float-start card-body d-flex">
                <i className="bi bi-emoji-sunglasses-fill text-yellow-600 text-[2rem]" />
                  <div className="flex-col d-flex ">
                    <h6 className="text-yellow-600">Dijual</h6>
                    <p>7</p>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="border border-success card">
              <div className="gap-10 float-start card-body d-flex">
                <i className="bi bi-emoji-dizzy-fill text-red-800 text-[2rem]" />
                  <div className="flex-col d-flex ">
                    <h6 className="text-red-600">Mati</h6>
                    <p>15</p>
                  </div>
              </div>
            </div>
          </div>
        </div>

      <div className="row">
        <div className="col-sm-8 ">
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
        <div className="col-sm-4">
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
        <div className="container grid grid-cols-3 gap-3 mt-5 cursor-pointer">
          {cattleData && cattleData.map((cattle) => (
            <Link key={cattle.id} href={`/peternak/cattle/${cattle.id}?user=${user && user.id}`}>
              <div className="card">
                <div className="card-body d-flex justify-between">
                  <div>
                    <h3 className="text-emerald-600 text-ellipsis">{cattle && cattle.name}</h3>
                    <p className="text-black">{cattle.iot_device && cattle.iot_device.serial_number}</p>
                  </div>
                  <div>
                    <div className={`${getStatusColor(cattle.status)} rounded-md`}>
                      <p className="text-white text-sm m-2">{cattle.status}</p>
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