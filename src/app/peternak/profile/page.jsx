'use client'
import { Button } from "@/components/ui/button";
// import * as from 'react';
import { useAuth } from '@/lib/hooks/auth';
import { useState, useEffect } from 'react';
import axios from "axios";
import { usePathname, useRouter } from 'next/navigation';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Checkbox,
    Link
} from '@nextui-org/modal'
import { Input } from "@/components/ui/input"
import Swal from 'sweetalert2';
import { P } from "@/public/assets/extensions/chart.js/chunks/helpers.segment";
import Image from "next/image";

export default function Profile() {
    const { user, mutate,logout } = useAuth({ middleware: 'cattleman' || 'admin' });
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isBouncing, setIsBouncing] = useState(false);
    const [collapsedIndex, setCollapsedIndex] = useState(null);
    const toggleCollapse = (index) => {
        setIsCollapsed(!isCollapsed);
        setCollapsedIndex(collapsedIndex === index ? null : index);
    };
    const [iot, setIot] = useState([]);
    const [userData, setUserData] =     useState({
        id: 0,
        nama: '',
        phone_number: '',
        email: '',
        avatar: null,
        nik: '',
        farm: {
            name: '',
            address: '',
        },
        farm_id: '',
        address: '',
        upah: null,
        selfie_ktp: null,
        ktp: null,
        is_pengangon: 0,
    });

    const getUserData = async () => {
        console.log('fetching user data...');
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }
            );
            if (res.data) {
                setUserData({
                    id: res.data.id,
                    nama: res.data.name,
                    phone_number: res.data.phone_number,
                    email: res.data.email,
                    bio: res.data.bio,
                    avatar: res.data.avatar,
                    nik: res.data.nik,
                    farm: {
                        name: res.data.farm ? res.data.farm.name : '',
                        address: res.data.farm ? res.data.farm.address : '',
                    },
                    farm_id: res.data.farm_id,
                    address: res.data.address,
                    upah: res.data.upah,
                    selfie_ktp: res.data.selfie_ktp,
                    ktp: res.data.ktp,
                    is_pengangon: res.data.is_pengangon,
                }
                );
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const updateMe = async (e) => {
        e.preventDefault();
        try {
            console.log('updating profile...', userData);
            const formData = new FormData();

            formData.append('nama', userData.name);
            formData.append('phone_number', userData.phone_number);
            formData.append('email', userData.email);
            formData.append('address', userData.address);
            formData.append('farm_name', userData.farm.name);
            formData.append('farm_address', userData.farm.address);
            formData.append('upah', userData.upah ?? 0);

            if (userData.avatar && typeof userData.avatar !== 'string') {
                formData.append('avatar', userData.avatar);
            }


            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/update-profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }
            )
            if (res.data) {
                // getUserData();
                await mutate(); // This will refetch `/api/me` data in `useAuth`
                setUserAvatar(res.data.user.full_avatar_url);

                setUserData(prevUserData => ({
                    ...prevUserData,
                    avatar: res.data.user.full_avatar_url // Assuming the response includes the updated avatar URL
                }));

                Swal.fire({
                    icon: 'success',
                    title: 'Profile updated successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }


        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error occurred',
                text: 'Please try again later.',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    // get iot devices by user
    const getIotDevices = async () => {
        console.log('debug iot....')
        try{
            var response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices/get-iot-devices-by-user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log('Response:', response.data.data)
            setIot(response.data.data)
        }catch(error){
            console.log('Error:', error)
        }
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setUserData((prevUserData) => ({
            ...prevUserData,
            avatar: file ? file : prevUserData.avatar,
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleInputChangeFarm = (event) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            farm: {
                ...prevUserData.farm,
                [name]: value,
            },
        }));
    };

    const handleSelectChange = (event) => {
        const name = event.target.name;
        const { value } = event.target.selectedOptions[0];
        console.log(value);
        setUserData({ ...userData, [name]: value });
    };

    const [userAvatar, setUserAvatar] = useState('');
    const fetchUserImage = async () => {
        console.log('fetching user image...');
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/me`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })

            if (response.data.avatar && response.data.avatar) {
                setUserAvatar(response.data.avatar);
            } else {
                console.error('User object or full_avatar_url is undefined');
            }
            console.log('User Avatar URL:', userAvatar);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error occurred',
                text: 'Please try again later.',
                showConfirmButton: false,
                timer: 1500,
            })
            console.error('Error fetching user image:', error);
        }
    };
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };
    useEffect(() => {
        getUserData();
        fetchUserImage();
        getIotDevices();
    }, []);

    useEffect(() => {
        console.log('User Avatar Updated:', userAvatar); // Log whenever userAvatar changes
    }, [userAvatar]);

    const handleImageLoad = (event) => {
        event.target.setAttribute('data-loaded', 'true');
        console.log('Image loaded successfully');
    };

    return (
        <main>
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
                                <h3 className="text-black font-bold text-center">Edit Profile</h3>
                            </ModalHeader>
                            <ModalBody >
                                <form onSubmit={updateMe}>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="nama" className="text-black font-bold">
                                                <h6>
                                                    Username<span className="text-red-600">*</span>
                                                </h6>
                                            </label>
                                            <Input
                                                id="nama"
                                                autoFocus
                                                type="text"
                                                name="nama"
                                                value={userData.nama ? userData.nama : ''}
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="email" className="text-black font-bold">
                                                <h6>
                                                    Email<span className="text-red-600">*</span>
                                                </h6>
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                autoFocus
                                                type="email"
                                                value={userData.email ? userData.email : ''}
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="farm_id" className="text-black font-bold">
                                                <h6>
                                                    Farm Name
                                                </h6>
                                            </label>
                                            <Input
                                                id="farm_id"
                                                name="name"
                                                autoFocus
                                                type="text"
                                                value={userData.farm.name || ''}
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleInputChangeFarm}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="farm" className="text-black font-bold">
                                                <h6>
                                                    Farm Address
                                                </h6>
                                            </label>
                                            <Input
                                                id="farm"
                                                name="address"
                                                autoFocus
                                                type="text"
                                                value={userData.farm.address || ''}
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleInputChangeFarm}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="address" className="text-black font-bold">
                                                <h6>
                                                    Address<span className="text-red-600">*</span>
                                                </h6>
                                            </label>
                                            <Input
                                                id="address"
                                                autoFocus
                                                name="address"
                                                type="text"
                                                value={userData.address ? userData.address : ''}
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-1">
                                            <label htmlFor="phone_number" className="text-black font-bold">
                                                <h6>
                                                    No. Telp
                                                </h6>
                                            </label>
                                            <Input
                                                id="phone_number"
                                                autoFocus
                                                name="phone_number"
                                                type="text"
                                                value={userData.phone_number ? userData.phone_number : ''}
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        {/* <div className="grid grid-cols-1 mb-3 gap-1">
                                            <label htmlFor="gender" className="text-black font-bold">
                                                <h6>
                                                    Gender
                                                </h6>
                                            </label>
                                            <select
                                                name="gender"
                                                id="gender"
                                                value={userData.gender}
                                                onChange={handleSelectChange}
                                                className="w-full h-[2.8rem] px-2 shadow-sm border border-gray-300 rounded-md"
                                            >
                                                <option value=''>Pilih Gender</option>
                                                <option value='male'>Laki-laki</option>
                                                <option value='female'>Perempuan</option>
                                            </select>
                                            <Input
                                                id="phone_number"
                                                autoFocus
                                                name="phone_number"
                                                type="text"
                                                value={userData.phone_number ? userData.phone_number : ''}
                                                variant="bordered"
                                                className="w-full h-[2.8rem] "
                                                onChange={handleInputChange}
                                            />
                                        </div> */}

                                        {userData.is_pengangon === 1 && (
                                            <div className="grid grid-cols-1 my-3 gap-1">
                                                <label htmlFor="upah" className="text-black font-bold">
                                                    <h6>
                                                        Upah
                                                    </h6>
                                                </label>
                                                <Input
                                                    id="upah"
                                                    autoFocus
                                                    name="upah"
                                                    type="text"
                                                    value={userData.upah}
                                                    variant="bordered"
                                                    className="w-full h-[2.8rem] "
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-1">
                                        <label htmlFor="avatar" className="text-black font-bold">
                                            <h6>
                                                Avatar
                                            </h6>
                                        </label>
                                        <Input
                                            id="avatar"
                                            autoFocus
                                            type="file"
                                            variant="bordered"
                                            className="w-full h-[2.8rem] "
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-emerald-600 text-md" type="submit" onClick={updateMe}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className='edit-profile-card d-flex justify-center'>
                <div className='card w-[650px]'>
                    <div className='card-body mb-[-1.5rem] '>
                        <Button className='bg-emerald-600 float-end ' onClick={onOpen}>
                            <i className='bi mr-3 text-white bi-pencil-fill' />
                            Edit Profile
                        </Button>
                        <div>
                            <div className='profile-picture d-flex justify-center'>
                                <img src={user && user.avatar} width={120} height={120} alt="Profile" className="rounded-full ml-[9rem] object-cover" onLoadingComplete={handleImageLoad} />
                            </div>
                            <h5 className='mt-3 text-black font-bold text-center'>{user ? user.name : "N/A"}</h5>
                        </div>
                    </div>
                    <div className='profile-data card-body  px-5'>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    No. Telp
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user ? user.phone_number : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Email
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user ? user.email : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Role
                                </p>
                                <div className='border rounded-md bg-gray-300 h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user ? user.role : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Farm Name
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user && user.farm ? user.farm.name : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Farm Address
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user && user.farm ? user.farm.address : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Upah
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user && user.upah ? user.upah : 'N/A'} / Bulan
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Address
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user && user.address ? user.address : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            {/* <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Gender
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user && user.gender ? user.gender : 'N/A'}
                                    </p>
                                </div>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-[40rem] mx-auto grid grid-cols-1 gap-6">
                {iot && iot.map((iot, index) => (
                <div key={index} className="d-flex justify-center">
                    <div className="w-[60rem] p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                        <div
                            className="grid grid-cols-[1fr_auto] items-center cursor-pointer border-black "
                            onClick={() => toggleCollapse(index)}
                        >
                            <h3 className="text-xl font-semibold float-start">IoT serial Number : {iot.serial_number}</h3>
                            <span
                            className={`text-gray-500 transition-transform duration-200 ${collapsedIndex === index ? 'transform scale-125' : ''}`}
                            >
                            {collapsedIndex === index ? '-' : '+'}
                            </span>
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out d-flex justify-around overflow-hidden ${collapsedIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div>
                                <img src={'https://heycow.my.id/storage/'+iot.qr_image} alt="QR Code" className="w-[10rem] h-10rem]" />
                            </div>
                            <div className="gap-2">
                                <p className="text-md font-thin">Data Lama = <span className="text-black font-bold">{formatDate(iot.installation_date)}</span></p>
                                <p className="text-md font-thin">Data Baru = <span  className="text-black font-bold">{iot.status}</span></p>
                                <p className="text-md font-thin">Data Baru = <span  className="text-black font-bold">{iot.ssid}</span></p>
                                <p className="text-md font-thin">Data Baru = <span  className="text-black font-bold">{iot.passwrd ? iot.password : 'null'}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </main>
    );
}