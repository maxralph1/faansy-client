import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


export function useUserverification(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getUserverification(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createUserverification(userverification) {
        setLoading(true);
        setErrors({});

        console.log(userverification)
        return axiosInstance.postForm('user-verifications', userverification)
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    swal.fire({
                        text: 'User verification started',
                        color: "#820303",
                        width: 320,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
                console.log('success');
            })
            .catch(error => {
                console.log(error);
                // console.log(error.response.data.errors);
                setErrors(error?.response);

                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getUserverification(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/user-verifications/${id}`, { signal })
            .then(response => setData(response.data))
            .catch((error) => {
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function updateUserverification(userverification) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`user-verifications/${userverification.id}/`, userverification)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function approveUserverification(userverification) {
        setLoading(true);
        setErrors({});

        return axiosInstance.post(`user-verifications/${userverification.id}/approve`)
            .then((response) => {
                console.log(response);
                swal.fire({
                    text: 'Approved',
                    color: "#820303",
                    width: 150,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function rejectUserverification(userverification) {
        setLoading(true);
        setErrors({});
        console.log(userverification)

        return axiosInstance.postForm(`user-verifications/reject`, userverification)
            .then((response) => {
                console.log(response);
                console.log(userverification)
                // console.log(userverification?.id)
                swal.fire({
                    text: 'Rejected',
                    color: "#820303",
                    width: 150,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function destroyUserverification(userverification) {
        return axiosInstance.delete(`user-verifications/${userverification.id}/`)
            .then(() => {
                swal.fire({
                    text: 'User verification record deleted',
                    color: "#820303",
                    width: 350,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    return {
        userverification: { data, setData, errors, loading }, 
        getUserverification, 
        createUserverification, 
        updateUserverification, 
        approveUserverification, 
        rejectUserverification, 
        destroyUserverification
    }
}
