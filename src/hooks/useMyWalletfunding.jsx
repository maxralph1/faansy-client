import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useMyWalletfundings(page = 1) {
    const [walletfundings, setWalletfundings] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getWalletfundings(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getWalletfundings(page, { signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/walletfundings/my-walletfundings?page=${page}`, { signal })
        // return axiosInstance.get(`walletfundings`, { signal })
            .then(response => {
                console.log(response?.data)
                setWalletfundings(response?.data);
            })
            .catch((error) => {console.log(error)});
    }

    return { walletfundings, getWalletfundings }
}
