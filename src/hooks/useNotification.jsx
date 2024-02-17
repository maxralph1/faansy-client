import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios';
import useAxios from '@/utils/useAxios';


export function useNotification(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getNotification(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createNotification(user_id, post_id) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id)
        return axiosInstance.post('notifications', {user_id, post_id})
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

    async function getNotification(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/notifications/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateNotification(notification) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`notifications/${notification.id}`, notification)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function markAsReadNotification(notification) {
        return axiosInstance.put(`notifications/${notification.id}/mark-as-read`)
            .then(() => {console.log(notification.id)})
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                // swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyNotification(notification) {
        return axiosInstance.delete(`notifications/${notification.id}`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        notification: { data, setData, errors, loading }, 
        getNotification, 
        createNotification, 
        updateNotification, 
        markAsReadNotification,
        destroyNotification
    }
}
