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
        .then(res => res.data)
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
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/register`, props)
                .then(function (response) {
                    const token = response.data;
                    localStorage.setItem('token', token.access_token);
                    localStorage.setItem('user', JSON.stringify(token.user));
                    setStatus('success');
                    loadingSwal.close();
                    // router.push('/peternak');
                    const registeredInUser = {
                        token
                    };
                    mutate(registeredInUser);
                    handleRedirect();
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
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/login`, props)
                .then(function (response) {
                    const token = response.data;
                    localStorage.setItem('token', token.access_token);
                    localStorage.setItem('user', JSON.stringify(token.user));
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
                    Swal.fire({
                        icon: 'error',
                        title: 'Credential is wrong',
                        showConfirmButton: false,
                        timer: 1500
                    });

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
        localStorage.removeItem('user');
        window.location.pathname = '/login';
    };

    useEffect(() => {

        if (middleware === 'admin' && user) {
            if (user.role !== 'admin') {
                router.push('/peternak');
            }
        }


        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            console.log('User:', user);
            if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/peternak');
            }
        }
        if ((middleware === 'admin' || middleware === 'peternak') && user) {}
    }, [user, error]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resendEmailVerification,
        logout,
        mutate
    };
};