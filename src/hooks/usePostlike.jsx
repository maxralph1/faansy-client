import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function usePostlike(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getPostlike(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createPostlike(post_id) {
        setLoading(true);
        setErrors({});

        console.log(post_id)
        return axiosInstance.post('postlikes', {post_id})
            .then(() => {
                // swal.fire({
                //     text: 'Post liked',
                //     color: "#820303",
                //     width: 200,
                //     position: 'top',
                //     showConfirmButton: false,
                // });
            })
            .catch(error => {
                // console.log(error.response);
                // console.log(error.response.data.errors);
                setErrors(error.response);
                // console.log(error)

                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getPostlike(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/postlikes/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function destroyPostlike(postlike) {
        return axiosInstance.delete(`postlikes/${postlike.id}/`)
            .then(() => {
                // swal.fire({
                //     text: 'Post unliked',
                //     color: "#820303",
                //     width: 200,
                //     position: 'top',
                //     showConfirmButton: false,
                // });
            })
            .catch(error => {
                // console.log(error);
                setErrors(error.response);
            })
            .finally(() => setLoading(false));
    }

    return {
        postlike: { data, setData, errors, loading }, 
        getPostlike, 
        createPostlike, 
        destroyPostlike
    }
}
