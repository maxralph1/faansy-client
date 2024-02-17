import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function usePoll(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getPoll(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createPoll(user_id, questionnaire, close_time) {
        setLoading(true);
        setErrors({});

        console.log(user_id, questionnaire, close_time)
        return axiosInstance.post('polls', {user_id, questionnaire, close_time})
            .then(response => setData(response.data))
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

    async function getPoll(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/polls/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updatePoll(poll) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`polls/${poll.id}/`, poll)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyPoll(poll) {
        return axiosInstance.delete(`polls/${poll.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        poll: { data, setData, errors, loading }, 
        getPoll, 
        createPoll, 
        updatePoll, 
        destroyPoll
    }
}
