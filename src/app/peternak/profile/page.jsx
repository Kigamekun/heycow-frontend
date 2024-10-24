'use client'

import * as React from 'react';
import { useAuth } from '@/lib/hooks/auth';

export default function Profile() {
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin  '})


    return(
        <>
            <h3 className='text-emerald-600'>Your Profile</h3>
            {/* <Image */}
        </>
    );
}