'use client'
import * as React from "react";

// import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
import { Input } from "@/components/ui/input"
// import { Select } from "@nextui-org/select";
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Checkbox, 
  
} from '@nextui-org/modal'

import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
// import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { animals } from "../dummy";
import axios from "axios"
import Swal from "sweetalert2"
import Image from "next/image"
import { swal } from "@/public/assets/extensions/sweetalert2/sweetalert2.all";
export default function Page( {params} ){
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin  '})
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()

// State Cattle 
const [cattleData, setCattleData] = React.useState(
    null
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

  const getBreedsData = async () => {
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/breeds`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setBreedsData(response.data.data);
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
          setIotDeviceData(response.data.data);
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
    var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`, {
      headers: {
        'content-type': 'text/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(function (response) {
        if (response.data.data != undefined) {
          setCattleData(response.data.data);
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
  const [data, setData] = useState([]);

  React.useEffect(() => {
    getCattleData();
    getBreedsData();
    getFarmData();
    getIotDeviceData();

  }, []);
    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setCattle({ ...cattle, [name]: value });
      
      }
      
      const handleSelectChange = (event) => {
        
        const name = event.target.name;
        const {value} = event.target.selectedOptions[0];
        console.log(value);
        setCattle({ ...cattle, [name]: value });
      
      }
      useEffect(() => {
        // Fetch cattle data by ID
        const fetchCattleData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${params.id}`, {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setCattle(response.data.data);

                // Fetch IoT device data if iot_device_id is available
                if (response.data.data.iot_device_id) {
                    const iotResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices/${response.data.data.iot_device_id}`, {
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    });
                    setIotDeviceData(iotResponse.data.data);
                    console.log('data nya ',setIotDeviceData);
                }
            } catch (error) {
                console.error('Error fetching cattle data:', error);
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

        fetchCattleData();
    }, [params.id]);
    console.log(cattle);
    if (!cattle) {
        return <div>Loading...</div>;
    }

    const deleteCattle = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${params.id}`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            console.log('Delete response:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Cattle deleted successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error deleting cattle:', error);
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
                    title: 'Error occurred',
                    text: 'Please try again later.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
      }
    };
  
    return (
        <>
            {/* card 1 untuk destroy dan edit */}
            <div className="d-flex justify-center">

            
                <div className="card w-[800px]">
                    <div className="card-body d-flex justify-start">
                      <h5 className="text-black font-bold"> {cattle.name}</h5>
                    </div>
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
                        <h3 className="text-black font-bold text-center">Edit Cattle</h3>
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
                            <label htmlFor="farm" className="text-black font-bold">
                            <h6>Farm</h6>
                            </label>
                            <Select
                              id="category"
                              name="category"
                              variant="bordered"
                              placeholder="Select a category"
                              className="w-full h-[2.8rem]"
                              value={cattle.farm && cattle.farm.name}
                              onChange={handleSelectChange}
                            >
                              {cattleData && cattleData.map((cattle) => (
                                <SelectItem key={cattle && cattle.id} value={cattle.farm && cattle.farm.name}>
                                  {cattle.farm && cattle.farm.name}
                                </SelectItem>
                              ))}
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
                </div>
            </div>
            {/* card 2 untuk detail cattle */}  
            <div className="d-flex justify-center">
                <div className="card w-[800px]">
                    <div className="card-body d-flex justify-between p-[3rem]">
                        <div className="grid grid-cols-1 gap-60 w-full">
                            <div>
                                <div className="title-iot d-flex justify-center">
                                 {/* <img src="https://i.pinimg.com/564x/df/e2/9f/dfe29f50ec425d8b4bd1eafb86f3ff2a.jpg" alt="cattle" width={250} height={250} /> */}
                                <img src={cattle.imageUrl} alt="cattle" width={250} height={250} />
                                </div>
                               
                                <p className="text-lg text-black text-center">From : <span className="font-bold">{cattle.farm &&cattle.farm.name}</span></p>
                            </div>
                            <div className="d-flex justify-around">
                               <Link href={`/peternak/cattle/${cattle.id}/pengangon`}>
                                  <Button className="bg-yellow-300" >
                                    Angonkan
                                  </Button>
                                </Link>
                           
                                
                                <Button className="bg-emerald-600" >Jual</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 w-full">
                            <div>
                                <div className="title-iot d-flex justify-between">
                                    
                                    <div className="d-flex gap-3">
                                      <i class="bi bi-trash-fill text-2xl cursor-pointer text-red-700" ></i>
                                        
                                        <i class="bi m-[-1re] bi-pencil-fill cursor-pointer text-2xl text-emerald-600" onClick={onOpen}></i>
                                    </div>
                                    <Button className="bg-emerald-600">Detail IoT</Button>
                                </div>
                            </div>
                            <div >
                              <Table>
                                <TableHeader>
                                    <TableRow className="text-lg">
                                      <TableCell>Data</TableCell>
                                      <TableCell>Sapi</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="text-black">
                                      
                                      <TableCell className="font-bold text-lg">Breed</TableCell>
                                      {/* {cattleData?.map((cattle) => (
                                        <TableCell key={cattle.id} className="font-thin text-sm">{cattle.breed_id}</TableCell>
                                      ))} */}

                                      <TableCell className="font-thin text-sm">{cattle.breed && cattle.breed.name}</TableCell>
                                     
                                        
                                    </TableRow>
                                    <TableRow className="text-black">
                                      <TableCell className="font-bold text-lg">Gender</TableCell>
                                      <TableCell className="font-thin text-sm">{cattle.gender && cattle.gender}</TableCell>
                                    </TableRow>
                                    <TableRow className="text-black">
                                      <TableCell className="font-bold text-lg">Date of Birth</TableCell>
                                      <TableCell className="font-thin text-sm">{cattle.birth_date && cattle.birth_date}</TableCell>
                                    </TableRow>
                                    <TableRow className="text-black">
                                      <TableCell className="font-bold text-lg">Weight</TableCell>
                                      <TableCell className="font-thin text-sm">{cattle.birth_weight && cattle.birth_weight} kg</TableCell>
                                    </TableRow>
                                    <TableRow className="text-black">
                                      <TableCell className="font-bold text-lg">Height</TableCell>
                                      <TableCell className="font-thin text-sm">{cattle.birth_date && cattle.birth_height} cm</TableCell>
                                    </TableRow>
                                    <TableRow className="text-black">
                                      <TableCell className="font-bold text-lg">IoT Devices</TableCell>
                                      <TableCell className="font-thin text-sm">
                                        {cattle.iot_device && cattle.iot_device.serial_number}
                                      </TableCell>
                                    </TableRow>
                                </TableBody>
                              </Table>
                          </div>
                          <div className="mt-5">
                            <div className="title-iot d-flex justify-between">
                             <h5 className="text-black font-bold">Health Monitoring</h5>
                                  <Button className="bg-emerald-600">Detail Kesehatan</Button>
                            </div>
                            </div>
                            <div >
                              <Table>
                                <TableHeader>
                                    <TableRow className="text-lg">
                                      <TableCell>Data</TableCell>
                                      <TableCell>Sapi</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="text-black">
                                      <TableCell className="font-bold text-lg">Body Temprature</TableCell>
                                      <TableCell className="font-thin text-sm">{cattle.healthRecords && cattle.healthRecords.temperature}</TableCell>
                                    </TableRow>
                                    <TableRow className="text-black">
                                      <TableCell className="font-bold text-lg">Status</TableCell>
                                      <TableCell className="font-thin text-sm">{cattle.healthRecords && cattle.healthRecords.status}</TableCell>
                                    </TableRow>
                                </TableBody>
                              </Table>
                          </div>
                        </div>
                      
                    </div>
                </div>
            </div>
        </>
    )
}