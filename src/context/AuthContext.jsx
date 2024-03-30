import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import axios from 'axios';

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({children}) => {
    // localStorage.clear();

    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem('authTokens') 
            ? JSON.parse(localStorage.getItem('authTokens')) 
            : null);
    const [user, setUser] = useState(() => 
        localStorage.getItem('authTokens') 
            ? jwtDecode(localStorage.getItem('authTokens')) 
            : null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // const registerUser = async (email, firstname, lastname, username, password) => {
    //     const response = await fetch(`${ Constants.serverURL }/api/register`, {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json', 
    //             // 'Access-Control-Allow-Origin': `${ Constants.clientURL }`
    //         }, 
    //         body: JSON.stringify({
    //             email, 
    //             first_name: firstname, 
    //             last_name: lastname, 
    //             username, 
    //             password 
    //         })
    //     })

    //     console.log(response)

    //     if (response.status == 200 || response.status == 201) {
    //         navigate(route('index'));
    //         swal.fire({
    //             text: 'Registration successful, you can now sign in',
    //             color: "#820303",
    //             width: 325,
    //             position: 'top',
    //             showConfirmButton: false,
    //         });
    //     } else {
    //         swal.fire({
    //             text: 'Something went wrong. Retry registration.',
    //             color: "#820303",
    //             width: 325,
    //             position: 'top',
    //             showConfirmButton: false,
    //         });
    //     }
    // }


    const registerUser = async (email, firstname, lastname, username, password) => {
        await axios.post(`${ Constants.serverURL }/api/register`, {email, first_name: firstname, last_name: lastname, username, password})
            .then(() => {
                navigate(route('index'));
                swal.fire({
                    text: 'Registration successful, you can now sign in',
                    color: "#820303",
                    width: 325,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                // console.log(error);
                swal.fire({
                    text: 'Something went wrong. Retry registration.',
                    color: "#820303",
                    width: 325,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
    }


    const loginUser = async (username, password) => {
        const response = await fetch(`${ Constants.serverURL }/api/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username, 
                password 
            })
        })
        const data = await response.json()
        console.log(data)

        if (response.status == 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data?.authorization?.token));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate(route('home.index'));
        } else {
            swal.fire({
                text: 'Error: Username or password incorrect',
                color: "#820303",
                width: 325,
                position: 'top',
                showConfirmButton: false,
            });
        }
    }


    
    // const passwordlessSigninRequest = async (username) => {
    //     const response = await fetch(`${ Constants.serverURL }/api/passwordless-signin-request`, {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }, 
    //         body: JSON.stringify({
    //             username 
    //         })
    //     })

    //     if (response.status == 200) {
    //         swal.fire({
    //             text: 'Email notification with sign in token sent to your email.',
    //             color: "#820303",
    //             width: 350,
    //             position: 'top',
    //             showConfirmButton: false,
    //         });
    //     } else {
    //         swal.fire({
    //             text: 'Error: Something went wrong.',
    //             color: "#820303",
    //             width: 300,
    //             position: 'top',
    //             showConfirmButton: false,
    //         });
    //     }
    // }


    const passwordlessSigninRequest = async (username) => {
        await axios.post(`${ Constants.serverURL }/api/passwordless-signin-request`, {username})
            .then(() => {
                swal.fire({
                    text: 'Email notification with sign in token sent to your email.',
                    color: "#820303",
                    width: 350,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
            .catch(error => {
                console.log(error);
                swal.fire({
                    text: 'Error: Something went wrong.',
                    color: "#820303",
                    width: 300,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
    }


    const passwordlessSignin = async (username, token) => {
        const response = await fetch(`${ Constants.serverURL }/api/passwordless-signin/${ username }/${ token }`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)

        if (response.status == 200) {
            console.log('Logged in');
            setAuthTokens(data);
            setUser(jwtDecode(data?.authorization?.token));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate(route('home.index'));
            console.log('Login successful');
        } else {
            swal.fire({
                text: 'Error: Something went wrong.',
                color: "#820303",
                width: 300,
                position: 'top',
                showConfirmButton: false,
            });
        }
    }


    const redirectToGoogle = async () => {
        await axios.get(`${ Constants.serverURL }/api/google/auth/redirect`)
            .then(() => {
                // swal.fire({
                //     text: 'Email notification with sign in token sent to your email.',
                //     color: "#820303",
                //     width: 350,
                //     position: 'top',
                //     showConfirmButton: false,
                // });
            })
            .catch(error => {
                console.log(error);
                swal.fire({
                    text: 'Error: Something went wrong.',
                    color: "#820303",
                    width: 300,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
    }


    const handleGoogleCallback = async () => {
        await axios.get(`${ Constants.serverURL }/api/google/auth/callback`)
            .then(() => {
                // swal.fire({
                //     text: 'Email notification with sign in token sent to your email.',
                //     color: "#820303",
                //     width: 350,
                //     position: 'top',
                //     showConfirmButton: false,
                // });
            })
            .catch(error => {
                console.log(error);
                swal.fire({
                    text: 'Error: Something went wrong.',
                    color: "#820303",
                    width: 300,
                    position: 'top',
                    showConfirmButton: false,
                });
            })
    }


    const logoutUser = async () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens'); 
        await fetch(`${ Constants.serverURL }/api/logout`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate(route('index'));
    }


    const resetPasswordRequest = async (email) => {
        const response = await fetch(`${ Constants.serverURL }/api/password-reset-request`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email 
            })
        })

        if (response.status == 200) {
            swal.fire({
                text: 'Email notification with reset token sent to your email',
                color: "#820303",
                width: 325,
                position: 'top',
                showConfirmButton: false,
            });
        } else {
            swal.fire({
                text: 'Error: Something went wrong.',
                color: "#820303",
                width: 300,
                position: 'top',
                showConfirmButton: false,
            });
        }
    }

    
    const resetPassword = async (email, password, token) => {
        const response = await fetch(`${ Constants.serverURL }/api/password-reset`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password, 
                token
            })
        })

        if (response.status == 200) {
            navigate(route('home.index'));
            swal.fire({
                text: 'Password reset.',
                color: "#820303",
                width: 325,
                position: 'top',
                showConfirmButton: false,
            });
        } else {
            swal.fire({
                text: 'Registration successful, you can now sign in',
                color: "#820303",
                width: 325,
                position: 'top',
                showConfirmButton: false,
            });
        }
    }





    let contextData = {
        user, 
        setUser, 
        authTokens, 
        setAuthTokens, 
        loginUser, 
        passwordlessSigninRequest, 
        passwordlessSignin, 
        registerUser, 
        resetPasswordRequest,
        resetPassword, 
        redirectToGoogle, 
        handleGoogleCallback, 
        logoutUser, 
    }


    useEffect(() => {
        if (authTokens?.authorization) setUser(jwtDecode(authTokens?.authorization?.token));
        setLoading(false)
    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}