import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function usePostlikes() {
    const [postlikes, setPostlikes] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getPostlikes({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getPostlikes({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/postlikes`, { signal })
        // return axiosInstance.get(`postlikes`, { signal })
            .then(response => setPostlikes(response.data.data))
            .catch((error) => {console.log(error)});
    }

    return { postlikes, getPostlikes }
}
