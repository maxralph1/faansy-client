import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '@/context/AuthContext.jsx';
import Loading from '@/components/Loading.jsx';


export default function PasswordlessSignin() {
    const { passwordlessSignin } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const username = params.username;
    const token = params.token;

    passwordlessSignin(username, token);


    return (
        <section className='vh-100'>
            <Loading />
        </section>
    )
}
