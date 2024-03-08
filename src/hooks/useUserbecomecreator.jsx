import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


export function useUserbecomecreator(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getUserbecomecreator(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createUserbecomecreator(userbecomecreator) {
        setLoading(true);
        setErrors({});

        console.log(userbecomecreator)
        return axiosInstance.postForm('user-become-creators', userbecomecreator)
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

    async function getUserbecomecreator(id, { signal } = {}) {
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

    async function updateUserbecomecreator(userbecomecreator) {
        setLoading(true);
        setErrors({});

        return axiosInstance.postForm(`user-become-creators/${id}/`, userbecomecreator)
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

    async function approveUserbecomecreator(userbecomecreator) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`user-become-creators/${userbecomecreator.id}/approve`)
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

    async function rejectUserbecomecreator(userbecomecreator) {
        setLoading(true);
        setErrors({});
        console.log(userbecomecreator)

        return axiosInstance.postForm(`user-become-creators/reject`, userbecomecreator)
            .then((response) => {
                console.log(response);
                console.log(userbecomecreator)
                // console.log(userbecomecreator?.id)
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

    async function destroyUserbecomecreator(userbecomecreator) {
        return axiosInstance.delete(`user-become-creators/${userbecomecreator.id}/`)
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
        userbecomecreator: { data, setData, errors, loading }, 
        getUserbecomecreator, 
        createUserbecomecreator, 
        updateUserbecomecreator, 
        approveUserbecomecreator, 
        rejectUserbecomecreator, 
        destroyUserbecomecreator
    }
}
