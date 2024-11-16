'use client'

// import { Button } from "@/components/ui/button"
// import * as from "react"


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

import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
import { Select, SelectItem } from "@nextui-org/react"

import axios from "axios"
import Swal from "sweetalert2"

import { useState, useEffect } from "react"
import { animals } from "./dummy"
export default function Home() {
  const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin  '})
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  // State Cattle 
  const [cattleData, setCattleData] = useState(
    []
  );
  
  const [statusData, setStatusData] = useState(['sehat', 'sakit', 'dijual', 'mati']);
  const [cattle, setCattle] = useState({
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
  const [IotDeviceData, setIotDeviceData] = useState(
    []
  );
  // State Breeds
  const [breedsData, setBreedsData] = useState(
    []
  );
  
  // State Farm
  const [farmData, setFarmData] = useState(
    []
  );

  const getBreedsData = async () => {
    console.log('get breeds data');
    try{
      var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/breeds`, {
        headers: {
          'content-type': 'text/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      console.log('get breeds',res.data.data);
      if (res.data.data != undefined) {
        setBreedsData(res.data.data);
      }
      
    }catch(error){
      console.log('error', error);
    }
    
  }
  
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
        console.log('get iot device',response.data.data);
        console.log('get iot device',response.data.data);
        if (response.data.data != undefined) {
          setIotDeviceData(response.data.data);
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
  useEffect(() => {
    getCattleData();
    getBreedsData();
    getIotDeviceData();
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
      },
      Swal.fire({
        title: "Success",
        text: "Cattle berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK"

      })),
      // Show success message;
     // Refresh cattle data
     getCattleData();
       onClose();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCattle({ ...cattle, [name]: value });
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
 

  const handleSelectChange1 = (value) => {
    setCattle({ ...cattle, breed_id: value });
  };

  
  const handleStatusChange = (value) => {
    setCattle({ ...cattle, status: value });
  };
  
  const handleTypeChange = (value) => {
    setCattle({ ...cattle, type: value });
  };
  const filteredCattleData = cattleData.filter(cattle =>
    cattle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sickCattle = cattleData.filter(cattle => cattle.status === 'sakit');
  const soldCattle = cattleData.filter(cattle => cattle.status === 'dijual');
  const deathCattle = cattleData.filter(cattle => cattle.status === 'mati');
  const sehatCattle = cattleData.filter(cattle => cattle.status === 'sehat');
  
  console.log('test', IotDeviceData)
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
            <div className="justify-between d-flex">
              <h3 className="ml-2 text-emerald-600">Manage Cattle</h3>
              {/* <button className="mr-2 rounded rounded-lg btn btn-success">Add New Cattle</button> */}
              <Button onClick={onOpen} className="mr-2 rounded rounded-lg bg-emerald-600 text-md">Add New Cattle</Button>
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
                <form onSubmit={createCattle}>
                  <ModalContent className="w-[800px] h-[650px] bg-white rounded-xl ">
                  {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 px-6 mt-6 dialog-title">
                      <h3 className="font-bold text-center text-black">Add New Cattle</h3>
                    </ModalHeader>
                    <ModalBody className="grid grid-cols-2">
                      
                        {/* Cattle Name */}
                        <div className="grid grid-cols-1 gap-1">
                          <label htmlFor="name" className="font-bold text-black">
                            <h6>
                              Cattle Name<span className="text-red-600">*</span>
                            </h6>
                          </label>
                          <Input
                            isRequired
                            id="name"
                            name="name"
                            autoFocus
                            value={cattle.name}
                            type="text"
                            placeholder="Input your cattle name"
                            variant="bordered"
                            className="w-full h-[2.8rem] "
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Breed */}
                        <div className="grid grid-cols-1">
                          <label htmlFor="breed" className="font-bold text-black mb-[-1rem]">
                            <h6>Breed</h6>
                          </label>
                          <Select
                            id="breed"
                            variant="bordered"
                            autoFocus
                            value={cattle.breed_id}
                            placeholder="Select an animal"
                            onChange={(e) => handleSelectChange1(e.target.value)}
                            className="w-full mt-[-10px]"
                          >
                            {breedsData && breedsData.map((breed) => (
                              <SelectItem key={breed.id} value={breed.id} className="bg-white">
                                {breed.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-1">
                          <label htmlFor="birth_date" className="font-bold text-black">
                            <h6>
                              Birth Date<span className="text-red-600">*</span>
                            </h6>
                          </label>
                          <Input
                            isRequired
                            id="birth_date"
                            name="birth_date"
                            autoFocus
                            type="date"
                            value={cattle.birth_date}
                            placeholder="Input your cattle birth date"
                            variant="bordered"
                            className="w-full h-[2.8rem]"
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Gender Date */}
                        <div className="grid grid-cols-1 gap-1">
                          <label htmlFor="gender" className="font-bold text-black">
                            <h6>
                              Gender<span className="text-red-600">*</span>
                            </h6>
                          </label>
                          <div className="flex justify-start w-full gap-3 input-bordered">
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
                        {/* Farm
                        <div className="grid grid-cols-1">
                          <label htmlFor="breed" className="font-bold text-black">
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
                          className="w-full ">
                            {(animal) => <SelectItem className="bg-white"
                            variant="bordered">{animal.label}</SelectItem>}
                          </Select>
                        </div> */}
                        {/* Cattle Height */}
                        <div className="grid grid-cols-1 gap-1">
                          <label htmlFor="height" className="font-bold text-black">
                            <h6>
                              Cattle Height<span className="text-red-600">*</span>
                            </h6>
                          </label>
                          <Input
                            id="height"
                            name="birth_height"
                            autoFocus
                            type="text"
                            value={cattle.birth_height}
                            placeholder="Input your cattle weight"
                            variant="bordered"
                            className="w-full h-[2.8rem] "
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Cattle Weight */}
                      
                        <div className="grid grid-cols-1 gap-1">
                          <label htmlFor="birth_weight" className="font-bold text-black">
                            <h6>
                              Birth Weight<span className="text-red-600">*</span>
                            </h6>
                          </label>
                          <Input
                            id="birth_weight"
                            name="birth_weight"
                            autoFocus
                            type="text"
                            value={cattle.birth_weight}
                            placeholder="Input your cattle birth weight"
                            variant="bordered"
                            className="w-full h-[2.8rem]"
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        {/* IoT devices */}
                        {/* <div className="grid grid-cols-1">
                          <label htmlFor="iot_devices" className="font-bold text-black mb-[-1rem]">
                            <h6>Iot Devices</h6>
                          </label>
                          <Select
                            id="iot_devices"
                            variant="bordered"
                            autoFocus
                            value={cattle.iot_device_id}
                            placeholder="Select an animal"
                            onChange={(e) => handleSelectChange2(e.target.value)}
                            className="w-full mt-[-10px]"
                          >
                            {IotDeviceData && IotDeviceData.map((iot_devices) => (
                              <SelectItem key={iot_devices.id} value={iot_devices.id} className="bg-white">
                                {iot_devices.serial_number}
                              </SelectItem>
                            ))}
                          </Select>
                        </div> */}

                          {/* status */}
                      
                        <div className="grid grid-cols-1">
                          <label htmlFor="status" className="font-bold text-black mb-[1rem]">
                            <h6>Status</h6>
                          </label>
                          <Select
                            id="status"
                            variant="bordered"
                            name="status"
                            autoFocus
                            value={cattle.status}
                            placeholder="Select status"
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="w-full mt-[-10px]"
                          >
                            {statusData.map((status) => (
                              <SelectItem key={status} value={status} className="bg-white">
                                {status}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>

                        
                        
                        <div className="grid grid-cols-1">
                          <label htmlFor="type" className="font-bold text-black mb-[1rem]">
                            <h6>Type</h6>
                          </label>
                          <Select
                            id="type"
                            variant="bordered"
                            name="type"
                            autoFocus
                            value={cattle.type}
                            placeholder="Select type"
                            onChange={(e) => handleTypeChange(e.target.value)}
                            className="w-full mt-[-10px]"
                          >
                            {['pedaging', 'perah', 'peranakan', 'lainnya'].map((type) => (
                              <SelectItem key={type} value={type} className="bg-white">
                                {type}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>        
                          

                        
                        <div className="grid grid-cols-1 gap-1">
                          <label htmlFor="last_vaccination" className="font-bold text-black">
                            <h6>
                              Last Vaccination<span className="text-red-600">*</span>
                            </h6>
                          </label>
                          <Input
                            isRequired
                            id="last_vaccination"
                            name="last_vaccination"
                            autoFocus
                            type="date"
                            value={cattle.last_vaccination}
                            placeholder="Input your cattle birth date"
                            variant="bordered"
                            className="w-full h-[2.8rem]"
                            onChange={handleInputChange}
                          />
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
              </form>
            </Modal>

          </div>
          <div className="row mt-3">
            <div className="col-sm-3">
                <div className="border border-success card">
                  <div className="gap-10 float-start card-body d-flex">
                    <Cow size={50} className=" text-emerald-500 text-[2rem]" />
                      <div className="flex-col d-flex ">
                        <h6 className="text-emerald-600">Sehat</h6>
                        <p>{sehatCattle.length}</p>
                      </div>
                  </div>
                </div>
              </div>
            <div className="col-sm-3">
              <div className="border border-success card">
                <div className="gap-10 float-start card-body d-flex">
                <Cow size={50} className=" text-red-500 text-[3rem]" />
                    <div className="flex-col d-flex ">
                      <h6 className="text-red-600">Sakit</h6>
                      <p>{sickCattle.length} </p>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="border border-success card">
                <div className="gap-10 float-start card-body d-flex">
                <Cow size={50} className=" text-yellow-400 text-[3rem]" />
                    <div className="flex-col d-flex ">
                      <h6 className="text-yellow-600">Dijual</h6>
                      <p>{soldCattle.length}</p>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="border border-success card">
                <div className="gap-10 float-start card-body d-flex">
                <Cow size={50} className=" text-red-700 text-[3rem]" />
                    <div className="flex-col d-flex ">
                      <h6 className="text-red-600">Mati</h6>
                      <p>{deathCattle.length}</p>
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
      ) : (
        <div className="mt-4 text-center text-gray-500">No results found</div>
      )}
    </>
  )
}




