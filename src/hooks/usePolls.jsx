import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function usePolls(page = 1) {
    const axiosInstance = useAxios();
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getPolls(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getPolls(page, { signal } = {}) {
        // return axios.get(`${ Constants.serverURL }/api/polls`, { signal })
        return axiosInstance.get(`polls?page=${page}`, { signal })
            .then(response => setPolls(response.data))
            .catch((error) => {console.log(error)});
    }

    return { polls, getPolls }
}
