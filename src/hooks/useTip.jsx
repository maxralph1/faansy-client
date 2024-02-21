import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


export function useTip(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getTip(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createTip(recipient_id, amount) {
        setLoading(true);
        setErrors({});

        console.log(recipient_id, amount)
        return axiosInstance.post('tips', {recipient_id, amount})
            .then(() => {
                swal.fire({
                    text: `You just gave a tip of ${amount}$`,
                    color: "#820303",
                    width: 300,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                console.log(error.response);
                // console.log(error.response.data.errors);
                setErrors(error.response);

                if (error.response.status == 401) {
                    navigate(route('index'))
                }

                if (error.response.status == 409) {
                    swal.fire({
                        text: `${error.response.data.message}`,
                        color: "#820303",
                        width: 300,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
            })
            .finally(() => setLoading(false));
    }

    async function getTip(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/tips/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateTip(tip) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`tips/${tip.id}/`, tip)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyTip(tip) {
        return axiosInstance.delete(`tips/${tip.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        tip: { data, setData, errors, loading }, 
        getTip, 
        createTip, 
        updateTip, 
        destroyTip
    }
}
