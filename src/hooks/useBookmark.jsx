import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Constants from '@/utils/Constants.jsx';
import { route } from '@/routes';
import swal from 'sweetalert2';
import useAxios from '@/utils/useAxios.jsx';


export function useBookmark(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getBookmark(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createBookmark(post_id) {
        setLoading(true);
        setErrors({});

        console.log(post_id)
        return axiosInstance.post('bookmarks', {post_id})
            .then(() => {
                swal.fire({
                    text: 'Post bookmarked',
                    color: "#820303",
                    width: 250,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                // console.log(error.response);
                // console.log(error.response.data.errors);
                setErrors(error.response);

                if (error.response.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    async function getBookmark(id, { signal } = {}) {
        setLoading(true);

        return axiosInstance.get(`${ Constants.serverURL }/api/bookmarks/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function destroyBookmark(bookmark) {
        return axiosInstance.delete(`bookmarks/${bookmark.id}`)
            .then(() => {
                swal.fire({
                    text: 'Bookmark removed',
                    color: "#820303",
                    width: 250,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                // console.log(error);
                setErrors(error.response);
            })
            .finally(() => setLoading(false));
    }

    return {
        bookmark: { data, setData, errors, loading }, 
        getBookmark, 
        createBookmark, 
        destroyBookmark
    }
}
