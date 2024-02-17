import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function usePollresponses() {
    const [pollresponses, setPollresponses] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getPollresponses({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getPollresponses({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/pollresponses`, { signal })
        // return axiosInstance.get(`pollresponses`, { signal })
            .then(response => setPollresponses(response.data.data))
            .catch(() => {});
    }

    return { pollresponses, getPollresponses }
}
