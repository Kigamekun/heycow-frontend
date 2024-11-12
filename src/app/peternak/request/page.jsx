'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function History() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isBouncing, setIsBouncing] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 500);
    };

    return (
        <>
            <h3 className="mb-4 ml-2 text-emerald-600">Request</h3>
            <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                <div
                    className="grid grid-cols-[1fr_auto] items-center cursor-pointer border-black pb-2"
                    onClick={toggleCollapse}
                >
                    <h3 className="text-lg font-semibold">Rusli</h3>
                    <span
                        className={`text-gray-500 transition-transform duration-200 ${
                            isBouncing ? 'transform scale-125' : ''
                        }`}
                    >
                        {isCollapsed ? '+' : '-'}
                    </span>
                </div>
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isCollapsed ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'
                    }`}
                >
                    {/* First Activity */}
                    <div className="grid justify-items-center">
                        <div className="card w-[1000px]">
                            <div className="card-body p-[3rem]">
                                <div className="grid w-full grid-cols-1 gap-3">
                                    <div className="justify-content-center row">
                                        <div className="col-sm-6">
                                            <h5 className="font-bold text-black">Data Sapi</h5>
                                        </div>
                                        <div className="col-sm-6">
                                            <h5 className="font-bold text-black">Health Record</h5>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8 p-6">
                                        {/* First Table */}
                                        <div className="border border-black rounded-lg">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="text-lg border-b border-black">
                                                        <TableCell>Data</TableCell>
                                                        <TableCell>Sapi</TableCell>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Breed</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Gender</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Date of Birth</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Weight</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Height</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black">
                                                        <TableCell className="text-lg font-bold">IoT Devices</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>

                                        {/* Second Table */}
                                        <div className="border border-black rounded-lg">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="text-lg border-b border-black">
                                                        <TableCell>Data</TableCell>
                                                        <TableCell>Sapi</TableCell>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Breed</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Gender</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Date of Birth</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Weight</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black border-b border-black">
                                                        <TableCell className="text-lg font-bold">Height</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                    <TableRow className="text-black">
                                                        <TableCell className="text-lg font-bold">IoT Devices</TableCell>
                                                        <TableCell className="text-sm font-thin">Name</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 float-end">
                                        <Button className="mr-3 text-white rounded-md bg-emerald-600 ">Terima
                                        </Button>
                                        <Button className="text-white bg-red-500 rounded-md ">Tolak
                                        </Button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
