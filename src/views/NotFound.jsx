import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Logo from '@/assets/images/logo.png';


export default function NotFound() {
  return (
    <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column align-items-center row-gap-3'>
            <img src={ Logo } alt="" width={350} />
            <h2 className='fw-bold'>Page Not Found</h2>
            <span>Go back <Link to={ route('home.index') } className='text-faansy-red text-decoration-none fw-bold'>Home</Link></span>
        </div>
    </div>
  )
}
