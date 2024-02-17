import { useLocation } from 'react-router-dom';
import { route } from '@/routes';
import Logo from '@/assets/images/logo.png';


export default function Header() {
    const location = useLocation();

    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100 gap-3'>
            <div className="spinner-border text-faansy-red" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className='loading-animation'>
                <img src={ Logo } alt="" width={100} />
            </div>

            {console.log(location.pathname)}

            { location.pathname.startsWith('/passwordless-signin/') 
                ?
                    <div>
                        <span>Please wait, while we sign you in ...</span>
                    </div>
                : 
                    <div>
                        <span>Loading content. Please wait ...</span>
                    </div>
            }
        </div>
    )
}
