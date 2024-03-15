import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx';
import Logo from '@/assets/images/logo.png';


export default function PasswordlessSigninRequest() {
    const { passwordlessSigninRequest } = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();
        const username = event.target.username.value;

        username.length > 0 && passwordlessSigninRequest(username);
    }

    return (
        <Layout>
            <div className="col-md-6 col-sm-12 px-3 min-h-100 d-flex flex-column justify-content-center">
                <span className='position-absolute top-0 px-5 pt-3 mb-2 d-block d-md-none'><img src={ Logo } alt="Faansy Logo" width="95" /></span>
                <h2 className="fs-6 px-5 text-end">Passwordless Sign-in Token Request</h2>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column px-5">
                        <input 
                            name="username" 
                            id="username" 
                            type="text" 
                            className="form-control py-2 mb-4" 
                            placeholder="Username" aria-label="Username" />
                        <button className="btn btn-sm btn-faansy-red text-light rounded-pill fw-bold py-2">REQUEST LINK</button>
                    </div>
                </form>

                <div className="mt-4 px-5 d-flex justify-content-center flex-wrap column-gap-3">
                    <span>
                        Sign in with password?&nbsp;
                        <Link 
                            to={ route('index') } 
                            className="text-decoration-none text-faansy-red fs-6">
                                Sign in
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
            </div>
        </Layout>
    )
}
