'use client'


import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
export default function Notification() {
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' });
    const [notificationData, setNotificationData] = useState([]);
    const toggleCollapse = (index) => {
        setIsCollapsed(!isCollapsed);
        setCollapsedIndex(collapsedIndex === index ? null : index);
    };
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [collapsedIndex, setCollapsedIndex] = useState(null);
    const getNotificationData = async () => {
        console.log('get notification...')
        try{
            var response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/notifications`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }}
            )
            console.log('Notification data:', response.data.data)
            setNotificationData(response.data.data)
        }catch(error){
            console.error('Error fetching notification data:', error)
        }
    }
    const getStatusClass = (type) => {
        if (type === 'success') {
            return 'bg-emerald-600';
        } else if (type === 'warning') {
            return 'bg-yellow-400';
        } else if (type === 'error') {
                return 'bg-red-700';
        } 
    };
    useEffect(() => {
        getNotificationData();
    }, [user]);
    return(
        <>
            <h3 className="mb-4 ml-2 text-emerald-600">Contract</h3>
            <div className="grid grid-cols-1 gap-6">
                {notificationData && notificationData.map((notification, index) => (
                <div key={index} className="d-flex justify-center">
                    <div className="w-[60rem] p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                        <div
                            className="grid grid-cols-[1fr_auto] items-center cursor-pointer border-black "
                            onClick={() => toggleCollapse(index)}
                        >
                            <h3 className="text-lg font-semibold float-start">{notification.title}</h3>
                            <h3 className={`text-sm text-white p-2 rounded-xl font-semibold float-end ${getStatusClass(notification.type)}`}>{notification.type}</h3>
                            <span
                            className={`text-gray-500 transition-transform duration-200 ${collapsedIndex === index ? 'transform scale-125' : ''}`}
                            >
                            {collapsedIndex === index ? '-' : '+'}
                            </span>
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${collapsedIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="grid">
                            <p className="text-md font-thin">{notification.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </>
    )
}
