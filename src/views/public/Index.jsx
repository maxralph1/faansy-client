import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx';


export default function Index() {
    const { loginUser } = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        username.length > 0 && loginUser(username, password);
    }

    return (
        <Layout>
            <div className="col-md-6 col-sm-12 px-5 min-h-100 d-flex flex-column justify-content-center">
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
                    <span><a href="" className="btn btn-dark rounded-pill fw-bold py-2 text-uppercase text-decoration-none text-light w-100"><small>Sign in with Twitter</small></a></span>
                    <span><a href="" className="btn btn-primary rounded-pill fw-bold py-2 text-uppercase text-decoration-none text-light w-100"><small>Sign in with Google</small></a></span>
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
