'use client'

// import { Button } from "@/components/ui/button"
import * as React from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"


import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Cow } from "@phosphor-icons/react"

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Checkbox, 
} from '@nextui-org/react'


import Link from "next/link"
import { Button } from "@/components/ui/button"

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle
// } from "@/components/ui/dialog"





import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import { ArrowUpDown } from "lucide-react"
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi

import {RadioGroup, Radio} from "@nextui-org/react";
import axios from "axios"
import Swal from "sweetalert2"

import { animals } from "./dummy"
export default function Home() {
  const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin  '})
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const [searchQuery, setSearchQuery] = React.useState('')
  // State Cattle 
  const [cattleData, setCattleData] = React.useState(
    []
  );
  

  const [cattle, setCattle] = React.useState({
    id: 0,
    name: "",
    farm: "",
    breed_id: "" ,
    type : "",
    status : "",
    birth_date : "",
    birth_weight : "",
    birth_height : "",
    iot_device_id : "",
    last_vaccination : ""
  });
  // State IOT DEVICE
  const [IotDeviceData, setIotDeviceData] = React.useState(
    []
  );
  // State Breeds
  const [breedsData, setBreedsData] = React.useState(
    []
  );
  
  // State Farm
  const [farmData, setFarmData] = React.useState(
    []
  );


  
  // mengambil farm data
  const getFarmData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/farms`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setFarmData(response.data.data);
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


  // mengambil Iot Data
  const getIotDeviceData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setIotDeviceData(response.data.data.data);
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
  console.log(cattleData);
  React.useEffect(() => {
    getCattleData();
  }, []);


  // Membuat cattle data
  const createCattle = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Loading...',
      text: 'Mohon tunggu sebentar...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const bodyFormData = new FormData();
    bodyFormData.append('name', cattle.name);
    bodyFormData.append('breed_id', cattle.breed_id);
    bodyFormData.append('status', cattle.status);
    bodyFormData.append('gender', cattle.gender);
    bodyFormData.append('type', cattle.type);
    bodyFormData.append('farm', cattle.farm);
    bodyFormData.append('birth_date', cattle.birth_date);
    bodyFormData.append('birth_weight', cattle.birth_weight);
    bodyFormData.append('birth_height', cattle.birth_height);
    bodyFormData.append('iot_device_id', cattle.iot_device_id);
    bodyFormData.append('last_vaccination', cattle.last_vaccination);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      console.log(res.data) ;
      // Refresh cattle data
      getCattleData();

      // Reset form fields
      setCattle({
        id: 0,
        name: "",
        breed_id: "" ,
        gender : "",
        type : "",
        farm : "",
        status : "",
        birth_date : "",
        birth_weight : "",
        birth_height : "",
        iot_device_id : "",
        last_vaccination : ""
      });

      setOpen(false);

      Swal.close();
    } catch (error) {
      console.error('Error:', error.response);  // Log error lengkap dari response
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
        logout();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error terjadi',
          text: 'Mohon coba lagi nanti.',
          showConfirmButton: false,
          timer: 1500
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

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setCattle({ ...cattle, [name]: value });
  
  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSelectChange = (event) => {
    
    const name = event.target.name;
    const {value} = event.target.selectedOptions[0];
    console.log(value);
    setCattle({ ...cattle, [name]: value });
  
  }
  
  const filteredCattleData = cattleData.filter(cattle =>
    cattle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // const filteredUserData = userData.filter(user =>
  //   user.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  return (
    <>
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3" />
        </a>
      </header>
      <div className="card">
        <div className="card-body">
          <div className="align-items-center">
            <div className="d-flex justify-between">
              <h3 className="ml-2 text-emerald-600">Manage Cattle</h3>
              {/* <button className="btn btn-success rounded rounded-lg mr-2">Add New Cattle</button> */}
              <Button onClick={onOpen} className="bg-emerald-600 text-md rounded rounded-lg mr-2">Add New Cattle</Button>
            </div>
            
            {/* Section Modal Opened */}
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                placement="center"
                backdrop="opaque"
                classNames={{
                backdrop: "bg-black bg-opacity-50"
                }}
                >
                <ModalContent className="w-[800px] h-[650px] bg-white rounded-xl ">
                {(onClose) => (
                  <>
                  <ModalHeader className="dialog-title flex flex-col gap-1 px-6 mt-6">
                    <h3 className="text-black font-bold text-center">Add New Cattle</h3>
                  </ModalHeader>
                  <ModalBody className="grid grid-cols-2">
                    {/* Cattle Name */}
                      <div className="grid grid-cols-1 gap-1">
                        <label htmlFor="name" className="text-black font-bold">
                          <h6>
                            Cattle Name<span className="text-red-600">*</span>
                          </h6>
                        </label>
                        <Input
                          isRequired
                          id="name"
                          autoFocus
                          type="text"
                          label="text"
                          placeholder="Input your cattle name"
                          variant="bordered"
                          className="w-full h-[2.8rem] "
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Breed */}
                      <div className="grid grid-cols-1 gap-1">
                        <label htmlFor="breed" className="text-black font-bold">
                          <h6>Breed</h6>
                        </label>
                        <Select
                        id="breed"
                        variant="bordered"
                        autoFocus
                        items={animals}
                        label="Select an animal" 
                        size
                        onChange={handleSelectChange}
                        className=" w-ful">
                          {(animal) => <SelectItem className="bg-white"
                          variant="bordered">{animal.label}</SelectItem>}
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-1">
                        <label htmlFor="date" className="text-black font-bold">
                          <h6>
                            Birth Date<span className="text-red-600">*</span>
                          </h6>
                        </label>
                        <Input
                          isRequired
                          id="date"
                          autoFocus
                          type="date"
                          label="text"
                          placeholder="Input your cattle name"
                          variant="bordered"
                          className="w-full h-[2.8rem] "
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Gender Date */}
                      <div className="grid grid-cols-1 gap-1">
                        <label htmlFor="birth" className="text-black font-bold">
                          <h6>
                            Gender Date<span className="text-red-600">*</span>
                          </h6>
                        </label>
                        <div className="input-bordered w-full flex justify-start gap-3     ">
                            <label>
                                <input
                                type="radio"
                                name="gender"
                                value="jantan"
                                checked={cattle.gender === 'jantan'}
                                onChange={handleInputChange}
                                />
                                Jantan
                            </label>
                            <label>
                                <input
                                type="radio"
                                name="gender"
                                value="betina"
                                checked={cattle.gender === 'betina'}
                                onChange={handleInputChange}
                                />
                                Betina
                            </label>
                        </div>
                      </div>
                      {/* Farm */}
                      <div className="grid grid-cols-1">
                        <label htmlFor="breed" className="text-black font-bold">
                          <h6>Farm</h6>
                        </label>
                        <Select
                        id="breed"
                        variant="bordered"
                        autoFocus
                        items={animals}
                        // label="Select an animal" 
                        placeholder="Select an animal"
                        size
                        className=" w-full ">
                          {(animal) => <SelectItem className="bg-white"
                          variant="bordered">{animal.label}</SelectItem>}
                        </Select>
                      </div>
                      {/* Cattle Height */}
                      <div className="grid grid-cols-1 gap-1">
                        <label htmlFor="height" className="text-black font-bold">
                          <h6>
                            Cattle Height<span className="text-red-600">*</span>
                          </h6>
                        </label>
                        <Input
                          id="height"
                          autoFocus
                          type="text"
                          label="text"
                          placeholder="Input your cattle weight"
                          variant="bordered"
                          className="w-full h-[2.8rem] "
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Cattle Weight */}
                      <div className="grid grid-cols-1 gap-1">
                        <label htmlFor="weight" className="text-black font-bold">
                          <h6>
                            Cattle Weight<span className="text-red-600">*</span>
                          </h6>
                        </label>
                        <Input
                          id="weight"
                          autoFocus
                          type="text"
                          label="text"
                          placeholder="Input your cattle weight"
                          variant="bordered"
                          className="w-full h-[2.8rem] "
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* IoT Devices */}
                      <div className="grid grid-cols-1 gap-1">
                        <label htmlFor="iot" className="text-black font-bold">
                          <h6>IoT Device</h6>
                        </label>
                        <Select
                        id="iot"
                        variant="bordered"
                        autoFocus
                        items={animals}
                        // label="Select an animal" 
                        placeholder="Select an animal"
                        size
                        className=" w-ful">
                          {(animal) => <SelectItem className="bg-white"
                          variant="bordered">{animal.label}</SelectItem>}
                        </Select>
                      </div>
                    </ModalBody>
                    <ModalFooter>

                    <Button isSubmit className="bg-emerald-600 text-md" onPress={onClose}>
                      Submit
                    </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            <div className="d-flex grid grid-cols-4 justify-between">
              <div className="card border border-green-500 p-2 m-2">
                <div className="mt-4 mx-4 d-flex justify-between gap-10">
                  <Cow size={50} className=" text-emerald-500 text-[2rem]" />
                  <div className="d-flex flex-col ">
                    <h6 className="text-emerald-400 text-lg">Sehat</h6>
                    <p>10</p>
                  </div>

                </div>
              </div>

              <div className="card border p-2 m-2">
                <div className="mt-4 mx-4 d-flex justify-between gap-10">
                  <Cow size={50} className=" text-yellow-400 text-[3rem]" />
                  <div className="d-flex flex-col ">
                    <h6 className="text-yellow-400">Terjual</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>
             
              <div className="card border border-red-600 p-2 m-2">
                <div className="mt-4 mx-4 d-flex justify-between gap-10">
                  <Cow size={50} className=" text-red-500 text-[3rem]" />
                  <div className="d-flex flex-col ">
                    <h6 className="text-red-600">Sakit</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>

              <div className="card border border-red-700 p-2 m-2">
                <div className="mt-4 mx-4 d-flex justify-between gap-10">
                  <Cow size={50} className=" text-red-700 text-[3rem]" />
                  <div className="d-flex flex-col ">
                    <h6 className="text-red-700">Mati</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Search Bar  */}
      <div>
        <div className="card-body float-start rounded">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Cattle section */}
      {filteredCattleData.length > 0 ? (
        <div className="container grid grid-cols-3 gap-3 mt-5 cursor-pointer">
          {filteredCattleData.map((cattle) => (
            <Link key={cattle.id} href={`/peternak/cattle/${cattle.id}?user=${user && user.id}`}>
              <div className="card">
                <div className="card-body d-flex justify-between">
                  <div>
                    <h3 className="text-emerald-600 text-ellipsis">{cattle.name}</h3>
                    <p className="text-black">{cattle.iot_device.serial_number}</p>
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
      ) : (
        <div className="mt-4 text-center text-gray-500">No results found</div>
      )}
    </>
  )
}




