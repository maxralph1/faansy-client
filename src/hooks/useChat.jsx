import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function useChat(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getChat(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createChat(participator_1_id, participator_2_id) {
        setLoading(true);
        setErrors({});

        console.log(participator_1_id, participator_2_id)
        return axiosInstance.post('chats', {participator_1_id, participator_2_id})
            .then((response) => {
                setData(response.data)
                console.log(response.data);
                navigate(route('home.chats.index'))
            })
            .catch(error => {
                console.log(error);
                // console.log(error.response.data.errors);
                setErrors(error.response);

                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getChat(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/chats/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateChat(chat) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`chats/${chat.id}/`, chat)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyChat(chat) {
        return axiosInstance.delete(`chats/${chat.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        chat: { data, setData, errors, loading }, 
        getChat, 
        createChat, 
        updateChat, 
        destroyChat
    }
}
