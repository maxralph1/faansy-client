import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function useRestrict(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getRestrict(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createRestrict(user_id, post_id) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id)
        return axiosInstance.post('restricts', {user_id, post_id})
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

    async function getRestrict(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/restricts/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateRestrict(restrict) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`restricts/${restrict.id}/`, restrict)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyRestrict(restrict) {
        return axiosInstance.delete(`restricts/${restrict.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        restrict: { data, setData, errors, loading }, 
        getRestrict, 
        createRestrict, 
        updateRestrict, 
        destroyRestrict
    }
}
