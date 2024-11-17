'use client'
// import * as from "react";

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
import { swal } from "@/public/assets/extensions/sweetalert2/sweetalert2.all";
import Image from "next/image";

export default function Page( {params} ){
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin  '})
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
    const [statusData, setStatusData] = useState(['sehat', 'sakit', 'dijual', 'mati']);
    const { isOpen: isIotModalOpen, onOpen: onIotModalOpen, onOpenChange: onIotModalOpenChange, onClose: onIotModalClose } = useDisclosure();
// State Cattle 
const [cattleData, setCattleData] = useState(
    null
  );
  
  const [cattle, setCattle] = useState({
    name: '',
    breed: {
      name: '',
    },
    birth_date: '',
    birth_height: '',
    birth_weight: '',
    farm: {
      name: '',
    },
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
  const updateCattle = async (e) => {
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
    bodyFormData.append('status', cattle.status);
    bodyFormData.append('birth_date', cattle.birth_date);
    bodyFormData.append('birth_weight', cattle.birth_weight);
    bodyFormData.append('birth_height', cattle.birth_height);
    bodyFormData.append('iot_device_id', cattle.iot_device_id);
    bodyFormData.append('last_vaccination', cattle.last_vaccination);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${params.cattleID}`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      console.log(res.data.data) ;
      // Refresh cattle data
    if (res.data.data) {
      setCattle({
        id: 0,
        name: "",
        gender: "",
        status: "",
        birth_date: "",
        birth_weight: "",
        birth_height: "",
        last_vaccination: ""
      });
    }
    Swal.fire({
      icon: 'success',
      title: 'Cattle updated successfully',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      getCattleData();
      // Reset form fields
      onClose();
    });
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

  useEffect(() => {
    getCattleData();
    getBreedsData();
    getFarmData();
    getIotDeviceData();

  }, []);
 
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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${params.cattleID}`, {
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
    }, [params.cattleID]);
    console.log(cattle);
    if (!cattle) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    };
    const deleteCattle = async () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCattle();
        }
      });
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${params.cattleID}`, {
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
        }).then(() => {
          window.location.href = '/peternak/cattle'; // Redirect to /peternak/cattle after deletion
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
  
    const handleSelectChange2 = (value) => {
      setCattle({ ...cattle, iot_device_id: value });
    };
    const assignIotDevices = async (e) => {
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
      bodyFormData.append('iot_device_id', cattle.iot_device_id);

  
      try {
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/assign-iot-devices/${params.cattleID}`,
          bodyFormData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
          }
        );
        console.log(res.data.data) ;
        // Refresh cattle data
        getCattleData();
        if(res.data.data)
          {
            setCattle({
            iot_device_id : "",

          }, 
        Swal.fire({
          icon: 'success',
          title: 'IoT Devices assigned successfully',
          showConfirmButton: false,
          timer: 1500
        }));
  }
        // Reset form fields
        
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

    const removeIoTDevices = async (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Loading...',
            text: 'Mohon tunggu sebentar...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
    
          try {
            const res = await axios.delete(
              `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/remove-iot-devices/${params.cattleID}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
              }
            );
            console.log(res.data.data);
            // Refresh cattle data
            getCattleData();
            if (res.data.data) {
              setCattle({
                ...cattle,
                iot_device_id: null,
                iot_device: {
                  ...cattle.iot_device,
                  status: "inactive",
                }
              });
              Swal.fire({
                icon: 'success',
                title: 'IoT Devices removed successfully',
                showConfirmButton: false,
                timer: 1500
              });
            }
          } catch (error) {
            console.error('Error:', error.response);  // Log error lengkap dari response
            if (error.response && error.response.status === 401) {
              Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error terjadi',
                text: 'Mohon coba lagi nanti.',
                showConfirmButton: false,
                timer: 1500
              });
            }
          } finally {
            Swal.close();
          }
        }
      });
    };
    const handleSelectChange1 = (value) => {
      setCattle({ ...cattle, breed_id: value });
    };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setCattle((prevCattle) => ({
        ...prevCattle,
        [name]: value,
      }));
    };
    const handleTypeChange = (value) => {
      setCattle({ ...cattle, type: value });
    };
    const handleStatusChange = (value) => {
      setCattle({ ...cattle, status: value });
    };
    const handleInputChange1 = (e) => {
      const { name, value } = e.target;
      setCattle({ ...cattle, iot_device: { ...cattle.iot_device, [name]: value } });
    };
    const iotDeviceUser = IotDeviceData ? IotDeviceData.filter((iot) => iot.user_id === user?.id) : [];
    return (
        <>
            {/* card 1 untuk destroy dan edit */}
            <div className="d-flex justify-center">

            
                <div className="card w-[800px]">
                    <div className="card-body d-flex justify-between">
                      <h5 className="text-black font-bold"> {cattle.name}</h5>
                      <div>
                        <i class="bi bi-trash-fill text-2xl cursor-pointer text-red-700" onClick={() => { deleteCattle() }}></i>
                        <i class="bi m-[-1re] bi-pencil-fill cursor-pointer text-2xl text-emerald-600" onClick={onOpen}></i>
                      </div>
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
                    <form onSubmit={updateCattle}>
                      <ModalContent className="w-[800px] h-[650px] bg-white rounded-xl ">
                      {(onClose) => (
                      <>
                      <ModalHeader className="dialog-title flex flex-col gap-2 px-6 mt-6">
                          <h3 className="text-black font-bold text-center">Edit Cattle</h3>
                      </ModalHeader>
                      <ModalBody className="grid grid-cols-2">
                          {/* Cattle Name */}
                          <div className="grid grid-cols-1">
                              <label htmlFor="name" className="text-black font-bold">
                              <h6>
                                  Cattle Name
                              </h6>
                              </label>
                              <Input
                              id="name"
                              name="name"
                              autoFocus
                              type="text"
                              value={cattle.name}
                              label="text"
                              placeholder="Input your cattle name"
                              variant="bordered"
                              className="w-full h-[2.8rem] "
                              // onChange={handleInputChange}
                              />
                          </div>

                          <div className="grid grid-cols-1">
                              <label htmlFor="date" className="text-black font-bold">
                              <h6>
                                  Birth Date
                              </h6>
                              </label>
                              <Input
                              name="birth_date"
                              id="date"
                              autoFocus
                              value={cattle.birth_date}
                              type="date"
                              label="text"
                              placeholder="Input your cattle name"
                              variant="bordered"
                              className="w-full h-[2.8rem] "
                              // onChange={handleInputChange}
                              />
                          </div>
                          <div className="grid grid-cols-1">
                              <label htmlFor="date" className="text-black font-bold">
                              <h6>
                                  Last Vaccination
                              </h6>
                              </label>
                              <Input
                              name="last_vaccination"
                              id="date"
                              autoFocus
                              value={cattle.last_vaccination}
                              type="date"
                              label="text"
                              placeholder="Your cattle last vaccination"
                              variant="bordered"
                              className="w-full h-[2.8rem] "
                              onChange={handleInputChange}
                              />
                          </div>
                   
                          <div className="grid grid-cols-1">
                              <label htmlFor="height" className="text-black font-bold">
                              <h6>
                                  Cattle Height
                              </h6>
                              </label>
                              <Input
                              id="height"
                              name="birth_height"
                              autoFocus
                              type="text"
                              label="text"
                              value={cattle.birth_height}
                              placeholder="Input your cattle weight"
                              variant="bordered"
                              className="w-full h-[2.8rem] "
                              onChange={handleInputChange}
                              />
                          </div>

                          {/* Cattle Weight */}
                          <div className="grid grid-cols-1">
                              <label htmlFor="weight" className="text-black font-bold">
                              <h6>
                                  Cattle Weight
                              </h6>
                              </label>
                              <Input
                              id="weight"
                              autoFocus
                              type="text"
                              name="birth_weight"
                              label="text"
                              value={cattle.birth_weight}
                              placeholder="Input your cattle weight"
                              variant="bordered"
                              className="w-full h-[2.8rem] "
                              onChange={handleInputChange}
                              />
                          </div>

                          <div className="grid grid-cols-1 gap-1">
                            <label htmlFor="status" className="text-black font-bold">
                              <h6>
                                Status
                              </h6>
                            </label>
                            <select
                              name="status"
                              id="status"
                              value={cattle.status}
                              onChange={handleSelectChange}
                              className="w-full h-[2.8rem] shadow-md"
                            >
                              <option value=''>Pilih Status Sapi</option>
                              <option value='sehat'>Sehat</option>
                              <option value='sakit'>Sakit</option>
                              <option value='mati'>Mati</option>
                            </select>
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
            </div>
            {/* card 2 untuk detail cattle */}  
            <div className="d-flex justify-center">
                <div className="card w-[800px]">
                    <div className="card-body d-flex justify-between p-[3rem]">
                        <div className="grid grid-cols-1 gap-60 w-full">
                            <div>
                                <div className="title-iot d-flex justify-center">
                                 {/* <img src="https://i.pinimg.com/564x/df/e2/9f/dfe29f50ec425d8b4bd1eafb86f3ff2a.jpg" alt="cattle" width={250} height={250} /> */}
                                  <Image src={'https://heycow.my.id/storage'+cattle.image} alt="cattle" width={250} height={250} />
                                </div>
                               
                                <p className="text-lg text-black text-center">From : <span className="font-bold">{cattle.farm &&cattle.farm.name}</span></p>
                            </div>
                            {cattle && cattle.diAngon === false && ( <div className="d-flex justify-around">
                               <Link href={`/peternak/cattle/${cattle.id}/pengangon`}>
                                  <Button className="bg-yellow-300" >
                                    Angonkan
                                  </Button>
                                </Link>
                           
                                
                                <Link href={`/peternak/cattle/${cattle.id}/jual`}>
                                  <Button className="bg-emerald-600" >
                                    Jual Sapi mu
                                  </Button>
                                </Link>
                           
                            </div>)}
                           
                        </div>
                        <div className="grid grid-cols-1 gap-3 w-full">
                            <div>
                                <div className="title-iot d-flex justify-between">
                                    
                                    <div className="d-flex gap-3">
                                     
                                    </div>
                                    <div className="gap-3 d-flex">
                                    <Button  className="bg-red-600" onClick={removeIoTDevices }>Remove IoT</Button>
                                    <Button  className="bg-emerald-600" onClick={onIotModalOpen }>Set IoT</Button>
                                    </div>
                                    
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
                                      <TableCell className="font-thin text-sm">{formatDate(cattle.birth_date && cattle.birth_date)}</TableCell>
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
                                    <TableRow className="text-black">
                                      <TableCell className="font-bold text-lg">Last Vaccination</TableCell>
                                      <TableCell className="font-thin text-sm">
                                        {formatDate(cattle.last_vaccination ? cattle.last_vaccination : 'belum ada vaksinasi')}
                                      </TableCell>
                                    </TableRow>
                                </TableBody>
                              </Table>
                          </div>
                          <div className="mt-5">
                            <div className="title-iot d-flex justify-between">
                             <h5 className="text-black font-bold">Health Monitoring</h5>
                                 <Link href={`/peternak/cattle/${cattle.id}/health_monitor`}>
                                  <Button className="bg-emerald-600">Detail Kesehatan</Button>
                                </Link>
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
          

            <Modal 
                    isOpen={isIotModalOpen} 
                    onOpenChange={onIotModalOpenChange}
                    scrollBehavior="inside"
                    placement="center"
                    backdrop="opaque"
                    classNames={{
                    backdrop: "bg-black bg-opacity-50"
                    }}
                    >
                    <form onSubmit={assignIotDevices}>
                      <ModalContent className="w-[800px] h-[600px] bg-white rounded-xl px-4">
                      {(onIotModalClose) => (
                      <>
                      <ModalHeader className="dialog-title flex flex-col gap-2">
                          <h3 className="text-black font-bold text-center">Set IoT Devices</h3>
                      </ModalHeader>
                      <ModalBody className="grid">
                          {/* Cattle Name */}
                          <div className="grid-cols-1">
                            <label htmlFor="iot_devices" className="font-bold text-black mb-[-1rem]">
                              <h6>Iot Devices</h6>
                            </label>
                            <Select
                              id="iot_devices"
                              variant="bordered"
                              name="iot_device_id"
                              autoFocus
                              value={cattle.iot_device_id}
                              placeholder="Select your iot devices"
                              onChange={(e) => handleSelectChange2(e.target.value)}
                              className="w-full mt-[1rem]"
                            >
                              {/* {IotDeviceData && IotDeviceData.map((iot_devices) => (
                                <SelectItem key={iot_devices.serial_number} value={iot_devices.serial_number} className="bg-white">
                                  {iot_devices.serial_number}
                                </SelectItem>
                              ))} */}
                              {iotDeviceUser.map((iot) => (
                                <SelectItem key={iot.serial_number} value={iot.serial_number} className="bg-white">
                                  {iot.serial_number}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="grid-cols-1">
                            <label htmlFor="ssid" className="font-bold text-black mb-[-1rem]">
                              <h6>SSID</h6>
                            </label>
                            <Input
                              id="ssid"
                              name="ssid"
                              autoFocus
                              type="text"
                              value={cattle.iot_device && cattle.iot_device.ssid}
                              placeholder="Input your cattle birth weight"
                              variant="bordered"
                              className="w-full h-[2.8rem]"
                              onChange={handleInputChange1}
                            />
                          </div>
                          <div className="grid-cols-1">
                            <label htmlFor="password" className="font-bold text-black mb-[-1rem]">
                              <h6>Password</h6>
                            </label>
                            <Input
                              id="password"
                              name="password"
                              autoFocus
                              type="password"
                              value={cattle.iot_device && cattle.iot_device.password}
                              placeholder="Input your IoT device password"
                              variant="bordered"
                              className="w-full h-[2.8rem]"
                              onChange={handleInputChange1}
                            />
                          </div>
                          </ModalBody>
                          <ModalFooter>

                          <Button isSubmit className="bg-emerald-600 text-md" onPress={onIotModalClose}>
                          Submit
                          </Button>
                          </ModalFooter>
                      </>
                      )}
                  </ModalContent>
                </form>
              </Modal>

        </>
    )
}