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
            'Authorization': `Bearer ${authTokens?.authorization.token}`,
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded', 
            "Content-Type": "multipart/form-data",
        },
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authTokens?.authorization?.token);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        // // modify this navigate before usage
        // // if (isExpired) navigate(route('index'));

        const response = await axios.post(`${baseURL}/refresh`);
        console.log(response.data)

        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.authorization.token));

        // Update user's last seen here
        // await ...

        req.headers.Authorization = `Bearer ${response?.data?.authorization?.token}`;
        return req;
    });

    // axiosInstance.interceptors.response.use(response => {
    //     return response;
    //     }, error => {
    //         console.log(error)
    //         if (error?.response?.status == 401) {
    //             navigate(route('index'));
    //         }
    //     return error;
    // });

    return axiosInstance;
}

export default useAxios;