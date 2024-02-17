import { useState, useEffect } from 'react';
import Constants from '@/utils/Constants.jsx';
// import axiosInstance from '@/utils/axios';
import axios from 'axios';


export function useFeaturedPosts(page = 1) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (page !== null) {
            const controller = new AbortController();
            getPosts(page, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [page]);

    async function getPosts(page, { signal } = {}) {
        return axios.get(`${ Constants.serverURL }/api/posts/featured-posts?page=${page}`, { signal })
        // return axiosInstance.get(`posts`, { signal })
            .then(response => {
                console.log(response?.data)
                setPosts(response?.data);
                // setPosts(response?.data?.data);
                // setPosts(posts => [...posts?.data, response?.data?.data]);
                // const [array,setArray] = useState([]);
                // setArray(oldArray => [...oldArray,newValue] );
                // setArray(oldArray => [newValue,...oldArray] );
            })
            .catch((error) => {console.log(error)});
    }

    return { posts, getPosts }
}
