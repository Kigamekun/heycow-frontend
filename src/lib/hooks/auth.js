import useSWR from 'swr';
import axios from '../axios';
import {
    useEffect
} from 'react';
import {
    useRouter
} from 'next/navigation';
import Swal from 'sweetalert2';

export const useAuth = ({
    middleware,
    redirectIfAuthenticated
} = {}) => {
    const router = useRouter();
    const {
        data: user,
        error,
        mutate
    } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/me`, () =>
        axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true 
        })
        .then(res => res.data.data)
        .catch(error => {
            if (error.response.status !== 409) throw error;
            router.push('/verify-email');
        }), {
            revalidateOnMount: true
        }
    );

    const isUser = true;

    const handleRedirect = () => {
        if (isUser) router.push("/home");
    };

    const register = async ({
        setErrors,
        setStatus,
        ...props
    }) => {
        setErrors([]);
        setStatus(null);

        const loadingSwal = Swal.fire({
            title: 'Loading...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/register`, props)
                .then(function (response) {
                    setStatus('success');
                    loadingSwal.close();
                    router.push('/auth/login');
                })
                .catch(function (error) {
                    console.log('Error:', error);
                });

        } catch (error) {
            console.log('Error:', error);
            if (error.response && error.response.status !== 422) throw error;
            Swal.fire({
                icon: 'error',
                title: 'Credential is wrong',
                showConfirmButton: false,
                timer: 1500
            });
            setErrors(error.response.data.errors);
        }
    };

    const login = async ({
        setErrors,
        setStatus,
        ...props
    }) => {
        setErrors([]);
        setStatus(null);

        const loadingSwal = Swal.fire({
            title: 'Loading...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/login`, props)
                .then(function (response) {
                    const token = response.data.data;
                    localStorage.setItem('token', token);
                    console.log('Token:', token);
                    setStatus('success');
                    loadingSwal.close();
                    const loggedInUser = {
                        token
                    };
                    mutate(loggedInUser);
                    handleRedirect();
                })
                .catch(function (error) {
                    console.log('Error:', error);
                });

        } catch (error) {
            if (error.response && error.response.status !== 422) throw error;
            Swal.fire({
                icon: 'error',
                title: 'Credential is wrong',
                showConfirmButton: false,
                timer: 1500
            });
            setErrors(error.response.data.errors);
        }
    };

    const forgotPassword = async ({
        setErrors,
        setStatus,
        email
    }) => {
        setErrors([]);
        setStatus(null);

        axios
            .post('/forgot-password', {
                email
            })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response && error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({
        setStatus
    }) => {
        axios.post('/email/verification-notification')
            .then(response => setStatus(response.data.status));
    };

    const logout = async () => {
        localStorage.removeItem('token');
        window.location.pathname = '/auth/login';
    };

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            handleRedirect();
        }
        if ((middleware === 'auth' || middleware === 'user') && user) {}
    }, [user, error]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resendEmailVerification,
        logout,
    };
};