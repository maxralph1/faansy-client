import { Link, useLocation } from 'react-router-dom';
import { route } from '@/routes';
import Header from '@/components/private/Header.jsx';
import SideBar from '@/components/private/SideBar.jsx';
import Aside from '@/components/private/Aside.jsx';


export default function Layout({ children }) {
    const location = useLocation();

    return (
        <>
            <Header />

            <main className="position-relative d-flex w-100">
                { location.pathname != route('public.posts.show') ? <SideBar /> : '' }

                { children }

                {/* { (location.pathname != route('home.stats.index')) || (location.pathname != route('home.user-verifications.index')) || (location.pathname != route('home.user-become-creators.index')) && <Aside />} */}
                { (location.pathname == route('home.stats.index')) 
                    ? '' 
                        : (location.pathname == route('home.user-verifications.index'))
                        ? ''
                            : (location.pathname == route('home.user-become-creators.index'))
                            ? '' 
                                : (location.pathname == route('public.posts.show'))
                                ? '' 
                                    : <Aside />}
            </main>
        </>
    )
}
