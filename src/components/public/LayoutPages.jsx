import { useContext } from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import Header from '@/components/public/Header.jsx';
import Footer from '@/components/public/Footer.jsx';
import FaansyBgIndex from '@/assets/images/faansy_bg_index.png';
import '@/assets/css/style.css';


export default function LayoutPages({ children }) {
    return (
        <>
            <Header />

            <main id="main">
                <section className="row min-vh-100 border-bottom">

                    { children }

                </section>
            </main>

            <Footer />
        </>
    )
}
