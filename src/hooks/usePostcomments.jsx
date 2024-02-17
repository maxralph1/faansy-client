import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function usePostcomments() {
    const [postcomments, setPostcomments] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getPostcomments({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getPostcomments({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/postcomments`, { signal })
        // return axiosInstance.get(`postcomments`, { signal })
            .then(response => setPostcomments(response.data.data))
            .catch(() => {});
    }

    return { postcomments, getPostcomments }
}
