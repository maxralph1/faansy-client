import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios'
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


export function useFanactivity(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getFanactivity(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function getFanactivity(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/fanactivities/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function destroyFanactivity(fanactivity) {
        return axiosInstance.delete(`fanactivities/${fanactivity?.id}/`)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
            })
            .finally(() => setLoading(false));
    }

    return {
        fanactivity: { data, setData, errors, loading }, 
        getFanactivity, 
        destroyFanactivity
    }
}
