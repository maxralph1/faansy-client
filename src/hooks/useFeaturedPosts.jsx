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
            .then(response => {
                console.log(response?.data)
                setPosts(response?.data);
            })
            .catch((error) => {console.log(error)});
    }

    return { posts, getPosts }
}



// import { useState, useEffect } from 'react';
// import Constants from '@/utils/Constants.jsx';

 
// export function useFeaturedPosts(page = 1) {
//     const [posts, setPosts] = useState([]);
//     const [error, setError] = useState('')
//     const [loading, setLoading] = useState(false) 

//     const getPosts = async (page = 1) => {
//         try {
//         const response = await fetch(`${ Constants.serverURL }/api/posts/featured-posts?page=${page}`);
//         if (!response.ok) {
//             throw new Error(
//             `This is an HTTP error: The status is ${response.status}`
//             );
//         }
//         let actualData = await response.json();
//         setPosts(actualData);
//         console.log(actualData?.data)
//         setError(null);
//         } catch(error) {
//             setError(error);
//             setPosts(null);
//         } finally {
//             setLoading(false);
//         }  
//     }

//     useEffect(() => {
//         getPosts()
//     }, [])
 
//     return { posts, error, loading, getPosts }
// }