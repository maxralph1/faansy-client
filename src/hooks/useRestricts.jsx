import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useRestricts() {
    const [restricts, setRestricts] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getRestricts({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getRestricts({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/restricts`, { signal })
        // return axiosInstance.get(`restricts`, { signal })
            .then(response => setRestricts(response.data.data))
            .catch(() => {});
    }

    return { restricts, getRestricts }
}
