import { useState, useEffect } from 'react';
import useAxios from '@/utils/useAxios.jsx';


export function useFanlists(page = 1) {
    const axiosInstance = useAxios();
    const [fanlists, setFanlists] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getFanlists(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getFanlists(page, { signal } = {}) {
        return axiosInstance.get(`fanlists?page=${page}`, { signal })
            .then(response => setFanlists(response.data))
            .catch((error) => {console.log(error)});
    }

    return { fanlists, getFanlists }
}