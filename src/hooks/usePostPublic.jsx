import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


export function usePostPublic(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getPost(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function getPost(id, { signal } = {}) {
        setLoading(true);

        return axiosInstance.get(`posts/${id}/show-public`, { signal })
        // return axios.get(`${ Constants.serverURL }/api/posts/${id}`, { signal })
            .then(response => setData(response?.data?.data))
            .catch((error) => {
                console.log(error)
                if (error?.response && error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    return {
        post: { data, setData, errors, loading }, 
        getPost
    }
}
