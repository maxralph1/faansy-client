import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useTips() {
    const [tips, setTips] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getTips({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getTips({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/tips`, { signal })
        // return axiosInstance.get(`tips`, { signal })
            .then(response => setTips(response.data.data))
            .catch(() => {});
    }

    return { tips, getTips }
}
