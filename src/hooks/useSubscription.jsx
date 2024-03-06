import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


export function useSubscription(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getSubscription(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createSubscription(subscribed_id) {
        setLoading(true);
        setErrors({});

        console.log(subscribed_id)
        return axiosInstance.post('subscriptions', {subscribed_id})
            .then(() => {
                // swal.fire({
                //     text: 'Subscribed',
                //     color: "#820303",
                //     width: 200,
                //     position: 'top',
                //     showConfirmButton: false,
                // });
            })
            .catch(error => {
                // console.log(error.response);
                console.log(error);
                // console.log(error.response.data.errors);
                setErrors(error.response);

                if (error.response.status == 401) {
                    navigate(route('index'))
                }

                if (error.response.status == 403) {
                    swal.fire({
                        text: error.response.data.message,
                        color: "#820303",
                        width: 300,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
            })
            .finally(() => setLoading(false));
    }

    async function getSubscription(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/subscriptions/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateSubscription(subscription) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`subscriptions/${subscription.id}/`, subscription)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroySubscription(subscription) {
        return axiosInstance.delete(`subscriptions/${subscription.id}/`)
            .then(() => {})
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        subscription: { data, setData, errors, loading }, 
        getSubscription, 
        createSubscription, 
        updateSubscription, 
        destroySubscription
    }
}
