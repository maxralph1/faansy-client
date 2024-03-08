import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function useUserbecomecreators(page = 1) {
    const axiosInstance = useAxios();
    const [userBecomecreators, setUserBecomecreators] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getUserBecomecreators({ signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getUserBecomecreators(page, { signal } = {}) {
        return axiosInstance.get(`user-become-creators?page=${page}`, { signal })
            .then(response => {
                console.log(response?.data);
                setUserBecomecreators(response?.data);
            })
            .catch((error) => {console.log(error)});
    }

    return { userBecomecreators, getUserBecomecreators }
}
