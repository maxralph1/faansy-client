import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useStories() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getStories({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getStories({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/stories`, { signal })
        // return axiosInstance.get(`stories`, { signal })
            .then(response => setStories(response.data.data))
            .catch(() => {});
    }

    return { stories, getStories }
}
