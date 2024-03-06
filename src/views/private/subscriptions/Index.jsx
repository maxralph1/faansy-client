import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useSubscriptions } from '@/hooks/useSubscriptions.jsx';
import { useSubscription } from '@/hooks/useSubscription.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';
import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';

export default function Index() {
  const { user } = useContext(AuthContext);
  const { subscriptions, getSubscriptions } = useSubscriptions();
  const { subscription, createSubscription, destroySubscription } = useSubscription();

  console.log(subscriptions);
  console.log(user);

  return (
    <Layout>
        <section className="col-sm-10 col-md-5 card rounded-0 main-content">
            <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                <h2 className="text-uppercase fs-5 fw-bold">Subscriptions</h2>
                <span className="mb-2">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16">
                        <path
                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg> */}
                </span>
            </div>

            <div>
                <section className="mb-1 border px-3 py-2 column-gap-1">
                    <div className="card-body d-flex justify-content-end">
                        <div className='d-flex flex-column align-items-end'>
                            <span className='d-flex align-items-center column-gap-1'>
                                <span className='fs-5'><span className='fw-bold text-dark'>{ subscriptions?.data?.filter((subscription => subscription.subscriber.id != user.id)).length }</span>&nbsp;{ (subscriptions?.data?.filter((subscription => subscription.subscriber.id != user.id)).length <= 1) ? 'subscriber' : 'subscribers' }</span>
                            </span>
                            <span className='d-flex align-items-center column-gap-1'>
                                <span className='fs-5'><span className='fw-bold text-dark'>{ subscriptions?.data?.filter((subscription => subscription?.subscriber.id == user.id)).length }</span>&nbsp;{ (subscriptions?.data?.filter((subscription => subscription?.subscriber.id == user.id)).length <= 1) ? 'subscription' : 'subscriptions' }</span>
                            </span>
                        </div>
                    </div>
                </section>

                <section className="border-top">
                    <div className='card rounded-0 chat-item'>

                        <ul className="nav nav-tabs d-flex justify-content-between" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={ `nav-link rounded-0 ${ (user.role.title == 'creator') && 'active'}` } id="subscribers-tab" data-bs-toggle="tab" data-bs-target="#subscribers-tab-pane" type="button" role="tab" aria-controls="subscribers-tab-pane" aria-selected="false">Subscribers</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={ `nav-link rounded-0 ${ (user.role.title != 'creator') && 'active'}` } id="subscribed-tab" data-bs-toggle="tab" data-bs-target="#subscribed-tab-pane" type="button" role="tab" aria-controls="subscribed-tab-pane" aria-selected="true">Subscriptions</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className={ `tab-pane fade ${ (user.role.title == 'creator') && 'show active'}` } id="subscribers-tab-pane" role="tabpanel" aria-labelledby="subscribers-tab" tabIndex="0">
                                {(subscriptions?.data?.length > 0) ? subscriptions?.data?.map(subscription => {
                                    if (subscription?.subscribed.id == user.id) {
                                        return (
                                            <article key={ subscription.id } className="card text-bg-dark rounded-0 my-3">
                                                <Link to={ route('home.users.show', { username: subscription?.subscriber?.username }) }>
                                                <div>
                                                    <img src={ subscription?.subscriber?.user_background_image_url ? `${ Constants.serverURL }/storage/${subscription?.subscriber?.user_background_image_url}` : MissingUserBackgroundImage } className="card-img object-fit-cover rounded-0" style={{ maxHeight: '125px' }} alt="..." />
                                                    <div className="card-img-overlay">
                                                        <div className="d-flex justify-content-end align-items-start px-2 pt-2 h-50">
                                                            {/* <span className="bg-secondary text-light opacity-75 px-1 rounded z-2" style={{ boxShadow: '3px 3px 5px #000000', textShadow: '7px 7px 10px #000000' }}><small>{ subscription?.subscriber?.free_subscription == true ? 'Free' : 'Paid' }</small></span> */}
                                                            <span className="mb-1">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                                                                    viewBox="0 0 16 16">
                                                                    <path
                                                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                                </svg> */}
                                                            </span>
                                                        </div>

                                                        <div className="d-flex column-gap-3 px-2 pb-3 h-50" style={{ background: '#256d7c26' }}>
                                                            <div className="d-flex align-items-end">
                                                                <img src={ subscription?.subscriber?.user_image_url ? `${ Constants.serverURL }/storage/${subscription?.subscriber?.user_image_url}` : MissingUserImage } alt="" width="70" height="70" className="z-1 object-fit-cover border border-light border-3 rounded-circle" />
                                                                { (dayjs().diff(dayjs(subscription?.subscriber?.last_seen)) < 7200000) &&
                                                                <span className="z-3 bg-success p-1 border border-light border-1 rounded-circle" style={{ width: '10px', height: '10px', marginLeft: '-17px', marginBottom: '5px' }}></span> }
                                                            </div>
                                                            <div className="text-light d-flex flex-column justify-content-center">
                                                                <div className='d-flex align-items-center column-gap-1'>
                                                                    <h4 className="fs-6 fw-bold" style={{ textShadow: '7px 7px 10px #000000' }}>{ `${ subscription?.subscriber?.first_name } ${ subscription?.subscriber?.last_name }`}</h4>
                                                                    { subscription.verified == true
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
                                                                
                                                                <span style={{ marginTop: '-14px', textShadow: '7px 7px 10px #000000' }}><small>@{ subscription?.subscriber?.username }</small></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Link>
                                            </article>
                                                )
                                                
                                        }}) : (subscriptions?.data?.length < 1) ? (
                                            <section className='vh-100 d-flex justify-content-center align-items-center px-5'>
                                                <span className='h-50 text-center fw-semibold px-5'>You have no subscribers yet</span>
                                            </section>
                                        ) : (
                                            <section className='vh-50 pt-5 mt-2'>
                                                <Loading />
                                            </section>
                                        )}
                            </div>

                            <div className={ `tab-pane fade ${ (user.role.title != 'creator') && 'show active'}` } id="subscribed-tab-pane" role="tabpanel" aria-labelledby="subscribed-tab" tabIndex="0">
                                {(subscriptions?.data?.length > 0) ? subscriptions?.data?.map(subscription => {
                                    if (subscription?.subscriber.id == user.id) {
                                        return (
                                            <article key={ subscription.id } className="card text-bg-dark border-0 rounded-0 my-3">
                                                <Link to={ route('home.users.show', { username: subscription?.subscribed?.username }) }>
                                                <div>
                                                    <img src={ subscription?.subscribed?.user_background_image_url ? `${ Constants.serverURL }/storage/${subscription?.subscribed?.user_background_image_url}` : MissingUserBackgroundImage } className="card-img object-fit-cover rounded-0" style={{ maxHeight: '125px' }} alt="..." />
                                                    <div className="card-img-overlay">
                                                        <div className="d-flex justify-content-end align-items-start px-2 pt-2 h-50">
                                                            {/* <span className="bg-secondary text-light opacity-75 px-1 rounded z-2" style={{ boxShadow: '3px 3px 5px #000000', textShadow: '7px 7px 10px #000000' }}><small>{ subscription?.subscribed?.free_subscription == true ? 'Free' : 'Paid' }</small></span> */}
                                                            <span className="mb-1 dropdown dropstart">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-three-dots-vertical"
                                                                    viewBox="0 0 16 16" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <path
                                                                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                                </svg>
                                                                <ul className="dropdown-menu px-0 justify-self-start">
                                                                    <li>
                                                                        <button 
                                                                            onClick={ async () => {
                                                                                await destroySubscription(subscription);
                                                                                await getSubscriptions();
                                                                            } }
                                                                            type='button' 
                                                                            className="dropdown-item fw-bold z-3">
                                                                                <small>Unsubscribe</small>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </span>
                                                        </div>

                                                        <div className="d-flex column-gap-3 px-2 pb-3 h-50" style={{ background: '#256d7c26' }}>
                                                            <div className="d-flex align-items-end">
                                                                <img src={ subscription?.subscribed?.user_image_url ? `${ Constants.serverURL }/storage/${subscription?.subscribed?.user_image_url}` : MissingUserImage } alt="" width="70" height="70" className="z-1 object-fit-cover border border-light border-3 rounded-circle" />
                                                                { (dayjs().diff(dayjs(subscription?.subscribed?.last_seen)) < 7200000) &&
                                                                <span className="z-3 bg-success p-1 border border-light border-1 rounded-circle" style={{ width: '10px', height: '10px', marginLeft: '-17px', marginBottom: '5px' }}></span> }
                                                            </div>
                                                            <div className="text-light d-flex flex-column justify-content-center">
                                                                <div className='d-flex align-items-center column-gap-1'>
                                                                    <h4 className="fs-6 fw-bold" style={{ textShadow: '7px 7px 10px #000000' }}>{ `${ subscription?.subscribed?.first_name } ${ subscription?.subscribed?.last_name }`}</h4>
                                                                    { subscription.verified == true
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
                                                                
                                                                <span style={{ marginTop: '-14px', textShadow: '7px 7px 10px #000000' }}><small>@{ subscription?.subscribed?.username }</small></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Link>
                                            </article>
                                                )
                                                
                                        }}) : (subscriptions?.data?.length < 1) ? (
                                            <section className='vh-100 d-flex justify-content-center align-items-center px-5'>
                                                <span className='h-50 text-center fw-semibold px-5'>You have no subscriptions yet</span>
                                            </section>
                                        ) : (
                                            <section className='vh-100 pt-5 mt-2 px-5'>
                                                <div className='h-50 px-5'>
                                                    <Loading />
                                                </div>
                                            </section>
                                        )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </section>
    </Layout>
  )
}
