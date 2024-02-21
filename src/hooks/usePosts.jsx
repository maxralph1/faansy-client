import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function usePosts(page = 1) {
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getPosts(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getPosts(page, { signal } = {}) {
        // return axios.get(`${ Constants.serverURL }/api/posts?page=${page}`, { signal })
        return axiosInstance.get(`posts?page=${page}`, { signal })
            .then(response => {
                console.log(response);
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error)
                if (error?.response && error?.response?.status == 401) {
                    navigate(route('index'))
                }
            });
    }

    return { posts, getPosts }
}
