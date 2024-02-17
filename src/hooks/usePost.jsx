import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function usePost(id = null) {
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

    async function createPost(post) {
        setLoading(true);
        setErrors({});

        console.log(post)
        return axiosInstance.postForm('posts', post)
            .then(() => {
                swal.fire({
                    text: 'Post added',
                    color: "#820303",
                    width: 200,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                // swalUnauthAlert(error);
                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getPost(id, { signal } = {}) {
        setLoading(true);

        return axiosInstance.get(`${ Constants.serverURL }/api/posts/${id}`, { signal })
            .then(response => setData(response?.data?.data))
            .catch((error) => {
                console.log(error)
                if (error?.response && error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function updatePost(post) {
        setLoading(true);
        setErrors({});
        // console.log(param)
        console.log(post)

        return axiosInstance.post(`posts/${id}`, post)
            .then((response) => {
                swal.fire({
                    text: 'Post updated',
                    color: "#820303",
                    width: 200,
                    position: 'top',
                    showConfirmButton: false,
                });
                console.log(response)
                navigate(route('home.index'))
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function destroyPost(post) {
        return axiosInstance.delete(`posts/${post.id}/`)
            .then(() => {
                swal.fire({
                    text: 'Post deleted',
                    color: "#820303",
                    width: 200,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                // console.log(error);
                setErrors(error.response);
                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    return {
        post: { data, setData, errors, loading }, 
        getPost, 
        createPost, 
        updatePost, 
        destroyPost
    }
}
