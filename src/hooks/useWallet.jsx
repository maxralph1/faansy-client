import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios.jsx';


export function useWallet(user_id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (user_id !== null) {
            const controller = new AbortController();
            getWallet(user_id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [user_id]);

    async function getWallet(user_id, { signal } = {}) {
        setLoading(true);

        // return axios.get(`${ Constants.serverURL }/api/wallets/${user_id}`, { signal })
        return axiosInstance.get(`wallets/${user_id}`, { signal })
            .then(response => setData(response.data.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateWallet(wallet) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`wallets/${wallet.user_id}/`, wallet)
            .then(response => setData(response.data))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyWallet(wallet) {
        return axiosInstance.delete(`wallets/${wallet.user_id}/`)
            .then(response => setData(response.data))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        wallet: { data, setData, errors, loading }, 
        getWallet, 
        updateWallet, 
        destroyWallet
    }
}
