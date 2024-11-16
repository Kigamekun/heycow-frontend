'use client'

import axios from "axios";
import { useEffect, useState } from "react";

export default function History() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isBouncing, setIsBouncing] = useState(false);
    const [collapsedIndex, setCollapsedIndex] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const toggleCollapse = (index) => {
        setIsCollapsed(!isCollapsed);
        // setIsBouncing(true);
        // setTimeout(() => setIsBouncing(false), 500);
        setCollapsedIndex(collapsedIndex === index ? null : index);
    };

    const getHistoryData = async () => {
        console.log('Fetching history data...');
        try{
            var res = axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/history_records`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('History data:', res.data.data);
            setHistoryData(res.data.data);
        }catch(error){
            console.error('Error fetching history data:', error);
        }
    }

    useEffect(() => {
        getHistoryData();
    }, []);
    return (
        <>
        <h3 className="mb-4 ml-2 text-emerald-600">History</h3>
        <div className="d-flex justify-center grid grid-cols-1 gap-6">
            {historyData.map((history, index) => (
                <div key={index} className="flex items-center w-full p-2 mx-auto mb-3 bg-white rounded-lg shadow-sm">
                    {/* Date Icon */}
                    <div className="flex flex-col items-center justify-center ml-2 font-semibold leading-tight text-white rounded-full w-14 h-14 bg-emerald-500">
                        <div className="text-center">
                            <h5 className="mt-2 text-lg text-white">{new Date(history.date).getDate()}</h5>
                            <p className="-mt-2 text-xs">{new Date(history.date).toLocaleDateString('id-ID', { weekday: 'long' })}</p>
                        </div>
                    </div>

                        {/* Activity Details */}
                    <div className="items-center mt-2 ml-4 space-y-1">
                        <h6 className="font-semibold text-gray-800">{history.activity}</h6>
                        <p className="text-gray-600">{history.details}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="d-flex justify-center">
            <div className="p-4 w-[55rem] bg-white border rounded-lg shadow-sm">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={toggleCollapse}
                >
                    <h3 className="text-lg font-semibold">November 2024</h3>
                    <span
                        className={`text-gray-500 transition-transform duration-200 ${
                            isBouncing ? 'transform scale-125' : ''
                        }`}
                    >
                        {isCollapsed ? '+' : '-'}
                    </span>
                </div>
                <p className="text-gray-600">
                    {isCollapsed ? '1 Activity' : '1 Activity (click to hide details)'}
                </p>

                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isCollapsed ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'
                    }`}
                >
                    {/* First Activity */}
                    <div className="flex items-center w-full p-2 mx-auto mb-3 bg-white rounded-lg shadow-sm">
                        {/* Date Icon */}
                        <div className="flex flex-col items-center justify-center ml-2 font-semibold leading-tight text-white rounded-full w-14 h-14 bg-emerald-500">
                            <div className="text-center">
                                <h5 className="mt-2 text-lg text-white">28</h5>
                                <p className="-mt-2 text-xs">Senin</p>
                            </div>
                        </div>

                        {/* Activity Details */}
                        <div className="items-center mt-2 ml-4 space-y-1">
                            <h6 className="font-semibold text-gray-800">Temperature Measurement</h6>
                            <p className="text-gray-600">Cattle 1</p>
                            <p className="text-gray-600">Temperature: 39 ℃</p>
                        </div>
                    </div>

                    {/* Second Activity */}
                    <div className="flex items-center w-full p-2 mx-auto bg-white rounded-lg shadow-sm">
                        {/* Date Icon */}
                        <div className="flex flex-col items-center justify-center ml-2 font-semibold leading-tight text-white rounded-full w-14 h-14 bg-emerald-500">
                            <div className="text-center">
                                <h5 className="mt-2 text-lg text-white">29</h5>
                                <p className="-mt-2 text-xs">Rabu</p>
                            </div>
                        </div>

                        {/* Activity Details */}
                        <div className="items-center mt-4 ml-4">
                            <h6 className="font-semibold text-gray-800">Weight Measurement</h6>
                            <p className="text-gray-600">Weight: 173 kg</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
