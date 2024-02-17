import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function useWalletfunding(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getWalletfunding(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createWalletfunding(user_id, post_id) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id)
        return axiosInstance.post('walletfundings', {user_id, post_id})
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

    async function getWalletfunding(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/walletfundings/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateWalletfunding(walletfunding) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`walletfundings/${walletfunding.id}/`, walletfunding)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyWalletfunding(walletfunding) {
        return axiosInstance.delete(`walletfundings/${walletfunding.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        walletfunding: { data, setData, errors, loading }, 
        getWalletfunding, 
        createWalletfunding, 
        updateWalletfunding, 
        destroyWalletfunding
    }
}
