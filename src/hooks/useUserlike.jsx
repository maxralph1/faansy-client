import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function useUserlike(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getUserlike(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createUserlike(user_id, post_id) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id)
        return axiosInstance.post('userlikes', {user_id, post_id})
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error.response);
                // console.log(error.response.data.errors);
                setErrors(error.response);

                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getUserlike(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/userlikes/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateUserlike(userlike) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`userlikes/${userlike.id}/`, userlike)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyUserlike(userlike) {
        return axiosInstance.delete(`userlikes/${userlike.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
            })
            .finally(() => setLoading(false));
    }

    return {
        userlike: { data, setData, errors, loading }, 
        getUserlike, 
        createUserlike, 
        updateUserlike, 
        destroyUserlike
    }
}
