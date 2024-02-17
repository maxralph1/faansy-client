import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function useCards(page = 1) {
    const axiosInstance = useAxios();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getCards(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getCards(page, { signal } = {}) {
        // return axios.get(`${ Constants.serverURL }/api/cards`, { signal })
        return axiosInstance.get(`cards?page=${page}`, { signal })
            .then(response => setCards(response.data))
            .catch((error) => {console.log(error)});
    }

    return { cards, getCards }
}
