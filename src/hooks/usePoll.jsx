import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


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

    async function createPoll(questionnaire, close_time, poll_option_1, poll_option_2, poll_option_3, poll_option_4) {
        setLoading(true);
        setErrors({});

        console.log(questionnaire, close_time, poll_option_1, poll_option_2, poll_option_3, poll_option_4)
        return axiosInstance.post('polls', {questionnaire, close_time, poll_option_1, poll_option_2, poll_option_3, poll_option_4})
            .then(response => setData(response.data))
            .catch(error => {
                console.log(error.response);
                // console.log(error.response.data.errors);
                setErrors(error.response);

                if (error.response.status == 401) {
                    navigate(route('index'))
                }
                if (error?.response?.status == 403) {
                    swal.fire({
                        text: 'You must be a creator before you can add polls',
                        color: "#820303",
                        width: 350,
                        position: 'top',
                        showConfirmButton: false,
                    });
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
