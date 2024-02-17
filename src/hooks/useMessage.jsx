import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function useMessage(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getMessage(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createNewMessage(body, participator_1_id, participator_2_id) {
        setLoading(true);
        setErrors({});

        console.log(body, participator_1_id, participator_2_id)
        return axiosInstance.post('messages/new-message', {body, participator_1_id, participator_2_id})
            .then(() => {})
            // .then(() => navigate(route('home.chats.index')))
            // .then(() => window.location.href = (route('home.chats.index')))
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

    async function createMessage(body, chat_id, user_id) {
        setLoading(true);
        setErrors({});

        console.log(body, chat_id, user_id)
        return axiosInstance.post('messages', {body, chat_id, user_id})
            .then((response) => {console.log(response)})
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

    async function getMessage(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/messages/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateMessage(message) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`messages/${message.id}/`, message)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyMessage(message) {
        return axiosInstance.delete(`messages/${message.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        message: { data, setData, errors, loading }, 
        getMessage, 
        createNewMessage, 
        createMessage, 
        updateMessage, 
        destroyMessage
    }
}
