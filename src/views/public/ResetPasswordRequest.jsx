import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx';


export default function ResetPasswordRequest() {
    const { resetPasswordRequest } = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;

        email.length > 0 && resetPasswordRequest(email);
    }

    return (
        <Layout>
            <div className="col-md-6 col-sm-12 px-5 min-h-100 d-flex flex-column justify-content-center">
                <h2 className="fs-6 px-5 text-end">Reset Password Request</h2>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column px-5">
                        <input 
                            name="email" 
                            id="email" 
                            type="email" 
                            className="form-control py-2 mb-4" 
                            placeholder="Email" aria-label="Email" />
                        <button className="btn btn-sm btn-faansy-red text-light rounded-pill fw-bold py-2">REQUEST RESET PASSWORD</button>
                    </div>
                </form>

                <div className="mt-4 px-5 d-flex justify-content-center flex-wrap column-gap-3">
                    <span>
                        Remember password?&nbsp;
                        <Link 
                            to={ route('index') } 
                            className="text-decoration-none text-faansy-red fs-6">
                                Login
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
