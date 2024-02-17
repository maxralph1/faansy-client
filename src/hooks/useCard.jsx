import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios'


export function useCard(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getCard(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createCard(address, city, state_province, country, card_number, expiration, cvc, name_on_card, email) {
        setLoading(true);
        setErrors({});

        console.log(address, city, state_province, country, card_number, expiration, cvc, name_on_card, email)
        return axiosInstance.post('cards', {address, city, state_province, country, card_number, expiration, cvc, name_on_card, email})
            .then((response) => console.log(response))
            .catch(error => {
                console.log(error.response);
                // console.log(error.response.data.errors);
                setErrors(error.response);

                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getCard(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/cards/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateCard(card) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`cards/${card.id}/`, card)
            .then((response) => console.log(response))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyCard(card) {
        return axiosInstance.delete(`cards/${card.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        card: { data, setData, errors, loading }, 
        getCard, 
        createCard, 
        updateCard, 
        destroyCard
    }
}
