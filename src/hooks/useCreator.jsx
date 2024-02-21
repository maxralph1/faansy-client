import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function useCreator(username = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (username !== null) {
            const controller = new AbortController();
            getCreator(username, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [username]);

    async function createCreator(user_id, post_id) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id)
        return axiosInstance.post('creators', {user_id, post_id})
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

    async function getCreator(username, { signal } = {}) {
        setLoading(true);

        // return axios.get(`${ Constants.serverURL }/api/creators/${username}`, { signal })
        return axiosInstance.get(`creators/${username}`, { signal })
            .then(response => {
                console.log(response?.data?.data);
                setData(response?.data?.data);
            })
            .catch((error) => {
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function updateCreator(creator) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`creators/${creator.username}`, creator)
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

    async function destroyCreator(creator) {
        return axiosInstance.delete(`creators/${creator.username}/`)
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

    return {
        creator: { data, setData, errors, loading }, 
        getCreator, 
        createCreator, 
        updateCreator, 
        destroyCreator
    }
}
