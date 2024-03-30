import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios';
import swal from 'sweetalert2';
import useAxios from '@/utils/useAxios'


export function useBlock(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getBlock(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createBlock(blocked_id) {
        setLoading(true);
        setErrors({});

        console.log(blocked_id)
        return axiosInstance.post('blocks', {blocked_id})
            .then(() => {
                swal.fire({
                    text: 'User Blocked',
                    color: "#820303",
                    width: 150,
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
            })
            .finally(() => setLoading(false));
    }

    async function getBlock(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/blocks/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateBlock(block) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`blocks/${block.id}/`, block)
            .then(() => navigate(route('home.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyBlock(block) {
        return axiosInstance.delete(`blocks/${block?.id}/delete`)
            .then(() => {})
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    return {
        block: { data, setData, errors, loading }, 
        getBlock, 
        createBlock, 
        updateBlock, 
        destroyBlock
    }
}
