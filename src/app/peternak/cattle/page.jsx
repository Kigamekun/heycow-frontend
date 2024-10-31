'use client'

import { Button } from "@/components/ui/button"
import * as React from "react"
import { hoshino } from "@/images/hoshino.jpg"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/modal'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"


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
import { ArrowUpDown } from "lucide-react"
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi


import axios from "axios"
import Swal from "sweetalert2"


export default function Home() {
  const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin  '})
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()

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
            <div className="d-flex justify-between">
              <h3 className="ml-2 text-emerald-600">Manage Cattle</h3>
              {/* <button className="btn btn-success rounded rounded-lg mr-2">Add New Cattle</button> */}
              <Button onClick={onOpen} className="bg-emerald-600 text-md rounded rounded-lg mr-2">Add New Cattle</Button>
            </div>
            
            {/* Section Modal Opened */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="dialog-title flex flex-col gap-1">
                      <h5 className="text-black font-bold">Add New Cattle</h5>
                    </ModalHeader>
                    <ModalBody>
                    <form method="dialog">
                        <input
                          className="input input-bordered w-full mt-5"
                          // value={cattle.name}
                          type="text"
                          name="name"
                          placeholder="Name"
                          onChange={handleInputChange}
                        />


                        <div>
                          <label className="mt-5 input-bordered w-full">
                            <select
                              name="breed_id"
                              onChange={handleSelectChange}
                              className="input input-bordered w-full mt-1"
                            >
                              <option value="">Breed</option>
                              {breedsData && breedsData.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                              ))}
                            </select>
                          </label>
                        </div>
                       
                        <label className="mt-5 input-bordered w-full">
                            <select
                                name="status"
                                // value={cattle.status}
                                onChange={handleSelectChange}
                                className="input input-bordered w-full mt-1"
                            >
                                <option value="">Pilih Status Sapimu</option>
                                <option value="sehat">Sehat</option>
                                <option value="sakit">Sakit</option>
                                <option value="mati">Mati</option>
                            </select>
                        </label>
                       
                        <div className="mt-5 input-bordered w-full flex justify-start gap-3     ">
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

                        <label className="mt-5 input-bordered w-full">
                            <select
                                name="type"
                                // value={cattle.type}
                                onChange={handleSelectChange}
                                className="input input-bordered w-full mt-1"
                            >
                                <option value="">Pilih Jenis Sapimu</option>
                                <option value="pedaging">Sapi Pedaging</option>
                                <option value="peranakan">Sapi Peternak</option>
                                <option value="perah">Sapi Perah</option>
                            </select>
                        </label>

                        <div>
                          <label className="mt-5 input-bordered w-full">
                            <select
                              name="farm"
                              onChange={handleSelectChange}
                              className="input input-bordered w-full mt-1"
                            >
                              <option value="">Pilih nama farm mu</option>
                              {farmData && farmData.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.birth_date}
                          type="date"
                          name="birth_date"
                          placeholder="birth_date"
                          onChange={handleInputChange}
                        />
                        <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.birth_weight}
                          type="text"
                          name="birth_weight"
                          placeholder="birth_weight"
                          onChange={handleInputChange}
                        />
                         <input
                          className="input input-bordered w-full mt-5"
                          value={cattle.birth_height}
                          type="text"
                          name="birth_height"
                          placeholder="birth_height"
                          onChange={handleInputChange}
                        />

                        <label className="mt-5 input-bordered w-full">
                            <select
                                name="iot_device_id"
                                onChange={handleSelectChange}
                                className="input input-bordered w-full mt-1"
                            >
                                <option value="">iot device</option>

                                {
                                    IotDeviceData && IotDeviceData.map((b) => {
                                        return <option key={b.id} value={b.id}>{b.serial_number}</option>
                                    })
                                }
                                
                            </select>
                        </label>
                 
                        <div className="flex flex-col items-start mt-5">
                          <label htmlFor="last_vaccination" className="w-full">Last Vaccination</label>
                          <input
                            className="input input-bordered w-full"
                            id="last_vaccination"
                            value={cattle.last_vaccination}
                            type="date"
                            name="last_vaccination"
                            placeholder="last_vaccination"
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="mt-5 flex justify-end gap-3">
                          <button type="submit" className="btn">{cattle.id != 0 ? 'Update' :'Create'} Cattle</button>
                        </div>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose} className="btn btn-secondary">Close</Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            <div className="mt-4 d-flex grid grid-cols-4 justify-between">
              <div className="card border border-green-500 p-2 m-2">
                <div className="card-body d-flex justify-between gap-2">
                  <img src="https://via.placeholder.com/80" alt="cow" />
                  <div className="d-flex flex-col ">
                    <h6 className="text-emerald-400">Sehat</h6>
                    <p>10</p>
                  </div>

                </div>
              </div>

              <div className="card border p-2 m-2">
                <div className="card-body d-flex justify-between gap-2">
                  <img src="https://via.placeholder.com/80" alt="cow" />
                  <div className="d-flex flex-col ">
                    <h6 className="text-yellow-400">Terjual</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>

              <div className="card border border-red-600 p-2 m-2">
                <div className="card-body d-flex justify-between gap-2">
                  <img src="https://via.placeholder.com/80" alt="cow" />

                  <div className="d-flex flex-col ">
                    <h6 className="text-red-600">Sakit</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>
              <div className="card border border-red-600 p-2 m-2">
                <div className="card-body d-flex justify-between gap-2">
                  <img src="https://via.placeholder.com/80" alt="cow" />

                  <div className="d-flex flex-col ">
                    <h6 className="text-red-600">Mati</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>

              <div className="card  border p-2 m-2">
                <div className="card-body d-flex justify-between gap-2">
                  <img src="https://via.placeholder.com/80" alt="cow" />
                  <div className="d-flex flex-col ">
                    <h6>Pengangon</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar  */}
      <div>
        <div className="card-body float-end">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
        />
        </div>
      </div>

      {/* Cattle section */}
      <div className="container grid grid-cols-3 gap-3 mt-5">
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div >
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}




