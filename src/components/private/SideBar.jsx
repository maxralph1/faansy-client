import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import MissingUserImage from '@/assets/images/icon.png';


export default function SideBar() {
    const { user, logoutUser } = useContext(AuthContext);
    console.log(user)

    return (
        <aside className="col-md-3 vh-100 position-sticky top-0 start-0 card rounded-0 d-flex flex-column row-gap-4 align-items-start py-4 ps-3 pe-3 overflow-y-auto sidenav">

            <div className='d-flex gap-2 flex-wrap'>
                <span href="" className="text-decoration-none text-light">
                    <div className="d-flex align-items-center column-gap-3 bg-dark rounded-pill py-1 ps-2 pe-4 d-none d-md-block">
                        <img src={ user.user_image_url ? `${ Constants.serverURL }/${ user.user_image_url }` : MissingUserImage } alt="" width="25" />
                        <small className="fw-semibold text-light text-uppercase ms-2">{ user.first_name }</small>
                    </div>
                    <div className="d-block d-md-none">
                        <span className="text-bg-dark text-light rounded-circle py-1 px-2" style={{ marginLeft: '-7px'}}>{ user.first_name.slice(0, 1) }</span>
                    </div>
                </span>
    {/* 
                { user.verified != true &&
                <span className="sidebar-item border border-success rounded ps-1 pe-2 py-1" title='Verify your ID'>
                    <Link to={ route('home.my-profile') + '#verify-id' } className="text-decoration-none text-secondary d-flex align-items-center column-gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                        <span className="d-none d-md-block fs-6 fw-bold">Verify Your ID</span>
                    </Link>
                </span>
                } */}
            </div>
            
            <span className="sidebar-item">
                <Link to={ route('home.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#4c5661" className="bi bi-house"
                        viewBox="0 0 16 16">
                        <path
                            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold">Home</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.notifications.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#4c5661" className="bi bi-bell"
                        viewBox="0 0 16 16">
                        <path
                            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold">Notifications</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.streams.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#4c5661" className="bi bi-cast" viewBox="0 0 16 16">
                            <path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0"/>
                            <path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#4c5661" className="bi bi-mic" viewBox="0 0 16 16">
                            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
                            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
                        </svg>
                    </div>
                    
                    <span className="d-none d-md-block fs-6 fw-semibold">Streams</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.livestreams.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3 livestream-animation">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#820303" className="bi bi-cast" viewBox="0 0 16 16">
                            <path d="m7.646 9.354-3.792 3.792a.5.5 0 0 0 .353.854h7.586a.5.5 0 0 0 .354-.854L8.354 9.354a.5.5 0 0 0-.708 0"/>
                            <path d="M11.414 11H14.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h3.086l-1 1H1.5A1.5 1.5 0 0 1 0 10.5v-7A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-2.086z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#820303" className="bi bi-mic" viewBox="0 0 16 16">
                            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
                            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
                        </svg>
                    </div>
                    
                    <span className="d-none d-md-block fs-6 text-faansy-red fw-semibold">Livestreams</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.chats.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#4c5661" className="bi bi-chat-left-text"
                        viewBox="0 0 16 16">
                        <path
                            d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path
                            d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold">Chats</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.bookmarks.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#4c5661" className="bi bi-bookmark"
                        viewBox="0 0 16 16">
                        <path
                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold">Bookmarks</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.subscriptions.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#4c5661" className="bi bi-person-heart"
                        viewBox="0 0 16 16">
                        <path
                            d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold">Subscriptions</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.wallet.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#4c5661" className="bi bi-wallet2" viewBox="0 0 16 16">
                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold">Wallet</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.cards.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#4c5661" className="bi bi-credit-card"
                        viewBox="0 0 16 16">
                        <path
                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold">Cards</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.stats.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#4c5661" className="bi bi-graph-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold">Stats</span>
                </Link>
            </span>
            <span className="sidebar-item">
                <Link to={ route('home.my-profile') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#4c5661" className="bi bi-person-circle"
                        viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold">My profile</span>
                </Link>
            </span>

            { (user.role.title == 'super-admin' || user.role.title == 'admin') &&
                <span className="sidebar-item">
                    <Link to={ route('home.user-verifications.index') } className="text-decoration-none text-secondary d-flex align-items-center column-gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#4c5661" className="bi bi-person-check" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                        </svg>
                        <span className="d-none d-md-block fs-6 fw-semibold">User Verifications</span>
                    </Link>
                </span>
            }

            <span className="align-self-stretch">
                <Link to={ route('home.index') + '#new-post' } className="text-decoration-none text-light">
                    <div className="d-flex align-items-center column-gap-3 bg-dark rounded-pill py-1 px-2 d-none d-md-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#fff" className="bi bi-plus mb-1"
                        viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        <small className="fw-semibold text-light text-uppercase">New Post</small>
                    </div>
                    <div className="d-block d-md-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#4c5661" className="bi bi-plus-circle-fill"
                            viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                        </svg>
                    </div>
                </Link>
            </span>

            <span className="sidebar-item mt-3" style={{ marginLeft: '-4px' }}>
                <button onClick={ logoutUser } className="text-decoration-none text-secondary border-0 bg-transparent d-flex align-items-center column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="red" className="bi bi-power" style={{ marginBottom: '4px' }} viewBox="0 0 16 16">
                        <path d="M7.5 1v7h1V1z"/>
                        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                    </svg>
                    <span className="d-none d-md-block fs-6 fw-semibold text-danger">Sign Out</span>
                </button>
            </span>

        </aside>
    )
}
