'use client'

// Import untuk form 
// import { Editor } from '@tinymce/tinymce-react';
// import { useRef } from "react";

// import Uppy from "@uppy/core";
// import Dashboard from "@uppy/dashboard";


import { Input } from "@/components/ui/input";


import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Textarea } from '@nextui-org/react';
import { useState } from 'react';


export default function Home() {
  useAuth({ middleware: 'cattleman' })
//   new Uppy().use(Dashboard, { inline: true, target: '#uppy-dashboard' });
    // const editorRef = useRef();
    // const handleEditorChange = (content, editor) => {
    //     console.log('Content was updated:', content);
    // }
    const [helpCenterData, setHelpCenterData] = useState({
        name: '',
        email: '',
        question: ''
    })
    const postHelpCenter = async () => {
        console.log('mengirim data....')
        const bodyFormData = new FormData();
        bodyFormData.append('name', helpCenterData.name);
        bodyFormData.append('email', helpCenterData.email);
        bodyFormData.append('question', helpCenterData.question);
        
        try{
            var response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/help_centers`, bodyFormData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log('Response:', response.data)
            if(response.data){
                setHelpCenterData({
                    name: '',
                    email: '',
                    question: ''
                },
                Swal.fire({
                    title: "Success",
                    text: "Pertanyaan Anda berhasil terkirim",
                    icon: "success",
                    confirmButtonText: "OK"
                }))
                
            }
        }catch(error){
            console.log('Error:', error)
            Swal.fire({
                title: "Error",
                text: "Terjadi kesalahan saat mengirim pertanyaan Anda",
                icon: "error",
                confirmButtonText: "OK"
            })
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHelpCenterData({
            ...helpCenterData,
            [name]: value
        })
    }
  return (
    <>
        
        <h3 className="ml-2 text-emerald-600">Help Center</h3>
        
            {/* Search Bar  */}

        {/* Form section */}
        <div className="justify-center mt-10 d-flex">
            <div className="card p-5 w-[50rem] ">
                <div className="card-boy " >
                  
                    <form onSubmit={(e) => { e.preventDefault(); postHelpCenter(); }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label text-xl">Name</label>
                            <Input type="text" value={helpCenterData.name} className="form-control h-10" id="name" name="name" placeholder="Name" onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-xl">Email</label>
                            <Input type="email" value={helpCenterData.email} className="form-control h-10" id="email" name="email" onChange={handleInputChange} placeholder="Email" />
                        </div>
                       
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label text-xl">Pertanyaan</label>
                            <Textarea className="form-control h-[20rem]" type="text" name="question" value={setHelpCenterData.question} onChange={handleInputChange} id="message" placeholder="Masukkan Pertanyaan Anda" />
                            {/* <Editor  
                                apiKey='vbch5as7kp2v4czumq6x79pj95t4gpblp8wb90gijtnke8n4'
                                init={{
                                    plugins: [
                                      // Core editing features
                                      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                      // Your account includes a free trial of TinyMCE premium features
                                      // Try the most popular premium features until Nov 13, 2024:
                                      'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                                      // Early access to document converters
                                      'importword', 'exportword', 'exportpdf'
                                    ],
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                      { value: 'First.Name', title: 'First Name' },
                                      { value: 'Email', title: 'Email' },
                                    ],
                                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                                    exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
                                    exportword_converter_options: { 'document': { 'size': 'Letter' } },
                                    importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline',	'defaults': 'inline', } },
                                  }}

                                  initialValue="Masukkan Keluhan Anda"
                                  value={helpCenterData.question}
                                    onEditorChange={handleEditorChange}
                            /> */}
                        </div>
                        <Button type="submit" className="text-white rounded-xl text-xl bg-emerald-600" onClick={postHelpCenter}>Submit</Button>
                    </form>
                </div>
            </div>   
        </div>
             
    </>
  )
}
