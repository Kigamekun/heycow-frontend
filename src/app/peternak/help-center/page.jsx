'use client'


// Import untuk form 
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from "react";

// import Uppy from "@uppy/core";
// import Dashboard from "@uppy/dashboard";


import { Input } from "@/components/ui/input";


import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi



export default function Home() {
  const { user, logout } = useAuth({ middleware: 'cattleman' })
//   new Uppy().use(Dashboard, { inline: true, target: '#uppy-dashboard' });
    const editorRef = useRef();
  return (
    <>
        
        <h3 className="ml-2 text-emerald-600">Help Center</h3>
        
            {/* Search Bar  */}

        {/* Form section */}
        <div className="justify-center mt-10 d-flex">
            <div className="card p-5 w-[50rem] ">
                <div className="card-boy " >
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Input type="text" className="form-control" id="name" placeholder="Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Input type="email" className="form-control" id="email" placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Jenis Masalah</label>
                            <select className="form-select" id="subject">
                                <option value="">Pilih Keluhan mu</option>
                                <option value="2">Kerusakan Aplikasi</option>
                                <option value="2">Pengiriman</option>
                                <option value="3">Lainnya</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Lampirkan Bukti</label>
                            {/* <Dashboard id="uppy-dashboard" /> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <Editor  
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
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>   
        </div>
             
    </>
  )
}
