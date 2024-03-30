import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx';
import Logo from '@/assets/images/logo.png';


export default function Index() {
    const { loginUser, redirectToGoogle } = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        username.length > 0 && loginUser(username, password);
    }

    return (
        <Layout>
            <div className="col-md-6 col-sm-12 px-3 min-h-100 d-flex flex-column justify-content-center">
                <span className='position-absolute top-0 px-5 pt-3 mb-2 d-block d-md-none'><img src={ Logo } alt="Faansy Logo" width="95" /></span>
                <h2 className="fs-6 px-5 text-end">Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column px-5">
                        <input name="username" id="username" type="text" className="form-control py-2 mb-4" placeholder="Username" aria-label="Username" />
                        <input name="password" id="password" type="password" className="form-control py-2 mb-4" placeholder="Password" aria-label="Password" />
                        <button className="btn btn-sm btn-faansy-red text-light rounded-pill fw-bold py-2">LOG IN</button>
                    </div>
                </form>

                <div className="mt-4 px-5 d-flex justify-content-center flex-wrap column-gap-1">
                    <span>
                        <Link 
                            to={ route('reset-password-request') } 
                            className="text-decoration-none text-faansy-red fs-6">
                                Forgot password?
                        </Link>
                    </span>
                    <span>-</span>
                    <span className="">
                        <Link 
                            to={ route('create-account') } 
                            className="text-decoration-none text-faansy-red fs-6">
                                Sign up for <span className="fw-bold">Faansy</span>
                        </Link>
                    </span>
                </div>

                <div className="mt-4 d-flex flex-column px-5 row-gap-3">
                    <span>
                        <a href="" className="btn btn-primary rounded-pill fw-bold py-2 text-uppercase text-decoration-none text-light w-100">
                            <span 
                                typeof='button'
                                onClick={ async () => {
                                    await redirectToGoogle();
                                } } 
                                className='d-flex align-items-center justify-content-center gap-1'>
                                <small>
                                    Sign in with&nbsp; 
                                </small>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-google" style={{ marginTop: '-2.5px' }} viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                                </svg>
                            </span>
                        </a>
                    </span>
                    <span>
                        <a href="" className="btn btn-dark rounded-pill fw-bold py-2 text-uppercase text-decoration-none text-light w-100">
                            <span className='d-flex align-items-center justify-content-center gap-1'>
                                <small>
                                    Sign in with&nbsp; 
                                </small>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-twitter-x" style={{ marginTop: '-2.5px' }} viewBox="0 0 16 16">
                                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                                </svg>
                            </span>
                        </a>
                    </span>
                    <span>
                        <Link 
                            to={ route('passwordless-signin-request') }  
                            className="btn btn-faansy-red opacity-75 rounded-pill fw-bold py-2 text-uppercase text-decoration-none text-light w-100">
                                <small>
                                    Passwordless Sign In
                                </small>
                        </Link>
                    </span>
                </div>
            </div>
        </Layout>
    )
}
