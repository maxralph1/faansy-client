import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { route } from '@/routes';
import axios from 'axios';
import Constants from '@/utils/Constants.jsx';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = `${ Constants.serverURL }/api`;


const useAxios = () => {
    const navigate = useNavigate();
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL, 
        headers: {
            'Authorization': `Bearer ${authTokens?.authorization?.token}`,
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded', 
            "Content-Type": "multipart/form-data",
        },
    });
    
    // async function refreshFunc() {
    //     const response = await axiosInstance.post(`${baseURL}/refresh`, {
    //         headers: {
    //             // 'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             "Content-Type": "multipart/form-data",
    //             'Authorization': `Bearer ${authTokens?.authorization.token}`,
    //         },
    //     });
    //     console.log(response.data)
    //     console.log('refreshed');

    //     localStorage.setItem('authTokens', JSON.stringify(response.data))

    //     setAuthTokens(response.data);
    //     setUser(jwtDecode(response.data.authorization.token));
    // };

    // axiosInstance.interceptors.request.use(async req => {
    //     const user = jwtDecode(authTokens?.authorization?.token);
    //     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    //     if (!isExpired) return req;

    //     // refreshFunc();

    //     // // modify this navigate before usage
    //     // // if (isExpired) navigate(route('index'));

    //     const response = await axios.post(`${baseURL}/refresh`, {
    //         headers: {
    //             // 'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             "Content-Type": "multipart/form-data",
    //             // 'Authorization': `Bearer ${authTokens?.authorization?.token}`,
    //         },
    //     });
    //     console.log(response?.data)
    //     console.log('refreshed');

    //     localStorage.setItem('authTokens', JSON.stringify(response?.data))

    //     setAuthTokens(response?.data);
    //     setUser(jwtDecode(response?.data?.authorization?.token));

    //     // Update user's last seen here
    //     // await ...

    //     req.headers.Authorization = `Bearer ${response?.data?.authorization?.token}`;
    //     return req;
    // });

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
        if (error?.response?.status === 401) navigate(route('index'));
        return Promise.reject(error)
        },
    )

    return axiosInstance;
}

export default useAxios;