import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useBlocks() {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getBlocks({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getBlocks({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/blocks`, { signal })
        // return axiosInstance.get(`blocks`, { signal })
            .then(response => setBlocks(response.data.data))
            .catch(() => {});
    }

    return { blocks, getBlocks }
}
