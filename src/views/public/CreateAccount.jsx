import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import AuthContext from '@/context/AuthContext.jsx';
import swal from 'sweetalert2';
import Layout from '@/components/public/Layout.jsx';
import Logo from '@/assets/images/logo.png';


export default function CreateAccount() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [legalAgeToggle, setLegalAgeToggle] = useState(false);

    let { registerUser } = useContext(AuthContext);

    const handleSubmit = async event => {
        event.preventDefault();

        if (password != password2) {
            swal.fire({
                text: 'Given passwords do not match', 
                color: "#820303",
                width: 300,
                position: 'top',
                showConfirmButton: false,
            });
        }

        if ((password?.length) && (password2?.length) && (password == password2) && (legalAgeToggle == false)) {
            swal.fire({
                text: 'You must be 18 to register on the site',
                color: "#820303",
                width: 325,
                position: 'top',
                showConfirmButton: false,
            });
        }

        if ((password?.length) && (password2?.length) && (password == password2) && (legalAgeToggle == true)) {
            registerUser(email, firstname, lastname, username, password);
        }
    }
    
    return (
        <Layout>
            <div className="col-md-6 col-sm-12 px-3 min-h-100 d-flex flex-column justify-content-center">
                <span className='position-absolute top-0 px-5 pt-3 mb-2 d-block d-md-none'><img src={ Logo } alt="Faansy Logo" width="95" /></span>
                <h2 className="fs-6 px-5 text-end">Create account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row px-5">
                        <div className='col-12'>
                          <input 
                            name="email" 
                            id="email" 
                            type="email" 
                            className="form-control py-2 mb-2" 
                            placeholder="Email" 
                            aria-label="Email" 
                            onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='col-12'>
                          <input 
                            name="username" 
                            id="username" 
                            type="text" 
                            className="form-control py-2 mb-2" 
                            placeholder="Username" 
                            aria-label="Username" 
                            onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='col-6'>
                          <input 
                            name="firstname" 
                            id="firstname" 
                            type="text" 
                            className="form-control py-2 mb-2" 
                            placeholder="First name" 
                            aria-label="First name" 
                            onChange={e => setFirstname(e.target.value)} />
                        </div>
                        <div className='col-6'>
                          <input 
                            name="lastname" 
                            id="lastname" 
                            type="text" 
                            className="form-control py-2 mb-2" 
                            placeholder="Last name" 
                            aria-label="Last name" 
                            onChange={e => setLastname(e.target.value)} />
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <input 
                            name="password" 
                            id="password" 
                            type="password" 
                            className="form-control py-2 mb-2" 
                            placeholder="Password" 
                            aria-label="Password" 
                            onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <input 
                            name="password2" 
                            id="password2" 
                            type="password" 
                            className="form-control py-2 mb-2" 
                            placeholder="Repeat Password" 
                            aria-label="Password2" 
                            onChange={e => setPassword2(e.target.value)} />
                        </div>

                        <div className='col-12 d-flex align-items-center gap-2 py-1 mt-2 mb-4'>
                          <input 
                              type="checkbox" 
                              name="legal_age" 
                              id="legal_age" 
                              className="form-check-input" 
                              role="switch" 
                              hidden />
                          { legalAgeToggle == false ?
                            (<span 
                              type="button" 
                              onClick={() => setLegalAgeToggle(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-off" viewBox="0 0 16 16">
                                  <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                                </svg>
                            </span>) :
                            (<span 
                              type="button" 
                              onClick={() => setLegalAgeToggle(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-on" viewBox="0 0 16 16">
                                  <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                                </svg>
                            </span>)
                          }
                          <small className="form-check-label ms-1" htmlFor="pay_per_view">Are you above 18?</small>
                        </div>
                        
                        <button className="btn btn-sm btn-faansy-red text-light rounded-pill fw-bold py-2">SIGN UP</button>
                    </div>
                </form>

                <div className="mt-4 px-5 d-flex justify-content-center flex-wrap column-gap-1">
                    <span className="">Already have an account?&nbsp;
                        <Link 
                            to={ route('index') } 
                            className="text-decoration-none text-faansy-red fs-6">
                                Sign in
                        </Link>
                    </span>
                </div>
            </div>
        </Layout>
    )
}
