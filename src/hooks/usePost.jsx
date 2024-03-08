import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


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
                // setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
                if (error?.response?.status == 403) {
                    swal.fire({
                        text: 'You must be a creator before you can add posts',
                        color: "#820303",
                        width: 350,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
                if (error.response.status == 413) {
                    swal.fire({
                        text: `${error.response.statusText}`,
                        color: "#820303",
                        width: 300,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
            })
            .finally(() => setLoading(false));
    }

    async function getPost(id, { signal } = {}) {
        setLoading(true);

        return axiosInstance.get(`posts/${id}`, { signal })
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
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
                if (error?.response?.status == 403) {
                    swal.fire({
                        text: 'Access Denied: You can only update posts that you own.',
                        color: "#820303",
                        width: 350,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
                if (error?.response?.status == 422) {
                    swal.fire({
                        text: 'Error: Ensure you filled out all fields with the appropriate values.',
                        color: "#820303",
                        width: 350,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
            })
            .finally(() => setLoading(false));
    }

    async function featurePost(post) {
        setLoading(true);
        setErrors({});
        console.log(post)

        return axiosInstance.post(`posts/featured-posts/${post.id}`)
            .then((response) => {
                swal.fire({
                    text: 'Post added to featured posts.',
                    color: "#820303",
                    width: 325,
                    position: 'top',
                    showConfirmButton: false,
                });
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
                if (error?.response?.status == 403) {
                    swal.fire({
                        text: 'Access Denied: You can only make posts featured if you have either of super-admin or admin roles.',
                        color: "#820303",
                        width: 350,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
                if (error?.response?.status == 409) {
                    // swal.fire({
                    //     text: 'Conflict: Post already featured.',
                    //     color: "#820303",
                    //     width: 350,
                    //     position: 'top',
                    //     showConfirmButton: false,
                    // });
                }
            })
            .finally(() => setLoading(false));
    }

    async function pinPost(post) {
        setLoading(true);
        setErrors({});
        console.log(post)

        return axiosInstance.post(`posts/${post?.id}/pin-post`)
            .then((response) => {
                swal.fire({
                    text: 'Post pinned.',
                    color: "#820303",
                    width: 200,
                    position: 'top',
                    showConfirmButton: false,
                });
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
                if (error?.response?.status == 403) {
                    swal.fire({
                        text: 'Access Denied: You can only pin posts you own',
                        color: "#820303",
                        width: 350,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
            })
            .finally(() => setLoading(false));
    }

    async function repostPost(repost_body) {
        setLoading(true);
        setErrors({});
        console.log(repost_body)
        console.log(id)

        return axiosInstance.post(`posts/${id}/repost`, {repost_body})
            .then((response) => {
                // swal.fire({
                //     text: 'Post updated',
                //     color: "#820303",
                //     width: 200,
                //     position: 'top',
                //     showConfirmButton: false,
                // });
                // console.log(response)
                // navigate(route('home.index'))
            })
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
                if (error?.response?.status == 403) {
                    swal.fire({
                        text: 'Access Denied: You can only repost posts that you own.',
                        color: "#820303",
                        width: 350,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
                if (error?.response?.status == 422) {
                    swal.fire({
                        text: 'Error: Ensure you filled out all fields with the appropriate values.',
                        color: "#820303",
                        width: 350,
                        position: 'top',
                        showConfirmButton: false,
                    });
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
                console.log(error);
                setErrors(error.response);
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
                if (error?.response?.status == 403) {
                    swal.fire({
                        text: 'Access Denied: You can only delete posts that you own.',
                        color: "#820303",
                        width: 350,
                        position: 'top',
                        showConfirmButton: false,
                    });
                }
            })
            .finally(() => setLoading(false));
    }

    return {
        post: { data, setData, errors, loading }, 
        getPost, 
        createPost, 
        updatePost, 
        featurePost, 
        pinPost, 
        repostPost, 
        destroyPost
    }
}
