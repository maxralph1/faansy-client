import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function useSubscriptions(page = 1) {
    const axiosInstance = useAxios();
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getSubscriptions({ signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getSubscriptions(page, { signal } = {}) {
        // return axios.get(`${ Constants.serverURL }/api/subscriptions`, { signal })
        return axiosInstance.get(`subscriptions?page=${page}`, { signal })
            .then(response => {
                setSubscriptions(response.data);
                console.log(response);
            })
            .catch((error) => {console.log(error)});
    }

    return { subscriptions, getSubscriptions }
}
