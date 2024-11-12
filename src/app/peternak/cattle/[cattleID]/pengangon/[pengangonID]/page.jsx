'use client'

import ReactStars from "react-stars";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Image } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/hooks/auth"; // Hook for authentication
import axios from "axios";
import Swal from "sweetalert2";
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Checkbox, 
} from '@nextui-org/modal';
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import duration from "@/public/assets/extensions/dayjs/plugin/duration";



export default function PengangonDetail({ params }) {
  const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' });
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const [setRequestData] = React.useState([]);
  const [cattleID, pengangonID] = [params.cattleID, params.pengangonID];
  const [detailData, setDetailData] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [cattleData, setCattleData] = React.useState([]);
  const [requests, setRequests] = React.useState({
    id: 0,
    duration: '',
    cattle_id: '',
    status:'pending',
    peternak_id: '',
    user_id: '',
  },[]);
  const getUserData = async () => {
    console.log('Fetching user data biasa...');
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${params.pengangonID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('User data biasa', res.data.data);
      if (res.data.data) {
        setUserData(res.data.data);
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
          title: 'Error occurred',
          text: 'Please try again later.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  const getUserDataDetail = async () => {
    console.log('Fetching user data pengangon...');
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${params.pengangonID}/detail`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('User data lengkap:', res.data.data);
      if (res.data.data) {
        setDetailData(res.data.data);
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
          title: 'Error occurred',
          text: 'Please try again later.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  const getCattleData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${params.cattleID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Cattle data:', res.data.data);
      if (res.data.data) {
        setCattleData(res.data.data);
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
          title: 'Error occurred',
          text: 'Please try again later.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }
console.log('nama',cattleData.name)
  const submitRequest = async (e) => {
    e.preventDefault();
    
    console.log('submitting request...');
    const bodyFormData = new FormData();
    bodyFormData.append('peternak_id', requests.peternak_id);
    bodyFormData.append('duration', requests.duration);
    bodyFormData.append('cattle_id', requests.cattle_id);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/request-angon`, bodyFormData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('response request: ', response.data);
      console.log('Request submitted successfully');
      if (response.data.data) {
        setRequests(response.data.data);
        console.log('Request data:', response.data.data);
      }
      setRequests({
        id: 0,
        duration: '',
        cattle_id: '',
        status:'pending',
        peternak_id: '',
        user_id: '',
      },
        Swal.fire({
          icon: 'success',
          title: 'Request submitted successfully',
          showConfirmButton: false,
          timer: 1500,
        })
      );
      
    } catch (error) {
      console.error('Error submitting request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: 'Please try again later.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  React.useEffect(() => {
    console.log('Cattle ID:', cattleID);
    console.log('Pengangon ID:', pengangonID);
  }, [cattleID, pengangonID]);

  React.useEffect(() => {
    if (detailData.pengangon) {
      setRequests((prevRequests) => ({ ...prevRequests, peternak_id: detailData.pengangon.name }));
    }
    if (cattleData.name) {
      setRequests((prevRequests) => ({ ...prevRequests, cattle_id: cattleData.name }));
    }
  }, [detailData, cattleData]);
  
  React.useEffect(() => {
    getUserData();
    getUserDataDetail();
    getCattleData();
  }, [cattleID, pengangonID]);

  console.log('detail data', detailData);
  if (!userData || !cattleData) {
    return <div>Loading...</div>;
  }
  const categories = ['forum', 'jual'];
  // const handleSelectChange = (event) => {
  //   setRequests({ ...requests, duration: event.target.value });
  // };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setRequests({ ...requests, [name]: parseInt(value, 10) });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRequests({ ...requests, [name]: value });
  };

  return (
    <>
      <div className="d-flex justify-center">
        <div className="card p-4 w-[650px] ">
          <div className="card-body">
            <h4 className="text-black font-bold">{detailData.pengangon && detailData.pengangon.name}</h4>
          </div>
        </div>
      </div>
      {/* Angon or Farmer section */}
      <div className="s d-flex justify-center ">
        <div className="card w-[650px] p-2">
          <div className="card-body d-flex justify-around">
            <div id="</div>profile-picture">
              <img src={detailData.pengangon && detailData.pengangon.full_avatar_url || "https://via.placeholder.com/250"} alt="Descriptive Alt Text" width={250} height={250} />
              <p className="text-lg text-center mt-3 text-black font-thin">Upah : Rp {detailData.pengangon && detailData.pengangon.upah} / Bulan</p>
              <div className="d-flex mt-[-0.5rem] justify-center">
                <ReactStars count={5} size={50} color2={'#ffd700'} value={detailData.pengangon && detailData.pengangon.rate}/>
              </div>
            </div>
            <div id="data pelanggan">
              <h5 className="text-black font-bold text-center">Riwayat Pelanggan</h5>
              <Table>
                <TableHeader>
                  <TableRow className="text-center">
                    <TableCell><p className="text-md text-black">Data Pelanggan</p></TableCell>
                    <TableCell><p className="text-md text-black">Sapi</p></TableCell>
                    <TableCell><p className="text-md text-black">Durasi</p></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailData && detailData.riwayat_pelanggan && detailData.riwayat_pelanggan.map((pelanggan, index) => (
                    <TableRow key={index} className="text-center">
                      <TableCell>{pelanggan.customer_name}</TableCell>
                      <TableCell>{pelanggan.cow_name}</TableCell>
                      <TableCell>{pelanggan.durasi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
          
            
          </div>
          <div className="d-flex justify-center"> <hr className="w-3/4 align-middle"/></div>
          <div className="d-flex justify-center m-3">
           
            <Button onClick={onOpen} className="text-lg bg-emerald-600">Pilih Pengangon!</Button>
          </div>
          <div className="d-flex justify-center m-3">
           
           
            <Link href={`/peternak`}>
              <Button  className="text-lg bg-emerald-600">Kembali ke home!</Button>  
            </Link>    
          </div>
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
        <ModalContent className="w-[700px] h-[650px] bg-white rounded-xl ">
          {(onClose) => (
            <>
              <ModalHeader className="dialog-title flex flex-col gap-1 px-6 mt-6">
                <h3 className="text-black font-bold text-center">Request Angon</h3>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={submitRequest}>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-1 gap-1">
                      <label htmlFor="peternak_id" className="text-black font-bold">
                        <h6>
                          Peternak<span className="text-red-600">*</span>
                        </h6>
                      </label>
                      <Input
                        isDisabled
                        id="peternak_id"
                        name="peternak_id"
                        defaultValue={detailData.pengangon && detailData.pengangon.name}
                        value={requests.peternak_id}
                        variant="bordered"
                        className="w-full h-[2.8rem]"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <label htmlFor="cattle_id" className="text-black font-bold">
                        <h6>
                          Sapi<span className="text-red-600">*</span>
                        </h6>
                      </label>
                      <Input
                        isDisabled
                        id="cattle_id"
                        name="cattle_id"
                        defaultValue={cattleData && cattleData.name}
                        value={requests.cattle_id}
                        variant="bordered"
                        className="w-full h-[2.8rem]"
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-1">
                      <label htmlFor="duration" className="text-black font-bold">
                        <h6>
                          Durasi<span className="text-red-600">*</span>
                        </h6>
                      </label>
                      <Select
                        id="duration"
                        name="duration"
                        value={requests.duration}
                        onChange={handleSelectChange}
                      >
                        <SelectItem value={6}>6 Bulan</SelectItem>
                        <SelectItem value={12}>12 Bulan</SelectItem>
                      </Select>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-emerald-600 text-md" type="submit" onClick={submitRequest}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}