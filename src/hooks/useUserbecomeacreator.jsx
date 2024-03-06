import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


export function useUserbecomeacreator(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getUserbecomeacreator(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createUserbecomeacreator(userbecomeacreator) {
        setLoading(true);
        setErrors({});

        console.log(userbecomeacreator)
        return axiosInstance.postForm('user-become-creators', userbecomeacreator)
            .then((response) => {
                if (response.status == 201) {
                    swal.fire({
                        text: 'Your request to become a creator is awaiting approval.',
                        color: "#820303",
                        width: 320,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
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

    async function getUserbecomeacreator(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/user-become-creators/${id}`, { signal })
            .then(response => setData(response.data))
            .catch((error) => {
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function updateUserbecomeacreator(userbecomeacreator) {
        setLoading(true);
        setErrors({});

        return axiosInstance.postForm(`user-become-creators/${id}/`, userbecomeacreator)
            .then(() => {})
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function approveUserbecomeacreator(userbecomeacreator) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`user-become-creators/${userbecomeacreator.id}/approve`)
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

    async function rejectUserbecomeacreator(userbecomeacreator) {
        setLoading(true);
        setErrors({});
        console.log(userbecomeacreator)

        return axiosInstance.put(`user-become-creators/${userbecomeacreator.id}/reject`)
            .then((response) => {
                console.log(response);
                console.log(userbecomeacreator)
                console.log(userbecomeacreator?.id)
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

    async function destroyUserbecomeacreator(userbecomeacreator) {
        return axiosInstance.delete(`user-become-creators/${userbecomeacreator.id}/`)
            .then(() => {
                swal.fire({
                    text: 'User become a creator record deleted',
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
        userbecomeacreator: { data, setData, errors, loading }, 
        getUserbecomeacreator, 
        createUserbecomeacreator, 
        updateUserbecomeacreator, 
        approveUserbecomeacreator, 
        rejectUserbecomeacreator, 
        destroyUserbecomeacreator
    }
}
