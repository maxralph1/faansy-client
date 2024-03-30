import { useContext, useState } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
// dayjs.extend(utc);
// dayjs.extend(timezone);
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useCreatorPublic } from '@/hooks/useCreatorPublic.jsx';
import { useSubscription } from '@/hooks/useSubscription.jsx';
import { useMessage } from '@/hooks/useMessage.jsx';
import { usePollresponse } from '@/hooks/usePollresponse.jsx';
import { usePost } from '@/hooks/usePost.jsx';
import { usePostcomment } from '@/hooks/usePostcomment.jsx';
import { useBookmark } from '@/hooks/useBookmark.jsx';
import { usePostlike } from '@/hooks/usePostlike.jsx';
import { useRestrict } from '@/hooks/useRestrict.jsx';
import { useBlock } from '@/hooks/useBlock.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';
import Logo from '@/assets/images/logo.png';
import MissingImage from '@/assets/images/name_non-transparent.png';
import MissingUserBackgroundImage from '@/assets/images/faansy_bg_index.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';


export default function Show() {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const { creator, getCreator } = useCreatorPublic(params.username);
    const { createSubscription, destroySubscription } = useSubscription();
    const { createNewMessage } = useMessage();
    const { createPollresponse, destroyPollresponse } = usePollresponse();
    const { post, createPost, featurePost, destroyPost } = usePost();
    const { createPostcomment, destroyPostcomment } = usePostcomment();
    const { createPostlike, destroyPostlike } = usePostlike();
    const { createRestrict } = useRestrict();
    const { createBlock } = useBlock();
    const { createBookmark, destroyBookmark } = useBookmark();
    
    console.log(creator);
    // console.log(creator?.data?.posts);
    // console.log(creator?.data?.subscriptions);
    // console.log(user);

    /* Post comment state*/
    const [postCommentBody, setPostCommentBody] = useState();

    async function createMessage(event) {
        event.preventDefault();

        const body = event.target.body.value;
        const participator_1_id = user.id;
        const participator_2_id = creator?.data?.id;

        await createNewMessage(body, participator_1_id, participator_2_id);

        event.target.body.value = '';
    }

    async function commentOnPost(event) {
        event.preventDefault();

        const post_id = event.target.post_id.value;
        const body = postCommentBody;

        await createPostcomment(post_id, body);
        setPostCommentBody('');
        await getCreator(params.username);
    }

    async function sendTip(event) {
        event.preventDefault();

        const recipient_id = event.target.recipient_id.value;
        const amount = event.target.amount.value;

        await createTip(recipient_id, amount);
        await getCreator(params.username);
    }

    return (
        <section className="col-sm-12 col-md-12 card rounded-0 main-content">
            <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                <div className="d-flex align-items-center column-gap-2">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row align-items-center column-gap-1">
                            <h1 className="fs-5">{ `${ creator?.data?.first_name } ${ creator?.data?.last_name }` }</h1>
                            { creator?.data?.verified == true &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check" style={{ marginBottom: '8.5px'}}
                                viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                    d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                <path
                                    d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                            </svg>
                            }
                        </div>
                        
                        <span style={{ marginTop: '-6.5px'}}>
                            { creator?.data?.last_seen == null ? 'Last activity: N/A' 
                                : (dayjs.utc().diff(dayjs.utc(creator?.data?.last_seen)) > 7200000) 
                                ? `Last seen ${(dayjs.utc(creator?.data?.last_seen).fromNow())}` 
                                : (dayjs.utc().diff(dayjs.utc(creator?.data?.last_seen)) < 7200000) 
                                && 'Online' }
                        </span>
                    </div>
                </div>
            </div>

            <section className="card text-bg-dark border-0 rounded-0">
                <img src={ creator?.data?.user_background_image_url ? `${ Constants.serverURL }/storage/${creator?.data?.user_background_image_url}` : MissingUserBackgroundImage } className="card-img object-fit-cover" style={{ maxHeight: '150px' }} alt="..." />
                <div className="card-img-overlay fw-semibold">
                    <div className="d-flex justify-content-between align-items-center px-3">
                        <div className="icons d-flex align-items-center column-gap-3">
                            { (creator?.data?.posts?.filter((post => post.image_url != null)).length > 0) &&
                                <div className="d-flex align-items-center column-gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                        <path
                                            d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                                    </svg>
                                    <small style={{ textShadow: '7px 7px 10px #000000' }}>
                                        { creator?.data?.posts?.filter((post => post.image_url != null)).length }
                                    </small>
                                </div>
                            }
                            
                            { creator?.data?.posts?.filter((post => post.video_url != null)).length > 0 &&
                                <div className="d-flex align-items-center column-gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                                    </svg>
                                    <small style={{ textShadow: '7px 7px 10px #000000' }}>
                                        { creator?.data?.posts?.filter((post => post.video_url != null)).length }
                                    </small>
                                </div>
                            }
                            
                            { creator?.data?.livestreams?.length  > 0 &&
                                <div className="d-flex align-items-center column-gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
                                        <path
                                            d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                                        <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                                    </svg>
                                    <small style={{ textShadow: '7px 7px 10px #000000' }}>{ creator?.data?.livestreams?.length }</small>
                                </div>
                            }
                            
                            { creator?.data?.userlikers?.length > 0 &&
                                <div className="d-flex align-items-center column-gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart"  viewBox="0 0 16 16">
                                        <path
                                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg>
                                    <small style={{ textShadow: '7px 7px 10px #000000' }}>{ creator?.data?.userlikers?.length }</small>
                                </div>
                            }
                        </div>

                        <div className="options">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"  viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg> */}
                        </div>
                    </div>
                </div>

                <div className="card rounded-0">
                    <div className="d-flex align-items-end ms-2" style={{ marginTop: '-2.5rem' }}>
                        <img src={ creator?.data?.user_image_url ? `${ Constants.serverURL }/storage/${creator?.data?.user_image_url}` : MissingUserImage } alt="" width="90" height="90" className="z-1 object-fit-cover border border-light border-3 rounded-circle" />
                        { (dayjs.utc().diff(dayjs.utc(creator?.data?.last_seen)) < 7200000) &&
                        <span className="z-2 bg-success p-1 border border-light border-1 rounded-circle"
                            style={{ width: '10px', height: '10px', marginLeft: '-25px', marginBottom: '5px' }}></span> }
                    </div>
                    <div className="card-body" style={{ marginTop: '-0.5rem' }}>
                        <div className="d-flex align-items-center column-gap-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center">
                                    <span className="fs-5 fw-semibold">{ `${ creator?.data?.first_name } ${ creator?.data?.last_name }` } </span>
                                    { creator?.data?.verified == true &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check"
                                        style={{ marginTop: '4px', marginLeft: '2px' }} viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                        <path
                                            d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                    </svg>
                                    }
                                </div>
                                <small className="text-secondary">@{ creator?.data?.username } -&nbsp;
                                    { creator?.data?.last_seen == null ? 'Last activity: N/A' 
                                        : (dayjs.utc().diff(dayjs.utc(creator?.data?.last_seen)) > 7200000) 
                                        ? `Last seen ${(dayjs.utc(creator?.data?.last_seen).fromNow())}` 
                                        : (dayjs.utc().diff(dayjs.utc(creator?.data?.last_seen)) < 7200000) 
                                        && 'Online' }
                                </small>
                            </div>
                        </div>
                        <div>
                            <p className="card-text mt-1">{ creator?.data?.profile?.bio ? creator?.data?.profile?.bio : 'User has yet to write a bio. 😉'}</p>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <div className="modal fade" id="messageModal" tabIndex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3 className="modal-title fs-5" id="messageModalLabel">Message</h3>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <form onSubmit={ createMessage }>
                                            <div className="modal-body">
                                                <div className="mb-1">
                                                    <textarea name="body" id="body" className="form-control"></textarea>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-sm btn-faansy-red text-light">Send Message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div>
                { ((creator?.data?.subscriptions?.length > 0) 
                    && (creator?.data?.subscriptions?.find(subscription => 
                    subscription.subscribed.id == creator?.data?.id && subscription.subscriber.id == user.id))) 
                ?
                    <section className='d-flex justify-content-end align-items-center gap-2 px-3 py-2 fw-semibold'>
                        <section className='d-flex justify-content-end align-items-center gap-2'>
                            <span>You are subscribed to this user</span>
                            <span 
                                type='button' 
                                data-bs-toggle="modal" 
                                data-bs-target="#unsubscribeModal" 
                                data-bs-body=''
                                className='btn btn-sm btn-faansy-red text-light'>
                                    Unsubscribe
                            </span>
                        </section>
                        <section>
                            <div className="modal fade" id="unsubscribeModal" tabIndex="-1" aria-labelledby="unsubscribeModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h3 className="modal-title fs-5" id="unsubscribeModalLabel">Unsubscribe from <span className='fw-semibold'>{ `${creator?.data?.first_name} ${creator?.data?.last_name}` }</span></h3>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <span className="modal-title fs-6" id="unsubscribeModalLabel">If you unsubscribe, you would no longer receive posts and other updates from this creator. Are you sure you want to unsubscribe from { `${creator?.data?.first_name} ${creator?.data?.last_name}` } ?</span>
                                        </div>
                                        <div className="modal-footer">
                                        <button 
                                            type="button" 
                                            onClick={ async () => {
                                                await destroySubscription((creator?.data?.subscriptions?.find(subscription =>  subscription.subscribed.id == creator?.data?.id && subscription.subscriber.id == user.id)));
                                                // await getCreator(params.username);
                                                window.location.reload(true);
                                            } }
                                            className="btn btn-sm btn-dark">
                                                Yes, Unsubscribe
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                : 
                    <section className={`d-flex flex-column align-items-center justify-content-between row-gap-2 border rounded-0 ${(creator?.data?.username != user.username) && `py-3`}`}>
                        { (creator?.data?.username != user.username) &&
                            <>
                                <h3 className="align-self-start ps-3 text-uppercase text-secondary fs-6"><small>Subscription</small></h3>
                                <span className="w-100 px-3">
                                    <button 
                                        type="button" 
                                        onClick={ async () => {
                                            await createSubscription(creator?.data?.id);
                                            await getCreator(params.username);
                                        } }
                                        className="btn btn-faansy-red rounded-pill d-flex justify-content-between px-3 text-light fw-semibold py-2 w-100">
                                        <small className="text-uppercase">Subscribe</small>
                                        { creator?.data?.subscription_amount >= 0 && creator?.data?.free_subscription == false
                                            ? <small className="text-uppercase">For { (creator?.data?.subscription_amount).toFixed(2) }$</small>
                                            : <small className="text-uppercase">For Free</small>
                                        }
                                    </button>
                                </span>
                            </>
                        }
                    </section>
                }
            </div>

            { (creator?.data?.polls?.length > 0) && 
                <section className="mt-1 p-3 border-top rounded-0">
                    <div className='d-flex flex-column justify-content-between align-items-start'>
                        <h4 className='fs-5 fw-semibold border-bottom border-top py-2 mb-3'>Polls</h4>
                        <div className='d-flex flex-column gap-3'>
                            { creator?.data?.polls?.map(poll => {
                                return (
                                    <article key={ poll.id } className='border-bottom mb-2'>
                                        <div className='border-bottom'>
                                            { (poll?.responses?.find(response => 
                                                                response.user_id == user.id && response?.poll_id == poll?.id)) 
                                                                && <span className="badge text-bg-warning d-flex justify-content-end mb-1">Already Voted. Changed your mind? Vote again.</span> }
                                            <h5 className='fs-6'>Questionnaire: <span className='fw-semibold'>{ poll.questionnaire }</span></h5>
                                        </div>
                                        
                                        { poll?.options?.map(option => {
                                            return (
                                                <div key={ option.id }>
                                                    <span 
                                                        type="button" 
                                                        onClick={ async () => {
                                                            await createPollresponse(option?.id, poll?.id);
                                                            await getCreator(params.username);
                                                        } }
                                                        className='d-flex gap-2'>
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                                </svg>
                                                            </span>
                                                            <span className='d-flex gap-2 align-items-center'>
                                                                <small>{ option.option }</small>
                                                                { (poll?.responses?.find(response => 
                                                                response.user_id == user.id && response?.polloption_id == option?.id)) 
                                                                && <span className="badge text-bg-success">Voted&nbsp;
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                                    </svg>
                                                                </span> }
                                                            </span>
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>
            }

            <section className="mt-1 border-top card rounded-0">
                <h4 className='fs-6 fw-semibold p-3 d-none'>Posts</h4>
                <div className='rounded-0 post-item border-top-0'>
                    {(creator?.data?.posts?.length > 0) ? creator?.data?.posts?.map(post => {
                        return (
                            <article key={ post?.id } className="card border-0 border-top border-bottom pb-3">
                                { post.repost == true 
                                    &&                                        
                                        <div className="d-flex justify-content-between card-body">
                                            <div className="d-flex justify-content-start align-items-center column-gap-2">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-repeat" viewBox="0 0 16 16">
                                                        <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                                                    </svg>&nbsp;<span className='fw-bold text-faansy-red'>repost</span>
                                                </span>
                                            </div>
                            
                                            <div className="d-flex column-gap-3">
                                                <small className="text-body-secondary">
                                                    <span>reposted</span> { dayjs.utc(post.created_at).fromNow() }
                                                </small>
                                                <span>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#4c5661" className="bi bi-three-dots"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                                    </svg> */}
                                                </span>
                                            </div>
                                        </div>
                                    }
                                <div className={ `card-body ${ post.repost == true && 'px-5' }` }>
                                    <div className="d-flex justify-content-between mb-3">
                                        <Link 
                                            to={ route('home.users.show', {'username': post.user.username})}
                                            className="d-flex justify-content-start align-items-center column-gap-2 text-decoration-none">
                                            <div className="rounded-circle">
                                                <img src={ post.user.user_image_url ? `${ Constants.serverURL }/storage/${ post?.user?.user_image_url }` : Logo } alt="" width="65" height='65' className='object-fit-cover rounded' />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <h3 className="card-title fs-6 text-dark">
                                                    <span>{ `${ post.user.first_name } ${ post.user.last_name }` }</span>
                                                    { post.user.verified == true
                                                        && 
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="bi bi-patch-check mb-1" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd"
                                                            d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                        <path
                                                            d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                                    </svg>
                                                    }
                                                </h3>
                                                <span className="text-body-secondary">@{ post.user.username }</span>
                                            </div>
                                        </Link>
                        
                                        <div className="d-flex column-gap-3">
                                            <span className="text-body-secondary">
                                                { post.repost_original_post_timestamp != null 
                                                    ? dayjs.utc(post.repost_original_post_timestamp).fromNow() 
                                                    : dayjs.utc(post.created_at).fromNow()}
                                            </span>
                                            {/* <span className="text-body-secondary">9 hours ago</span> */}
                                            
                                            { post?.user?.id == user?.id && 
                                                <span className='mb-1 dropstart z-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#4c5661" className="bi bi-three-dots"
                                                        viewBox="0 0 16 16" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <path
                                                            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                                    </svg>
                                                    <ul className="dropdown-menu">
                                                        { ((user.role.title == 'super-admin') || (user.role.title == 'admin')) &&
                                                            <button 
                                                                onClick={ async () => {
                                                                    await featurePost(post);
                                                                    await getCreator(params.username);
                                                                } }
                                                                type='button' 
                                                                className="dropdown-item fw-bold" href="#make-post-featured"><small>Make Post Featured</small>
                                                            </button>
                                                        }
                                                        { ((post?.payperviewamount <= 0)) &&
                                                            <li>
                                                                <Link 
                                                                    to={ route('home.posts.show', { id: post.id})}
                                                                    className="dropdown-item fw-bold" 
                                                                    href="#show-post"><small>View Post</small>
                                                                </Link>
                                                            </li>
                                                        }
                                                        { post?.user?.id == user?.id && 
                                                            <>
                                                                <li>
                                                                    <Link 
                                                                        to={ route('home.posts.repost', { id: post.id})}
                                                                        className="dropdown-item fw-bold" 
                                                                        href="#repost-post"><small>Repost</small>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link 
                                                                        to={ route('home.posts.edit', { id: post.id})}
                                                                        className="dropdown-item fw-bold" 
                                                                        href="#edit-post"><small>Edit Post</small>
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <button 
                                                                        onClick={ async () => {
                                                                            await destroyPost(post);
                                                                            await getCreator(params.username);
                                                                        } }
                                                                        type='button' 
                                                                        className="dropdown-item fw-bold text-secondary" href="#delete-post"><small>Delete Post</small>
                                                                    </button>
                                                                </li>
                                                            </>
                                                        }
                                                    </ul>
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    { (creator?.data?.subscriptions?.find(subscription => (subscription.subscribed.id == creator?.data?.id && subscription.subscriber.id == user.id) || (post.user.id == user?.id))) ? 
                                        <p className="card-text">{ post?.body }</p> 
                                        : 
                                        <p className="card-text">{ (post?.body).substring(0,20) + ' ...' }</p> }
                                    
                                    {/* <p>
                                        {
                                            function replaceAts() {
                                            var replacer = function(match) {
                                                var id = match.substr(1);

                                                return `<a href="https://twitter.com/${id}" target="_blank">${id}</a>`;
                                            };

                                            for (var i = 0; i < list.length; i++) {
                                                list[i] = list[i].replace(/@\w+/g, replacer);
                                            }
                                            }

                                            replaceAts();

                                            console.log(list);
                                        }
                                    </p> */}
                                    {/* <span><a href="" className="text-decoration-none text-faansy-red">onlyfans.com/natalie.brooks</a> / <a href="" className="text-decoration-none text-faansy-red">onlyfans.com/natalie.brooks</a></span> */}
                                </div>

                                { (post?.payperviewamount <= 0) 
                                    ?
                                        <>
                                        { (creator?.data?.subscriptions?.find(subscription => (subscription.subscribed.id == creator?.data?.id && subscription.subscriber.id == user.id) || (post.user.id == user?.id))) ? 
                                            <>
                                                { post?.video?.video_url?.length > 0 && 
                                                    <video controls width="250" height={400} className="card-img-bottom object-fit-cover rounded-0 mb-1" alt={ post?.id }>
                                                        <source src={ `${ Constants.serverURL }/storage/${ post?.video?.video_url }` } type="video/webm" />
                                                        <source src={ `${ Constants.serverURL }/storage/${ post?.video?.video_url }` } type="video/mp4" />
                                                        Download the
                                                        <a href={ `${ Constants.serverURL }/storage/${ post?.video?.video_url }` }>video</a>.
                                                    </video> 
                                                }
                                                <div id={`carouselIndicators${ post?.id }`} className="carousel slide pb-3">
                                                    <div className="carousel-indicators">
                                                        { post?.images?.length > 0 && post?.images?.map((image, index) => {
                                                            return (
                                                                <button key={ index } type="button" data-bs-target={`carouselIndicators${ image?.id }`} data-bs-slide-to={index} className="active" aria-current="true" aria-label={ `Slide` + (index+1) }></button>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="carousel-inner">
                                                        { post?.images?.length > 0 && post?.images?.map((image, index) => {
                                                                if (index == 0) {
                                                                    return (
                                                                        <div key={ image.id } className={`carousel-item active`}>
                                                                            <img src={ `${ Constants.serverURL }/storage/${ image?.image_url }` } className="card-img-bottom object-fit-cover rounded-0" height={400} />
                                                                        </div>
                                                                    )
                                                                }

                                                                return (
                                                                    <div key={ image.id } className={`carousel-item`}>
                                                                        <img src={ `${ Constants.serverURL }/storage/${ image?.image_url }` } className="card-img-bottom object-fit-cover rounded-0" height={400} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    { post?.images?.length > 1 && 
                                                        <>
                                                            <button className="carousel-control-prev" type="button" data-bs-target={`#carouselIndicators${ post?.id }`} data-bs-slide="prev">
                                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                <span className="visually-hidden">Previous</span>
                                                            </button>
                                                            <button className="carousel-control-next" type="button" data-bs-target={`#carouselIndicators${ post?.id }`} data-bs-slide="next">
                                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                                <span className="visually-hidden">Next</span>
                                                            </button>
                                                        </>
                                                    }
                                                </div>
                                            </>
                                            : 
                                                <span className="card-img-bottom rounded d-flex justify-content-center align-items-center pb-3">
                                                    <span className="w-100 px-3">
                                                        <button 
                                                            type="button" 
                                                            onClick={ async () => {
                                                                await createSubscription(creator?.data?.id);
                                                                await getCreator(params.username);
                                                            } }
                                                            className="btn btn-faansy-red rounded-pill d-flex justify-content-between px-3 text-light fw-semibold py-2 w-100">
                                                            <small className="text-uppercase">Subscribe To View</small>
                                                            { creator?.data?.subscription_amount >= 0 && creator?.data?.free_subscription == false
                                                                ? <small className="text-uppercase">For { (creator?.data?.subscription_amount).toFixed(2) }$</small>
                                                                : <small className="text-uppercase">For Free</small>
                                                            }
                                                        </button>
                                                    </span>
                                                </span>
                                        }
                                        </>
                                    : 
                                        <span className="card-img-bottom rounded d-flex justify-content-center align-items-center pb-3">
                                            <Link 
                                                to={ route('home.posts.show', { 'id': post?.id})}
                                                className='btn btn-faansy-red text-light'>
                                                    View Content (Pay-Per-View { (user?.id == post?.user?.id) ? '— Owner (free)' : `($` + (post?.payperviewamount).toFixed(2) + `)`})
                                            </Link>
                                        </span>
                                }

                                <section className="px-2 d-flex justify-content-between align-items-center">
                                    <div className="mb-2 d-flex justify-content-start align-items-center column-gap-3">
                                        <span className='like-section'>
                                            {(post?.likes?.length > 0) && post.likes?.find(foundLike => foundLike?.user?.id == user?.id)
                                                ? 
                                                <button 
                                                    onClick={ async () => {
                                                        await destroyPostlike((post?.likes?.length > 0) && post.likes?.find(foundLike => foundLike?.user?.id == user?.id));
                                                        await getCreator(params.username);
                                                    } }
                                                    className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#820303" className="bi bi-heart-fill mt-1" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                                        </svg>
                                                </button>
                                                :
                                                <button 
                                                    onClick={ async () => {
                                                        await createPostlike(post?.id);
                                                        await getCreator(params.username);
                                                    } }
                                                    className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart mt-1" viewBox="0 0 16 16">
                                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                                        </svg>
                                                </button>
                                            }

                                            <div 
                                                className="modal fade" 
                                                id={`likeModal${ post?.id }`} 
                                                tabIndex="-1" aria-labelledby="likeModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title fs-5 fw-semibold">Like post</h4>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="d-flex justify-content-end">
                                                                {(post?.likes?.length > 0) && post.likes?.find(foundLike => foundLike?.user?.id == user?.id)
                                                                    ? 
                                                                    <button 
                                                                        onClick={ async () => {
                                                                            await destroyPostlike((post?.likes?.length > 0) && post.likes?.find(foundLike => foundLike?.user?.id == user?.id));
                                                                            await getCreator(params.username);
                                                                        } }
                                                                        className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent gap-2">
                                                                            <span className='text-faansy-red'>Unlike post</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#820303" className="bi bi-heart-fill mt-1" viewBox="0 0 16 16">
                                                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                                                            </svg>
                                                                    </button>
                                                                    :
                                                                    <button 
                                                                        onClick={ async () => {
                                                                            await createPostlike(user?.id, post?.id);
                                                                            await getCreator(params.username);
                                                                        } }
                                                                        className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent gap-2">
                                                                            <span className='text-faansy-red'>Like post</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart mt-1" viewBox="0 0 16 16">
                                                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                                                            </svg>
                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>

                                                        <hr />

                                                        <div>
                                                            <div className="modal-header">
                                                                <h4 className="modal-title fs-6 fw-semibold">Post likes</h4>
                                                                <small><span className="fw-semibold">{ post?.likes?.length }</span>{ (post?.likes?.length > 1) ? ' likes' : ' like' }</small>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div>
                                                                    {(post?.likes?.length > 0) ? post.likes?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at)).map(sortedLike => {
                                                                        if (sortedLike?.post?.id == post?.id){
                                                                        return (
                                                                            <div 
                                                                                key={ sortedLike.id } 
                                                                                className='border-bottom d-flex flex-column'>
                                                                                <span>{ sortedLike?.body }</span>
                                                                                <span className='align-self-end'>by&nbsp;
                                                                                    <a 
                                                                                        href={ route('home.users.show', { username: sortedLike?.user?.username })} 
                                                                                        className='text-decoration-none text-faansy-red'>
                                                                                        { `${ sortedLike?.user?.first_name } ${ sortedLike?.user?.last_name }` }
                                                                                    </a>,&nbsp;
                                                                                    { dayjs.utc(sortedLike.created_at).fromNow() }</span>
                                                                            </div>
                                                                        )}}) : (
                                                                            <div>
                                                                                <span>No like</span>
                                                                            </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>

                                        <span className='comment-section'>
                                            <button 
                                                href="" 
                                                type='button' 
                                                data-bs-toggle="modal" 
                                                data-bs-target={`#commentModal${ post?.id }`} 
                                                data-bs-body='' 
                                                className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                                </svg>
                                            </button>

                                            <div 
                                                className="modal fade" 
                                                id={`commentModal${ post?.id }`} 
                                                tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title fs-5 fw-semibold">Comment on post</h4>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form onSubmit={ commentOnPost }>
                                                                <div className="d-none">
                                                                    <input 
                                                                        type="text" 
                                                                        name="post_id" 
                                                                        id="post_id" 
                                                                        defaultValue={ post?.id } 
                                                                        hidden="hidden" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <textarea 
                                                                        name="body" 
                                                                        id="body" 
                                                                        value={postCommentBody}
                                                                        onChange={e => setPostCommentBody(e.target.value)}
                                                                        placeholder={` Nice post @${post.user.username} ...`} 
                                                                        aria-label="Comment body"
                                                                        className="form-control"></textarea>
                                                                </div>
                                                                <div className="d-flex justify-content-end">
                                                                    <button type="submit" className="btn btn-sm btn-faansy-red text-light">Comment</button>
                                                                </div>
                                                            </form>
                                                        </div>

                                                        <hr />

                                                        <div>
                                                            <div className="modal-header">
                                                                <h4 className="modal-title fs-6 fw-semibold">Comments on post</h4>
                                                                <small><span className="fw-semibold">{ post?.comments?.length }</span>{ (post?.comments?.length > 1) ? ' comments' : ' comment' }</small>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div>
                                                                    {(post?.comments?.length > 0) ? post.comments?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at)).map(sortedComment => {
                                                                        if (sortedComment?.post?.id == post?.id){
                                                                        return (
                                                                            <div 
                                                                                key={ sortedComment.id } 
                                                                                className='border-bottom d-flex flex-column'>
                                                                                <span>{ sortedComment?.body }</span>
                                                                                <span className='align-self-end'>by&nbsp;
                                                                                    <a 
                                                                                        href={ route('home.users.show', { username: sortedComment?.user?.username })} 
                                                                                        className='text-decoration-none text-faansy-red'>
                                                                                        { `${ sortedComment?.user?.first_name } ${ sortedComment?.user?.last_name }` }
                                                                                    </a>,&nbsp;
                                                                                    { dayjs.utc(sortedComment.created_at).fromNow() }</span>
                                                                            </div>
                                                                        )}}) : (
                                                                            <div>
                                                                                <span>No comment</span>
                                                                            </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>

                                        { post?.user?.id != user?.id &&
                                            <span className='tip-section'>
                                                <button 
                                                    href="" 
                                                    type='button' 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target={`#tipModal${ post?.id }`}
                                                    data-bs-body={ `@${post?.user?.id}` }
                                                    className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                                                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
                                                    </svg>
                                                    <span className="text-uppercase">Send Tip</span>
                                                </button>

                                                <div className="modal fade" id={`tipModal${ post?.id }`} tabIndex="-1" aria-labelledby="tipModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h4 className="modal-title fs-5 fw-semibold" id="tipModalLabel">Specify Amount (in units only)</h4>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form onSubmit={ sendTip }>
                                                                    <div className="d-none">
                                                                        <input 
                                                                            type="text" 
                                                                            name="recipient_id" 
                                                                            id="recipient_id" 
                                                                            defaultValue={ post?.user?.id } 
                                                                            hidden="hidden" />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <textarea 
                                                                            name="amount" 
                                                                            id="amount" 
                                                                            placeholder='e.g. 20.50' 
                                                                            aria-label="Tip amount"
                                                                            className="form-control"></textarea>
                                                                    </div>
                                                                    <div className="d-flex justify-content-end">
                                                                        <button type="submit" className="btn btn-sm btn-faansy-red text-light">Tip</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        }
                                    </div>

                                    <div>
                                        {(post?.bookmarks?.length > 0) && post.bookmarks?.find(foundBookmark => foundBookmark?.user?.id == user?.id)
                                            ? 
                                                <button 
                                                    onClick={ async () => {
                                                        await destroyBookmark((post?.bookmarks?.length > 0) && post.bookmarks?.find(foundBookmark => foundBookmark?.user?.id == user?.id));
                                                        await getCreator(params.username);
                                                    } }
                                                    className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#820303" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                                                            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                                                        </svg>
                                                </button>
                                            :
                                            <button 
                                                onClick={ async () => {
                                                    await createBookmark(post?.id);
                                                    await getCreator(params.username);
                                                } }
                                                className="text-decoration-none text-secondary d-flex align-items-center border-0 bg-transparent">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bookmark"
                                                    viewBox="0 0 16 16">
                                                        <path
                                                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                                                    </svg>
                                            </button>
                                        }
                                    </div>
                                </section>

                                <section className="px-3 d-flex gap-3">
                                    <span 
                                        type='button' 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#likeModal${ post?.id }`} 
                                        data-bs-body=''><span className="fw-semibold">{ post?.likes?.length }</span>{ (post?.likes?.length > 1) ? ' likes' : ' like' }</span>
                                    <span 
                                        type='button' 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#commentModal${ post?.id }`} 
                                        data-bs-body=''><span className="fw-semibold">{ post?.comments?.length }</span>{ (post?.comments?.length > 1) ? ' comments' : ' comment' }</span>
                                </section>
                            </article>
                        )
                    }) : (creator?.data?.posts?.length < 1) ? (
                        <section className='vh-100 d-flex justify-content-center align-items-center'>
                            <span className='h-50 text-center fw-semibold'>No user posts yet.</span>
                        </section>
                    ) : (
                        <section className='vh-50 pt-5 mt-2'>
                            <Loading />
                        </section>
                    )}
                </div>
            </section>

        </section>
    )
}
