import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';
import useAxios from '@/utils/useAxios.jsx';
// import axios from 'axios';


export function useNotifications() {
    const axiosInstance = useAxios();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getNotifications({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getNotifications({ signal } = {}) {
        // return axios.get(`${ Constants.serverURL }/api/notifications`, { signal })
        return axiosInstance.get(`notifications`, { signal })
            .then(response => setNotifications(response.data))
            .catch((error) => {console.log(error)});
    }

    return { notifications, getNotifications }
}
