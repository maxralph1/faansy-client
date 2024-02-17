import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useWallets() {
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getWallets({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getWallets({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/wallets`, { signal })
        // return axiosInstance.get(`wallets`, { signal })
            .then(response => setWallets(response.data.data))
            .catch(() => {});
    }

    return { wallets, getWallets }
}
