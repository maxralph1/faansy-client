import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function useUserverifications(page = 1) {
    const axiosInstance = useAxios();
    const [userVerifications, setUserVerifications] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getUserVerifications({ signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getUserVerifications(page, { signal } = {}) {
        return axiosInstance.get(`user-verifications?page=${page}`, { signal })
            .then(response => {
                console.log(response?.data);
                setUserVerifications(response?.data);
            })
            .catch((error) => {console.log(error)});
    }

    return { userVerifications, getUserVerifications }
}
