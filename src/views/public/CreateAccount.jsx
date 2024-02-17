import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import AuthContext from '@/context/AuthContext.jsx';
import Layout from '@/components/public/Layout.jsx';


export default function CreateAccount() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    let { registerUser } = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();
        if (password == password2) {
            registerUser(email, firstname, lastname, username, password)
        } else {
          console.log('Given passwords do not match');
        }
    }
    
    return (
        <Layout>
            <div className="col-md-6 col-sm-12 px-5 min-h-100 d-flex flex-column justify-content-center">
                <h2 className="fs-6 px-5 text-end">Create account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column px-5">
                        <input 
                          name="email" 
                          id="email" 
                          type="email" 
                          className="form-control py-2 mb-4" 
                          placeholder="Email" 
                          aria-label="Email" 
                          onChange={e => setEmail(e.target.value)} />
                        <input 
                          name="username" 
                          id="username" 
                          type="text" 
                          className="form-control py-2 mb-4" 
                          placeholder="Username" 
                          aria-label="Username" 
                          onChange={e => setUsername(e.target.value)} />
                        <input 
                          name="firstname" 
                          id="firstname" 
                          type="text" 
                          className="form-control py-2 mb-4" 
                          placeholder="First name" 
                          aria-label="First name" 
                          onChange={e => setFirstname(e.target.value)} />
                        <input 
                          name="lastname" 
                          id="lastname" 
                          type="text" 
                          className="form-control py-2 mb-4" 
                          placeholder="Last name" 
                          aria-label="Last name" 
                          onChange={e => setLastname(e.target.value)} />
                        <input 
                          name="password" 
                          id="password" 
                          type="password" 
                          className="form-control py-2 mb-4" 
                          placeholder="Password" 
                          aria-label="Password" 
                          onChange={e => setPassword(e.target.value)} />
                        <input 
                          name="password2" 
                          id="password2" 
                          type="password" 
                          className="form-control py-2 mb-4" 
                          placeholder="Repeat Password" 
                          aria-label="Password2" 
                          onChange={e => setPassword2(e.target.value)} />
                        <button className="btn btn-sm btn-faansy-red text-light rounded-pill fw-bold py-2">SIGN UP</button>
                    </div>
                </form>

                <div className="mt-4 px-5 d-flex justify-content-center flex-wrap column-gap-1">
                    <span className="">Already have an account?&nbsp;
                        <Link 
                            to={ route('home.index') } 
                            className="text-decoration-none text-faansy-red fs-6">
                                Sign in
                        </Link>
                    </span>
                </div>
            </div>
        </Layout>
    )
}
