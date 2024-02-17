import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';


export function useMyPosts(page = 1) {
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
        // return axios.get(`${ Constants.serverURL }/api/posts/my-posts?page=${page}`, { signal })
        return axiosInstance.get(`posts/my-posts?page=${page}`, { signal })
            .then(response => {
                console.log(response?.data)
                setPosts(response?.data);
            })
            .catch((error) => {console.log(error)});
    }

    return { posts, getPosts }
}
