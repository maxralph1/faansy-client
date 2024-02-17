import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useCreators } from '@/hooks/useCreators.jsx';
import { useSubscription } from '@/hooks/useSubscription.jsx';
import Loading from '@/components/Loading.jsx';
import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';


export default function Aside() {
    const { user } = useContext(AuthContext);
    const { creators, getCreators } = useCreators();
    const { createSubscription } = useSubscription();

    return (
        <aside className="d-none d-md-block col-md-4 vh-100 position-sticky top-0 end-0 card rounded-0 d-flex flex-column row-gap-4 align-items-center pt-3 pb-4 px-3 overflow-y-auto">
            <section className="d-flex flex-column">
                {/* <input className="form-control py-2 mb-4" type="text" placeholder="Search posts" aria-label="Search posts" /> */}

                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="text-uppercase text-secondary fs-6"><small>Suggestions</small></h3>
                    <div className="mb-2 d-flex justify-content-between column-gap-3">
                        <span>
                            <button
                                type="button"
                                className="text-decoration-none text-secondary bg-transparent border-0"
                                onClick={ async () => {
                                    await getCreators();
                                } }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                                </svg>
                            </button>
                        </span>
                        {/* <span>
                            <a href="" className="text-decoration-none text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                                </svg>
                            </a>
                        </span>
                        <span>
                            <a href="" className="text-decoration-none text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                </svg>
                            </a>
                        </span> */}
                    </div>
                </div>
            </section>

            <section className="d-flex flex-column row-gap-2">
                {(creators?.data?.length > 0) ? creators?.data?.map(creator => {
                    return (
                        <article key={ creator.id } className="card border-0 rounded">
                            <Link to={ route('home.users.show', { username: creator.username }) }>
                                <img src={ creator.user_background_image_url ? `${ Constants.serverURL }/storage/${creator.user_background_image_url}` : MissingUserBackgroundImage } className="card-img object-fit-cover" style={{ maxHeight: '125px' }} alt="..." />
                                <div className="card-img-overlay">
                                    <div className="d-flex justify-content-between align-items-start px-2 pt-2 h-50">
                                        <span className="bg-secondary text-light opacity-75 px-1 rounded z-2" style={{ boxShadow: '3px 3px 5px #000000', textShadow: '7px 7px 10px #000000' }}><small>{ creator.free_subscription == true ? 'Free' : 'Paid' }</small></span>
                                        <span className="mb-1 dropdown z-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-three-dots-vertical"
                                                viewBox="0 0 16 16" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <path
                                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                            </svg>
                                            <ul className="dropdown-menu px-0">
                                                <li>
                                                    <button 
                                                        onClick={ async () => {
                                                            await createSubscription(user.id, creator.id, creator.subscription_amount);
                                                            // await createSubscription(user.id, creator.id, (creator.subscription_amount == null ? 0 : creator.subscription_amount));
                                                            // await getPosts();
                                                        } }
                                                        type='button' 
                                                        className="dropdown-item fw-bold" 
                                                        // onMouseOver="this.style.color='red'" 
                                                        // onMouseOut ="this.style.color='blue'" 
                                                        href="#subscribe"><small>Subscribe</small></button>
                                                </li>
                                                {/* <li>
                                                    <button 
                                                        onClick={ async () => {
                                                            await createChat(user?.id, creator?.id);
                                                            // await getPosts();
                                                        } }
                                                        type='button' 
                                                        className="dropdown-item fw-bold" href="#send-direct-message"><small>Send Direct Message</small></button>
                                                </li> */}
                                            </ul>
                                        </span>
                                    </div>
                                    
                                    <div className="d-flex column-gap-3 px-2 pb-3 h-50" style={{ background: '#256d7c26' }}>
                                        <div className="d-flex align-items-end">
                                            <img src={ creator.user_image_url ? `${ Constants.serverURL }/storage/${creator.user_image_url}` : MissingUserImage } alt="" width="70" height="70" className="z-1 object-fit-cover border border-light border-3 rounded-circle" />
                                            { (dayjs().diff(dayjs(creator?.last_seen)) < 7200000) &&
                                            <span className="z-2 bg-success p-1 border border-light border-1 rounded-circle" style={{ width: '10px', height: '10px', marginLeft: '-17px', marginBottom: '5px' }}></span> }
                                        </div>
                                        <div className="text-light d-flex flex-column justify-content-center">
                                            <div className='d-flex align-items-center column-gap-1'>
                                                <h4 className="fs-6 fw-bold" style={{ textShadow: '7px 7px 10px #000000' }}>{ `${ creator.first_name } ${ creator.last_name }`}</h4>
                                                { creator.verified == true
                                                    && 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="bi bi-patch-check fw-bold mb-2 rounded-circle" style={{ boxShadow: '3px 3px 10px #000000' }} viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                            d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                        <path
                                                            d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                                    </svg>
                                                }
                                            </div>
                                            
                                            <span style={{ marginTop: '-14px', textShadow: '7px 7px 10px #000000' }}><small>@{ creator.username }</small></span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    )
                    
                }) : (
                    // <div>
                    //     <span className='text-center'>No creators yet</span>
                    // </div>
                    <>
                        <section className='vh-50 pt-5 mt-2'>
                            <Loading />
                        </section>
                    </>
                )}
            </section>
            
            <hr className="my-4" />

            <footer className="d-flex justify-content-center column-gap-3 row-gap-5">
                <span><a href="" className="text-decoration-none text-secondary"><small>Privacy</small></a></span>
                <span><a href="" className="text-decoration-none text-secondary"><small>-</small></a></span>
                <span><a href="" className="text-decoration-none text-secondary"><small>Cookie Notice</small></a></span>
                <span><a href="" className="text-decoration-none text-secondary"><small>-</small></a></span>
                <span><a href="" className="text-decoration-none text-secondary"><small>Terms of Service</small></a></span>
            </footer>
        </aside>
    )
}
