import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function usePolloptions() {
    const [polloptions, setPolloptions] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getPolloptions({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getPolloptions({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/polloptions`, { signal })
        // return axiosInstance.get(`polloptions`, { signal })
            .then(response => setPolloptions(response.data.data))
            .catch(() => {});
    }

    return { polloptions, getPolloptions }
}
