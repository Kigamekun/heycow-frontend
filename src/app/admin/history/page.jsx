'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import axios from "@/lib/axios";
import { useAuth } from "@/lib/hooks/auth";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import * as React from "react";
import Swal from "sweetalert2";

export default function History() {
    const { user, logout } = useAuth({ middleware: 'admin' })

    const alert = () => {
        Swal.fire({
            title: "Anda bukan admin!",
            text: "Anda tidak memiliki akses ke halaman ini!",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#6A9944",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/peternak'; // Redirect to /peternak
            }
        });
    }
    if (user === 'cattleman') {
        alert()
    }

    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] =
        React.useState({
            image: false,
        })

    const [rowSelection, setRowSelection] = React.useState({});
    const [historyData, setHistoryData] = React.useState([]);
    const [cattleData, setCattleData] = React.useState([]);
    const [IotDeviceData, setIotDeviceData] = React.useState([]);

    const [history_records, setHistory] = React.useState({
        id: 0,
        cattle_id: "",
        record_type: "",
        old_value: "",
        new_value: "",
        recorded_at: "",
        iot_device_id: "",
        created_by: "",
    });



    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setHistory({ ...cattle, [name]: value });

    }

    const handleSelectChange = (event) => {

        const name = event.target.name;
        const { value } = event.target.selectedOptions[0];
        console.log(value);
        setHistory({ ...cattle, [name]: value });

    }

    const [open, setOpen] = React.useState(false)

    const columns = [
        {
            accessorKey: "no",
            header: "No",
            cell: ({ row }) => row.index + 1, // Display row index, starting from 1
        },
        {
            accessorKey: "cattle_id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Cattle ID
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => (

                <div className="flex px-2 py-1">
                    <div>

                    </div>
                    <div className="flex flex-col justify-center">
                        <h6 className="mb-0 text-sm leading-normal dark:text-white">
                            {row.getValue("cattle_id")}
                        </h6>
                        <p className="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
                        </p>
                    </div>
                </div>
            ),
        },


        {
            accessorKey: "record_type",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        record_type
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("record_type")}</div>,
        },

        {
            accessorKey: 'id',
            header: 'Actions',
            cell: info => (
                <div>
                    <button className="text-xs text-white btn btn-warning" onClick={() => editHistory(Number(info.getValue()))}>Edit</button>
                    <button className="ml-2 text-xs btn btn-danger" onClick={() => deleteHistory(Number(info.getValue()))}>Delete</button>
                </div>
            ),
        }
    ];



    // mengambil semua cattle Data
    const getHistoryData = async () => {
        var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/history_records`, {
            headers: {
                'content-type': 'text/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(function (response) {
                if (response.data.data != undefined) {
                    setHistoryData(response.data.data.data);
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
                    setCattleData(response.data.data.data);
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

    //Create History
    const createHistory = async (e) => {
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
        bodyFormData.append('cattle_id', history_records.cattle_id);
        bodyFormData.append('record_type', history_records.record_type);
        bodyFormData.append('old_value', history_records.old_value);
        bodyFormData.append('new_value', history_records.new_value);
        bodyFormData.append('recorded_at', history_records.recorded_at);
        bodyFormData.append('iot_device_id', history_records.iot_device_id);
        bodyFormData.append('created_by', history_records.created_by);

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/history_records`,
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );
            console.log(res.data);
            getHistoryData();

            setHistory({
                id: 0,
                cattle_id: "",
                record_type: "",
                old_value: "",
                new_value: "",
                recorded_at: "",
                iot_device_id: "",
                created_by: "",
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

    const editHistory = async (id) => {
        let hist = historyData.find((f) => f.id === id);
        console.log(hist)
        if (hist) {
            setHistory({
                id: hist.id,
                cattle_id: hist.cattle_id,
                record_type: hist.record_type,
                old_value: hist.old_value,
                new_value: hist.new_value,
                iot_device_id: hist.iot_device_id,
                created_by: hist.created_by,
            });
            setOpen(true);
        }
    }

    const createData = async () => {
        setHistory({
            id: 0,
            cattle_id: "",
            record_type: "",
            old_value: "",
            new_value: "",
            recorded_at: "",
            iot_device_id: "",
            created_by: "",
        });
        seetOpen(true);
    }

    const updateHistory = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Loading...',

            text: 'Mohon tunggu sebentar...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        var bodyFormData = new FormData();

        bodyFormData.append('cattle_id', history_records.cattle_id);
        bodyFormData.append('record_type', history_records.record_type);
        bodyFormData.append('old_value', history_records.old_value);
        bodyFormData.append('new_value', history_records.new_value);
        bodyFormData.append('recorded_at', history_records.recorded_at);
        bodyFormData.append('iot_device_id', history_records.iot_device_id);
        bodyFormData.append('created_by', history_records.created_by);

        var res = await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/history_records/${history_records.id}`,
            {
                id: history_records.id,
                cattle_id: history_records.cattle_id,
                record_type: history_records.record_type,
                old_value: history_records.old_value,
                new_value: history_records.new_value,
                iot_device_id: history_records.iot_device_id,
                created_by: history_records.created_by,
            },
            {
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
            .then(function (response) {
                getHistoryData();
                setHistory({
                    id: 0,
                    cattle_id: "",
                    record_type: "",
                    old_value: "",
                    new_value: "",
                    recorded_at: "",
                    iot_device_id: "",
                    created_by: "",
                })
                Swal.close()

                setOpen(false);
            })
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
    }
    const deleteHistory = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
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
                    await axios.delete(
                        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/history_records/${id}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            }
                        }
                    );
                    await getHistoryData();
                    Swal.fire(
                        'Deleted!',
                        'Your cattle has been deleted.',
                        'success'
                    );
                } catch (error) {

                }
            }
        });
    };

    const table = useReactTable({
        data: historyData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    React.useEffect(() => {
        getHistoryData();
        getIotDeviceData();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>History</h3>
                        <div>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" onClick={createData}>Create History</Button>
                                </DialogTrigger>

                                {/* Add a ref to the dialog */}
                                <DialogContent className={"lg:max-w-[200px]-lg overflow-y-scroll max-h-screen"} >
                                    <DialogHeader>
                                        <DialogTitle className="mb-4">{history_records.id != 0 ? 'Update' : 'Create'} History</DialogTitle>
                                        <DialogDescription>
                                            <form method="dialog" onSubmit={history_records.id != 0 ? updateHistory : createHistory}>
                                                <label className="w-full input-bordered">
                                                    <select
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                        name="cattle_id"
                                                        onChange={handleInputChange}>
                                                        <option value="">Pilih Ternak</option>
                                                        {cattleData && cattleData.map((c) => (
                                                            <option key={c.id} value={c.id}>{c.name}</option>
                                                        ))}
                                                    </select>
                                                </label>


                                                <div>
                                                    <label className="w-full input-bordered">
                                                        <select
                                                            name="record_type"
                                                            onChange={handleSelectChange}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                        >
                                                            <option value="">Record Type</option>
                                                            <option value="delete">Weight</option>
                                                            <option value="create">Height</option>
                                                            <option value="update">Temperature</option>

                                                        </select>
                                                    </label>
                                                </div>

                                                <label className="w-full input-bordered">
                                                    <select
                                                        name="status"
                                                        // value={cattle.status}
                                                        onChange={handleSelectChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    >
                                                        <option value="">Pilih Status Sapimu</option>
                                                        <option value="sehat">Sehat</option>
                                                        <option value="sakit">Sakit</option>
                                                        <option value="mati">Mati</option>
                                                    </select>
                                                </label>

                                                <div className="flex justify-start w-full gap-3 mb-3 input-bordered ">
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

                                                <label className="w-full input-bordered">
                                                    <select
                                                        name="type"
                                                        // value={cattle.type}
                                                        onChange={handleSelectChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    >
                                                        <option value="">Pilih Jenis Sapimu</option>
                                                        <option value="pedaging">Sapi Pedaging</option>
                                                        <option value="peranakan">Sapi Peternak</option>
                                                        <option value="perah">Sapi Perah</option>
                                                    </select>
                                                </label>

                                                <div>
                                                    <label className="w-full input-bordered">
                                                        <select
                                                            name="farm"
                                                            onChange={handleSelectChange}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                        >
                                                            <option value="">Pilih nama farm mu</option>
                                                            {/* {farmData && farmData.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                              ))} */}
                                                            {Array.isArray(farmData) && farmData.map((b) => (
                                                                <option key={b.id} value={b.id}>{b.name}</option>
                                                            ))}
                                                        </select>
                                                    </label>
                                                </div>

                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    value={cattle.birth_date}
                                                    type="date"
                                                    name="birth_date"
                                                    placeholder="birth_date"
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    value={cattle.birth_weight}
                                                    type="text"
                                                    name="birth_weight"
                                                    placeholder="birth_weight"
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    value={cattle.birth_height}
                                                    type="text"
                                                    name="birth_height"
                                                    placeholder="birth_height"
                                                    onChange={handleInputChange}
                                                />

                                                <label className="w-full input-bordered">
                                                    <select
                                                        name="iot_device_id"
                                                        onChange={handleSelectChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                    >
                                                        <option value="">iot device</option>

                                                        {
                                                            IotDeviceData && IotDeviceData.map((b) => {
                                                                return <option key={b.id} value={b.id}>{b.serial_number}</option>
                                                            })
                                                        }

                                                    </select>
                                                </label>

                                                <div className="flex flex-col items-start ">
                                                    <label htmlFor="last_vaccination" className="w-full">Last Vaccination</label>
                                                    <input
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                                                        id="last_vaccination"
                                                        value={cattle.last_vaccination}
                                                        type="date"
                                                        name="last_vaccination"
                                                        placeholder="last_vaccination"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>

                                                <div className="flex justify-end gap-3 ">
                                                    <button type="submit" className="btn">{cattle.id != 0 ? 'Update' : 'Create'} Cattle</button>
                                                </div>
                                            </form>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}