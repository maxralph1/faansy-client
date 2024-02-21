import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import useAxios from '@/utils/useAxios.jsx';


export function useCreators() {
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getCreators({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getCreators({ signal } = {}) {
        return axiosInstance.get(`${ Constants.serverURL }/api/creators`, { signal })
        // return axiosInstance.get(`creators`, { signal })
            .then(response => setCreators(response.data))
            .catch((error) => {
                if (error?.response?.status == 401) {
                    navigate(route('index'))
                }
            });
    }

    return { creators, getCreators }
}
