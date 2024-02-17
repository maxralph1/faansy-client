import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import useAxios from '@/utils/useAxios'
import axios from 'axios';


export function useBookmarks(page = 1) {
    const axiosInstance = useAxios();
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getBookmarks({ signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getBookmarks(page, { signal } = {}) {
        // return axios.get(`${ Constants.serverURL }/api/bookmarks?page=${page}`, { signal })
        return axiosInstance.get(`bookmarks?page=${page}`, { signal })
            .then(response => {
                console.log(response);
                setBookmarks(response.data);
            })
            .catch((error) => {console.log(error)});
    }

    return { bookmarks, getBookmarks }
}
