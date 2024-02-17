import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useUserlikes() {
    const [userlikes, setUserlikes] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getUserlikes({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getUserlikes({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/userlikes`, { signal })
        // return axiosInstance.get(`userlikes`, { signal })
            .then(response => setUserlikes(response.data.data))
            .catch((error) => {console.log(error)});
    }

    return { userlikes, getUserlikes }
}
