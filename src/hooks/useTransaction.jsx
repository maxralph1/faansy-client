import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function useTransaction(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getTransaction(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createTransaction(user_id, post_id) {
        setLoading(true);
        setErrors({});

        console.log(user_id, post_id)
        return axiosInstance.post('transactions', {user_id, post_id})
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

    async function getTransaction(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/transactions/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateTransaction(transaction) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`transactions/${transaction.id}/`, transaction)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyTransaction(transaction) {
        return axiosInstance.delete(`transactions/${transaction.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        transaction: { data, setData, errors, loading }, 
        getTransaction, 
        createTransaction, 
        updateTransaction, 
        destroyTransaction
    }
}
