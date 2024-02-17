import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import swal from 'sweetalert2';
import axios from 'axios'
import useAxios from '@/utils/useAxios.jsx';


export function usePostcomment(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getPostcomment(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createPostcomment(post_id, body) {
        setLoading(true);
        setErrors({});

        console.log(post_id, body)
        return axiosInstance.post('postcomments', {post_id, body})
            .then(() => {
                // swal.fire({
                //     text: 'Post commented on',
                //     color: "#820303",
                //     width: 275,
                //     position: 'top',
                //     showConfirmButton: false,
                // });
            })
            .catch(error => {
                console.log(error);
                // console.log(error.response.data.errors);
                setErrors(error.response);

                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getPostcomment(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`${ Constants.serverURL }/api/postcomments/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updatePostcomment(postcomment) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`postcomments/${postcomment.id}/`, postcomment)
            .then(() => {
                swal.fire({
                    text: 'Comment updated',
                    color: "#820303",
                    width: 275,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyPostcomment(postcomment) {
        return axiosInstance.delete(`postcomments/${postcomment.id}/`)
            .then(() => {
                swal.fire({
                    text: 'Commented deleted',
                    color: "#820303",
                    width: 275,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    return {
        postcomment: { data, setData, errors, loading }, 
        getPostcomment, 
        createPostcomment, 
        updatePostcomment, 
        destroyPostcomment
    }
}
