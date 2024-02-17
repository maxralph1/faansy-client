import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useMessages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getMessages({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getMessages({ signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/messages`, { signal })
        // return axiosInstance.get(`messages`, { signal })
            .then(response => setMessages(response.data.data))
            .catch(() => {});
    }

    return { messages, getMessages }
}
