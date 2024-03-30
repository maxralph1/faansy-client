import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
// import axios from 'axios';
import useAxios from '@/utils/useAxios.jsx';
import swal from 'sweetalert2';


export function useCreatorPublic(username = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();


    useEffect(() => {
        if (username !== null) {
            const controller = new AbortController();
            getCreator(username, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [username]);

    async function getCreator(username, { signal } = {}) {
        setLoading(true);

        return axiosInstance.get(`creators/${username}/show-public`, { signal })
        // return axios.get(`${ Constants.serverURL }/api/creators/${username}`, { signal })
            .then(response => setData(response?.data?.data))
            .catch((error) => {
                console.log(error)
                if (error?.response && error?.response?.status == 401) {
                    navigate(route('index'))
                }
            })
            .finally(() => setLoading(false));
    }

    return {
        creator: { data, setData, errors, loading }, 
        getCreator
    }
}
