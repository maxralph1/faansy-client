import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useWalletfundings() {
    const [walletfundings, setWalletfundings] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getWalletfundings({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getWalletfundings({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/walletfundings`, { signal })
        // return axiosInstance.get(`walletfundings`, { signal })
            .then(response => setWalletfundings(response.data.data))
            .catch(() => {});
    }

    return { walletfundings, getWalletfundings }
}
