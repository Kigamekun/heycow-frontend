'use client';

import { useAuth } from "@/lib/hooks/auth"; // Hook for authentication
import { Cow, Scroll, Toolbox, User } from "@phosphor-icons/react";
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const { user, logout } = useAuth({ middleware: 'admin' });
  const doughnutCanvas = useRef();
  const barCanvas = useRef();
  const [chartData, setChartData] = useState([])
  const [doughnutData, setdoughnutData] = useState([0])

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
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
          console.error("Bad Response");
          return;
        }
        const data = await response.json();
        const countData = data.users.length; // Get the count of users
        setdoughnutData(countData); // Set the count to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
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
                  <Cow className="text-emerald-600" size={50} />
                    <div className="flex-col d-flex ">
                      <h6 className="text-emerald-600">Sapi</h6>
                      <p>15</p>
                    </div>
                </div>
              </div>
            </div>
          <div className="col-sm-3">
            <div className="border border-success card">
              <div className="gap-10 float-start card-body d-flex">
              <Scroll className="text-emerald-600" size={50} />
                  <div className="flex-col d-flex ">
                    <h6 className="text-emerald-600">Contract</h6>
                    <p>2</p>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="border border-success card">
              <div className="gap-10 float-start card-body d-flex">
              <Toolbox className="text-emerald-600" size={50} />
                  <div className="flex-col d-flex ">
                    <h6 className="text-emerald-600">Device</h6>
                    <p>7</p>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="border border-success card">
              <div className="gap-10 float-start card-body d-flex">
              <User className="text-emerald-600" size={50} />
                  <div className="flex-col d-flex ">
                    <h6 className="text-emerald-600">Pengangon</h6>
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
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <div className="justify-left">
                <div className="row">
                  <div className="col-sm-6">
                    <h3>Cattle 1</h3>
                  </div>
                  <div className="col-sm-6">
                    <div className="float-end">
                      <span className="badge bg-success">Sehat</span>
                    </div>
                  </div>
                </div>
                <p>2324-2323-8482</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <div className="justify-left">
                <div className="row">
                  <div className="col-sm-6">
                    <h3>Cattle 1</h3>
                  </div>
                  <div className="col-sm-6">
                    <div className="float-end">
                      <span className="badge bg-warning">Dijual</span>
                    </div>
                  </div>
                </div>
                <p>8324-3784-5385</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <div className="justify-left">
                <div className="row">
                  <div className="col-sm-6">
                    <h3>Cattle 3</h3>
                  </div>
                  <div className="col-sm-6">
                    <div className="float-end">
                      <span className="badge bg-danger">Sakit</span>
                    </div>
                  </div>
                </div>
                <p>4778-2284-8482</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}