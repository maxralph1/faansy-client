import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
import axios from 'axios';
// import useAxios from '@/utils/useAxios.jsx';


export function usePosts(page = 1) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getPosts(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getPosts(page, { signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/posts?page=${page}`, { signal })
        // return axiosInstance.get(`posts`, { signal })
            .then(response => {
                // console.log(response);
                setPosts(response.data);
                // setPosts(response?.data?.data);
                // const [array,setArray] = useState([]);
                // setArray(oldArray => [...oldArray,newValue] );
                // setArray(oldArray => [newValue,...oldArray] );
            })
            .catch(() => {});
    }

    return { posts, getPosts }
}
