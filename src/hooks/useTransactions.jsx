import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function useTransactions(page = 1) {
    const axiosInstance = useAxios();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getTransactions(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getTransactions(page, { signal } = {}) {
        // return axios.get(`${ Constants.serverURL }/api/transactions`, { signal })
        return axiosInstance.get(`transactions?page=${page}`, { signal })
            .then(response => {
                setTransactions(response.data);
                console.log(response)
            })
            .catch((error) => {console.log(error)});
    }

    return { transactions, getTransactions }
}
