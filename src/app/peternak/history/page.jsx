'use client'

import axios from "axios";
import { useEffect, useState } from "react";

export default function History() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isBouncing, setIsBouncing] = useState(false);
    const [collapsedIndex, setCollapsedIndex] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [cattleHistory, setCattleHistory] = useState([]);
    const [cattleData, setCattleData] = useState([]);
    const toggleCollapse = (index) => {
        setIsCollapsed(!isCollapsed);
        // setIsBouncing(true);
        // setTimeout(() => setIsBouncing(false), 500);
        setCollapsedIndex(collapsedIndex === index ? null : index);
    };

    const getHistoryData = async () => {
        console.log('Fetching history data...');
        try{
            var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/history_records`, {
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

    const getCattleData = async() => {
        console.log('Fetching cattle data...');
        try{
            var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log('Cattle data:', res.data.data);
            setCattleData(res.data.data);
        }catch(error){
            console.error('Error fetching cattle data:', error);
        }
    }
    const getCattleHistory = async (cattleId) => {
        console.log('Fetching cattle history data...');
        try {
            var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/history_records?cattle_id=${cattleData.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCattleHistory(res.data.data);
            console.log('Cattle history data:', res.data.data);
            setHistoryData(res.data.data);
        } catch (error) {
            console.error('Error fetching cattle history data:', error);
        }
    }
    const getStatusClass = (record_type) => { 
        if (record_type === 'iot_device') {
          return 'bg-yellow-400';
        } else if (record_type === 'height') {
          return 'bg-blue-400';
        } else if (record_type === 'weight') {
          return 'bg-purple-400';
        }
      }
    console.log(historyData.message)
    useEffect(() => {
        getHistoryData();
        getCattleData();
        getCattleHistory()
    }, []);
    return (
        <>
         <h3 className="mb-4 ml-2 text-emerald-600">History</h3>
            <div className="grid grid-cols-1 gap-6">
                {historyData && historyData.map((history, index) => (
                <div key={index} className="d-flex justify-center">
                    <div className="w-[60rem] p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                        <div
                            className="grid grid-cols-[1fr_auto] items-center cursor-pointer border-black "
                            onClick={() => toggleCollapse(index)}
                        >
                            <h3 className="text-xl font-semibold float-start">{history.message}</h3>
                            <h3 className={`text-sm rounded-md p-2  font-semibold float-end text-white ${getStatusClass(history.record_type)}`}>{history.record_type}</h3>
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
                                <p className="text-md font-thin">Data Lama = <span className="text-black font-bold">{history.old_value}</span></p>
                                <p className="text-md font-thin">Data Baru = <span  className="text-black font-bold">{history.new_value}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </>
    );
}
