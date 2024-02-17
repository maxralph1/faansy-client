import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function usePollresponse(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getPollresponse(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createPollresponse(user_id, post_id) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id)
        return axiosInstance.post('pollresponses', {user_id, post_id})
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

    async function getPollresponse(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/pollresponses/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updatePollresponse(pollresponse) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`pollresponses/${pollresponse.id}/`, pollresponse)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyPollresponse(pollresponse) {
        return axiosInstance.delete(`pollresponses/${pollresponse.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        pollresponse: { data, setData, errors, loading }, 
        getPollresponse, 
        createPollresponse, 
        updatePollresponse, 
        destroyPollresponse
    }
}
