import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx';


export default function ResetPassword() {
    const { resetPassword } = useContext(AuthContext);
    const params = useParams();

    const handleSubmit = e => {
        e.preventDefault();
        const password = e.target.password.value;
        const repeat_password = e.target.repeat_password.value;
        const email = params.email;
        const token = params.token;

        if (password == repeat_password) {
            email.length > 0 && resetPassword(email, password, token);
        } else {
          console.log('Given passwords do not match');
        }

    }

    return (
        <Layout>
            <div className="col-md-6 col-sm-12 px-5 min-h-100 d-flex flex-column justify-content-center">
                <h2 className="fs-6 px-5 text-end">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column px-5">
                        <input 
                            name="password" 
                            id="password" 
                            type="password" 
                            className="form-control py-2 mb-4" 
                            placeholder="Password" aria-label="Password" />
                        <input 
                            name="repeat_password" 
                            id="repeat_password" 
                            type="password" 
                            className="form-control py-2 mb-4" 
                            placeholder="Re-enter Password" aria-label="Re-enter Password" />
                        <button className="btn btn-sm btn-faansy-red text-light rounded-pill fw-bold py-2">RESET PASSWORD</button>
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
