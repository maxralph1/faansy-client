import { useState, useEffect } from 'react';
import useAxios from '@/utils/useAxios.jsx';


export function useFanactivities(page = 1) {
    const axiosInstance = useAxios();
    const [fanactivities, setFanactivities] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getFanactivities(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getFanactivities(page, { signal } = {}) {
        return axiosInstance.get(`fanactivities?page=${page}`, { signal })
            .then(response => setFanactivities(response.data))
            .catch((error) => {console.log(error)});
    }

    return { fanactivities, getFanactivities }
}
