'use client' 

import * as React from 'react'
import axios from 'axios';

export default function Page( {posts} ){
    return(
        <>
            <h1>Halaman {posts.id}</h1>
        </>
    )
}