import { useContext } from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { usePosts } from '@/hooks/usePosts.jsx';
import Header from '@/components/public/Header.jsx';
import FeaturedPosts from '@/components/public/FeaturedPosts.jsx';
import Footer from '@/components/public/Footer.jsx';
import FaansyBgIndex from '@/assets/images/faansy_bg_index.png';
import '@/assets/css/style.css';


export default function Layout({ children }) {
    const { posts, getPosts } = usePosts();

    console.log(posts)

    return (
        <>
            <Header />

            <main id="main">
                <section className="row min-vh-100 border-bottom">
                    <div className="d-none d-md-block col-md-6 text-light pt-5 px-5" style={{ backgroundColor: '#820303' }}>
                        <div className="d-flex flex-column justify-content-center h-100">
                            <h1 className="mb-3 px-5 d-flex align-items-center gap-1"><img src={ FaansyBgIndex } alt="" width="345" /></h1>
                            <p className="fs-1 fw-semibold lh-sm px-5">Sign up to meet your favorite creators</p>
                        </div>
                    </div>

                    { children }

                </section>

                <FeaturedPosts />
            </main>

            <Footer />
        </>
    )
}
