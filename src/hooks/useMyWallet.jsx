import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useMyWallets(page = 1) {
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getWallets(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getWallets(page, { signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/wallets/my-wallets?page=${page}`, { signal })
        // return axiosInstance.get(`wallets`, { signal })
            .then(response => {
                console.log(response?.data)
                setWallets(response?.data);
            })
            .catch((error) => {console.log(error)});
    }

    return { wallets, getWallets }
}
