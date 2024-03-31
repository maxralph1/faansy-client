import { useContext, useState } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { usePosts } from '@/hooks/usePosts.jsx';
import { usePost } from '@/hooks/usePost.jsx';
import { useBookmark } from '@/hooks/useBookmark.jsx';
import { usePostcomment } from '@/hooks/usePostcomment.jsx';
import { usePostlike } from '@/hooks/usePostlike.jsx';
import { useTip } from '@/hooks/useTip.jsx';
import { usePoll } from '@/hooks/usePoll.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';
import Logo from '@/assets/images/logo.png';
import MissingImage from '@/assets/images/name_non-transparent.png';


export default function Index() {
    const { user } = useContext(AuthContext);
    const { posts, getPosts } = usePosts();
    const { post, createPost, featurePost, destroyPost } = usePost();
    const { createPostcomment, destroyPostcomment } = usePostcomment();
    const { createPostlike, destroyPostlike } = usePostlike();
    const { createTip } = useTip();
    const { createBookmark, destroyBookmark } = useBookmark();
    const { createPoll } = usePoll();

    console.log(posts);

    const [copiedLink, setCopiedLink] = useState();
    console.log(copiedLink);

    const handleCopyLink = async () => {
        try {
            console.log(copiedLink);
            await navigator.clipboard.writeText(copiedLink);
            alert("Copied to clipboard!");
            alert(copiedLink);
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    };

    
    /* Post */
    const first_page = 1;
    const pageNumberForward = (posts?.meta?.current_page + 1 > posts?.meta?.last_page) ? posts?.meta?.last_page : posts?.meta?.current_page + 1;
    const pageNumberBackward = (posts?.meta?.current_page - 1 < first_page) ? first_page : posts?.meta?.current_page - 1;
    // console.log(pageNumberForward);
    // console.log(pageNumberBackward);
    // console.log(user);
    // console.log(posts);

    async function submitPost(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('body', post.data.body);
        post.data.image_url && formData.append('image_url', post.data.image_url);
        post.data.image_url_2 && formData.append('image_url_2', post.data.image_url_2);
        post.data.image_url_3 && formData.append('image_url_3', post.data.image_url_3);
        post.data.image_url_4 && formData.append('image_url_4', post.data.image_url_4);
        post.data.video_url && formData.append('video_url', post.data.video_url);
        post.data.scheduled_live_time && formData.append('scheduled_live_time', post.data.scheduled_live_time);
        post.data.pay_per_view == 'on' ? formData.append('pay_per_view', 1) : formData.append('pay_per_view', 0);
        post.data.payperviewamount && formData.append('payperviewamount', post.data.payperviewamount);

        // console.log(post.data.body);
        // console.log(post.data.image_url);
        // console.log(post.data.image_url_2);
        // console.log(post.data.image_url_3);
        // console.log(post.data.image_url_4);
        // console.log(post.data.video_url);
        // console.log(post.data.scheduled_live_time);
        // console.log(post.data.pay_per_view);
        // console.log(event.pay_per_view);
        // console.log(post.data.payperviewamount);

        await createPost(formData);

        post.data.body = '';
        post.data.image_url = '';
        post.data.image_url_2 = '';
        post.data.image_url_3 = '';
        post.data.image_url_4 = '';
        post.data.video_url = '';
        post.data.scheduled_live_time = '';
        post.data.pay_per_view = '';
        post.data.payperviewamount = '';

        await getPosts(posts?.meta?.current_page);
    }
    /* Post end */

    /* Post comment*/
    const [postCommentBody, setPostCommentBody] = useState();

    async function commentOnPost(event) {
        event.preventDefault();

        const post_id = event.target.post_id.value;
        const body = postCommentBody;

        await createPostcomment(post_id, body);
        setPostCommentBody('');
        await getPosts(posts?.meta?.current_page);
    }
    /* Post comment end */

    /* Tip */
    async function sendTip(event) {
        event.preventDefault();

        const recipient_id = event.target.recipient_id.value;
        const amount = event.target.amount.value;

        await createTip(recipient_id, amount);
        await getPosts(posts?.meta?.current_page);
    }
    /* Tip end */


    /* Poll*/
    const [questionnaire, setQuestionnaire] = useState();
    const [closingTime, setClosingTime] = useState();
    const [pollOption1, setPollOption1] = useState();
    const [pollOption2, setPollOption2] = useState();
    const [pollOption3, setPollOption3] = useState();
    const [pollOption4, setPollOption4] = useState();

    async function addPoll(event) {
        event.preventDefault();

        // console.log(questionnaire, closingTime, pollOption1, pollOption2, pollOption3, pollOption4)

        const questionnaire = event.target.questionnaire.value;
        const closingTime = event.target.closingTime.value;
        const pollOption1 = event.target.pollOption1.value;
        const pollOption2 = event.target.pollOption2.value;
        const pollOption3 = event.target.pollOption3.value;
        const pollOption4 = event.target.pollOption4.value;

        await createPoll(questionnaire, closingTime, pollOption1, pollOption2, pollOption3, pollOption4);

        setQuestionnaire('');
        setClosingTime('');
        setPollOption1('');
        setPollOption2('');
        setPollOption3('');
        setPollOption4('');

        await getPosts(posts?.meta?.current_page);
    }
    /* Poll end */


    return (
        <Layout>
            {/* <section className="col-sm-10 col-md-5 card rounded-0"> */}
            <section className="col-sm-9 col-md-5 card rounded-0 main-content">
                <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                    <h1 className="text-uppercase fs-5 fw-bold">Home</h1>
                    <span className="mb-2">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg> */}
                    </span>
                </div>

                <section>
                    <div className="mb-1" id='new-post'>
                        <form onSubmit={ submitPost } encType='multipart/form-data'>
                            <textarea 
                                name="body" 
                                id="body" 
                                value={ post.data.body ?? '' }
                                onChange={ event => post.setData({
                                    ...post.data,
                                    body: event.target.value,
                                }) }
                                className="form-control border-bottom-0 rounded-0" 
                                rows="3" 
                                placeholder="Compose new post ..."></textarea>
                            <div className="d-flex justify-content-between px-3 pt-2 pb-3 border-bottom">
                                <div className='d-flex column-gap-3'>
                                    <span>
                                        <span 
                                            type="button"
                                            href="#add-image" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#addImageModal" 
                                            data-bs-whatever="addImage">
                                            <div className="text-decoration-none text-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                                                </svg>
                                            </div>
                                        </span>
                                    </span>
                                    <span>
                                        <span 
                                            type="button"
                                            href="#add-video" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#addVideoModal" 
                                            data-bs-whatever="addVideo">
                                            <div className="text-decoration-none text-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
                                                </svg> 
                                            </div>
                                        </span>
                                    </span>
                                    <span>
                                        <span 
                                            type="button"
                                            href="#add-poll" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#addPollModal" 
                                            data-bs-whatever="addPoll">
                                            <div className="text-decoration-none text-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clipboard-data-fill" viewBox="0 0 16 16">
                                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1"/>
                                                </svg>
                                            </div>
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <button 
                                        type='submit' 
                                        className='btn btn-sm btn-faansy-red text-light'>Post
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <section className="border-top">
                        {(posts?.data?.length > 0) ? posts?.data.map(post => {
                            return (
                                <article key={ post?.id } className="card border-0 border-top border-bottom pb-3 rounded-0">
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
                                                        <span>reposted</span> { dayjs.utc(post?.created_at).fromNow() }
                                                    </small>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#4c5661" className="bi bi-three-dots"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                    <div className={ `card-body ${ post.repost == true && 'px-5' }` }>
                                        <div className="d-flex justify-content-between mb-3">
                                            <Link 
                                                to={ route('home.users.show', {'username': post.user.username}) }
                                                className="d-flex justify-content-start align-items-center column-gap-2 text-decoration-none">
                                                <div className="rounded-circle">
                                                    <img src={ post?.user?.user_image_url ? `${ Constants.serverURL }/storage/${ post?.user?.user_image_url }` : Logo } alt="" width="65" height='65' className='object-fit-cover rounded' />
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
                                                    <span className="text-body-secondary">@{ post?.user?.username }</span>
                                                </div>
                                            </Link>
                            
                                            <div className="d-flex column-gap-3">
                                                <span className="text-body-secondary">
                                                    { post?.repost_original_post_timestamp != null 
                                                        ? dayjs.utc(post?.repost_original_post_timestamp).fromNow() 
                                                        : dayjs.utc(post?.created_at).fromNow()}
                                                </span>
                                                <span 
                                                    type='button' 
                                                    onClick={ async () => {
                                                        await setCopiedLink(`${ Constants?.clientURL }/#/${ post?.id }`);
                                                        await handleCopyLink();
                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                                    </svg>
                                                </span>
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
                                                                    await getPosts(posts?.meta?.current_page);
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
                                                                            await getPosts(posts?.meta?.current_page);
                                                                        } }
                                                                        type='button' 
                                                                        className="dropdown-item fw-bold text-secondary" href="#delete-post"><small>Delete Post</small>
                                                                    </button>
                                                                </li>
                                                            </>
                                                        }
                                                    </ul>
                                                </span>
                                            </div>
                                        </div>
                            
                                        <p className="card-text">{ post.body }</p>
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
                                                                <button key={index} type="button" data-bs-target={`carouselIndicators${ image?.id }`} data-bs-slide-to={index} className="active" aria-current="true" aria-label={ `Slide` + (index+1) }></button>
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
                                                            await getPosts(posts?.meta?.current_page);
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
                                                            await getPosts(posts?.meta?.current_page);
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
                                                                                await getPosts(posts?.meta?.current_page);
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
                                                                                await createPostlike(post?.id);
                                                                                await getPosts(posts?.meta?.current_page);
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
                                                                            console.log(sortedLike)
                                                                            if (sortedLike?.post?.id == post?.id){
                                                                            return (
                                                                                <article 
                                                                                    key={ sortedLike.id } 
                                                                                    className='border-bottom py-2 d-flex flex-wrap justify-content-between align-items-center gap-2'>
                                                                                        <span className=''>
                                                                                            <a 
                                                                                                href={ route('home.users.show', { username: sortedLike?.user?.username })} 
                                                                                                className='text-decoration-none text-faansy-red d-flex align-items-center column-gap-2'>
                                                                                                    <img src={ sortedLike?.user?.user_image_url ? `${ Constants.serverURL }/storage/${ sortedLike?.user?.user_image_url }` : '' } alt="" width="30" height="30" className='object-fit-cover border border-light border-1 rounded-circle d-block' />
                                                                                                    <span>{ `${ sortedLike?.user?.first_name } ${ sortedLike?.user?.last_name }` }</span>
                                                                                            </a>
                                                                                        </span>
                                                                                        <span>
                                                                                            <small><small>{ dayjs.utc(sortedLike.created_at).fromNow() }</small></small>
                                                                                        </span>
                                                                                </article>
                                                                            )}}) : (
                                                                                <div className='py-3'>
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
                                                                            name="user_id" 
                                                                            id="user_id" 
                                                                            defaultValue={ user?.id } 
                                                                            hidden="hidden" />
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
                                                                <div className="modal-body" style={{ marginTop: '0', paddingTop: '0' }}>
                                                                    <div>
                                                                        {(post?.comments?.length > 0) ? post.comments?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at)).map(sortedComment => {
                                                                            console.log(sortedComment)
                                                                            if (sortedComment?.post?.id == post?.id){
                                                                            return (
                                                                                <article 
                                                                                    key={ sortedComment.id } 
                                                                                    className='border-bottom d-flex flex-column pb-3'>
                                                                                        <span className='align-self-start justify-self-start'>&nbsp;
                                                                                            <a 
                                                                                                href={ route('home.users.show', { username: sortedComment?.user?.username })} 
                                                                                                className='text-decoration-none text-faansy-red d-flex align-items-center gap-2'>
                                                                                                    <img src={ sortedComment?.user?.user_image_url ? `${ Constants.serverURL }/storage/${ sortedComment?.user?.user_image_url }` : '' } alt="" width="30" height="30" className='object-fit-cover border border-light border-1 rounded-circle d-block' />
                                                                                                    <span>{ `${ sortedComment?.user?.first_name } ${ sortedComment?.user?.last_name }` }</span>
                                                                                            </a>
                                                                                        </span>
                                                                                        <span>
                                                                                            <small><small>{ dayjs.utc(sortedComment.created_at).fromNow() }</small></small>
                                                                                        </span>
                                                                                        <span className='pt-2'>{ sortedComment?.body }</span>
                                                                                </article>
                                                                            )}}) : (
                                                                                <div className='py-3'>
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

                                            { post?.user?.id !== user?.id &&
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
                                                            await getPosts(posts?.meta?.current_page);
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
                                                        await getPosts(posts?.meta?.current_page);
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
                        }) : (posts?.data?.length < 1) ? (
                                <section className='vh-100 d-flex justify-content-center align-items-center'>
                                    <span className='h-50 text-center fw-semibold px-5'>No posts yet in your feeds.</span>
                                </section>
                        ) : (
                                <section className='vh-100 pt-5 mt-2 px-5'>
                                    <div className='h-50 px-5'>
                                        <Loading />
                                    </div>
                                </section>
                        )}
                    </section>

                    <div className='d-flex justify-content-center gap-2 py-4'>
                        { ((posts?.data?.length > 0) && ((posts?.meta?.current_page > first_page))) 
                        &&
                            <div className="d-flex justify-content-center">
                                <button 
                                    type="button"
                                    onClick={ async () => {
                                        await getPosts(pageNumberBackward)
                                    } }
                                    className="btn btn-outline-secondary py-1 px-3 rounded-pill text-faansy-red text-uppercase fw-semibold show-more">
                                        Go back
                                </button>
                            </div>
                        }

                        { ((posts?.data?.length > 0) && ((posts?.meta?.current_page < posts?.meta?.last_page))) 
                        &&
                            <div className="d-flex justify-content-center">
                                <button 
                                    type="button"
                                    onClick={ async () => {
                                        await getPosts(pageNumberForward)
                                    } }
                                    className="btn btn-outline-secondary py-1 px-3 rounded-pill text-faansy-red text-uppercase fw-semibold show-more">
                                        Show More
                                </button>
                            </div>
                        }
                    </div>
                </section>

                <section className='modal-section'>
                    <div 
                        className="modal fade add-image" 
                        id="addImageModal" 
                        tabIndex="-1" 
                        aria-labelledby="addImageModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="addImageModalLabel">Add Image Post</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ submitPost } encType='multipart/form-data'>
                                        <div className="mb-3 d-flex flex-column row-gap-2">
                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        name="image_url" 
                                                        id="image_url" 
                                                        className='form-control' 
                                                        onChange={ event => post.setData({
                                                            ...post.data,
                                                            image_url: event.target.files[0],
                                                        }) } />
                                                </div>
                                                <small style={{ marginTop: '-10px' }}><small>*Upload image</small></small>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        name="image_url_2" 
                                                        id="image_url_2" 
                                                        className='form-control'
                                                        onChange={ event => post.setData({
                                                            ...post.data,
                                                            image_url_2: event.target.files[0],
                                                        }) } />
                                                </div>
                                                <small style={{ marginTop: '-10px' }}><small>*Upload image</small></small>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        name="image_url_3" 
                                                        id="image_url_3" 
                                                        className='form-control' 
                                                        onChange={ event => post.setData({
                                                            ...post.data,
                                                            image_url_3: event.target.files[0],
                                                        }) } />
                                                </div>
                                                <small style={{ marginTop: '-10px' }}><small>*Upload image</small></small>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        name="image_url_4" 
                                                        id="image_url_4" 
                                                        className='form-control' 
                                                        onChange={ event => post.setData({
                                                            ...post.data,
                                                            image_url_4: event.target.files[0],
                                                        }) } />
                                                </div>
                                                <small style={{ marginTop: '-10px' }}><small>*Upload image</small></small>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <textarea 
                                                        name="body" 
                                                        id="body" 
                                                        value={ post.data.body ?? '' }
                                                        onChange={ event => post.setData({
                                                            ...post.data,
                                                            body: event.target.value,
                                                        }) }
                                                        className="form-control" 
                                                        rows="3" 
                                                        placeholder="Compose new post ..." 
                                                        required></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row row-gap-2 d-flex justify-content-end border-top pt-3'>
                                            <div className='col-6'>
                                                <input 
                                                    type="datetime-local" 
                                                    name="scheduled_live_time" 
                                                    id="scheduled_live_time" 
                                                    value={ post.data.scheduled_live_time ?? '' }
                                                    className='form-control'
                                                    onChange={ event => post.setData({
                                                        ...post.data,
                                                        scheduled_live_time: event.target.value,
                                                    }) } />
                                            </div>
                                            <small className='text-end' style={{ marginTop: '-10px' }}><small>*Scheduled up time (if applicable)</small></small>
                                        </div>

                                        <div className='row row-gap-2 d-flex align-items-center pt-2'>
                                            <div className='col-md'>
                                                <div className="form-check form-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        name="pay_per_view" 
                                                        id="pay_per_view" 
                                                        // value={ post.data.pay_per_view ?? '' }
                                                        className="form-check-input" 
                                                        onChange={ event => post.setData({
                                                            ...post.data,
                                                            pay_per_view: event.target.value,
                                                        }) } 
                                                        role="switch" />
                                                    <small className="form-check-label" htmlFor="pay_per_view">Make Pay-Per-View</small>
                                                </div>
                                            </div>
                                            <div className='col-md'>
                                                <input 
                                                    type="text" 
                                                    name="payperviewamount" 
                                                    id="payperviewamount" 
                                                    value={ post.data.payperviewamount ?? '' }
                                                    className='form-control' 
                                                    onChange={ event => post.setData({
                                                        ...post.data,
                                                        payperviewamount: event.target.value,
                                                    }) } 
                                                    placeholder='PPV Amount (USD)' />
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="pe-0 me-0 d-flex justify-content-end">
                                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Post</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="modal fade add-video" 
                        id="addVideoModal" 
                        tabIndex="-1" 
                        aria-labelledby="addVideoModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="addVideoModalLabel">Add Video Post</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ submitPost } encType='multipart/form-data'>
                                        <div className="mb-3 d-flex flex-column row-gap-2">
                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="video/*"
                                                        name="video_url" 
                                                        id="video_url" 
                                                        className='form-control'
                                                        default={ post.data.video_url ?? '' }
                                                        onChange={ event => post.setData({
                                                            ...post.data,
                                                            video_url: event.target.files[0],
                                                        }) } />
                                                </div>
                                                <small style={{ marginTop: '-10px' }}><small>*Upload video</small></small>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <textarea 
                                                        name="body" 
                                                        id="body" 
                                                        value={ post.data.body ?? '' }
                                                        onChange={ event => post.setData({
                                                            ...post.data,
                                                            body: event.target.value,
                                                        }) }
                                                        className="form-control" 
                                                        rows="3" 
                                                        placeholder="Compose new post ..." 
                                                        required></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row row-gap-2 d-flex justify-content-end border-top pt-3'>
                                            <div className='col-6'>
                                                <input 
                                                    type="datetime-local" 
                                                    name="scheduled_live_time" 
                                                    id="scheduled_live_time" 
                                                    value={ post.data.scheduled_live_time ?? '' }
                                                    className='form-control'
                                                    onChange={ event => post.setData({
                                                        ...post.data,
                                                        scheduled_live_time: event.target.value,
                                                    }) } />
                                            </div>
                                            <small className='text-end' style={{ marginTop: '-10px' }}><small>*Scheduled up time (if applicable)</small></small>
                                        </div>

                                        <div className='row row-gap-2 d-flex align-items-center pt-2'>
                                            <div className='col-md'>
                                                <div className="form-check form-switch">
                                                    <input 
                                                        type="checkbox" 
                                                        name="pay_per_view" 
                                                        id="pay_per_view" 
                                                        // value={ post.data.pay_per_view ?? '' }
                                                        className="form-check-input" 
                                                        onChange={ event => post.setData({
                                                            ...post.data,
                                                            pay_per_view: event.target.value,
                                                        }) } 
                                                        role="switch" />
                                                    <small className="form-check-label" htmlFor="pay_per_view">Make Pay-Per-View</small>
                                                </div>
                                            </div>
                                            <div className='col-md'>
                                                <input 
                                                    type="text" 
                                                    name="payperviewamount" 
                                                    id="payperviewamount" 
                                                    value={ post.data.payperviewamount ?? '' }
                                                    className='form-control' 
                                                    onChange={ event => post.setData({
                                                        ...post.data,
                                                        payperviewamount: event.target.value,
                                                    }) } 
                                                    placeholder='PPV Amount (USD)' />
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="pe-0 me-0 d-flex justify-content-end">
                                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Post</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="modal fade add-poll" 
                        id="addPollModal" 
                        tabIndex="-1" 
                        aria-labelledby="addPollModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="addPollModalLabel">Add Poll</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ addPoll }>
                                        <div className="mb-3 d-flex flex-column row-gap-2">
                                            <section className="d-flex flex-column row-gap-2">
                                                <textarea 
                                                    type="text" 
                                                    name="questionnaire" 
                                                    id="questionnaire" 
                                                    className='form-control'
                                                    value={ questionnaire } 
                                                    onChange={e => setQuestionnaire(e.target.value)}
                                                    placeholder="Questionnaire" 
                                                    required >
                                                </textarea>
                                                <input 
                                                    type="datetime-local" 
                                                    name="closingTime" 
                                                    id="closingTime" 
                                                    className='form-control w-50 align-self-end'
                                                    value={ closingTime } 
                                                    onChange={e => setClosingTime(e.target.value)}
                                                    placeholder="Poll Option 1" 
                                                    required />
                                                    <small className='text-end' style={{ marginTop: '-10px' }}><small>*Closing time (if applicable)</small></small>
                                            </section>

                                            <hr />

                                            <section className="mb-3 d-flex flex-column row-gap-2">
                                                <input 
                                                    type="text" 
                                                    name="pollOption1" 
                                                    id="pollOption1" 
                                                    className='form-control'
                                                    value={ pollOption1 } 
                                                    onChange={e => setPollOption1(e.target.value)}
                                                    placeholder="Poll Option 1" 
                                                    required />
                                                <input 
                                                    type="text" 
                                                    name="pollOption2" 
                                                    id="pollOption2" 
                                                    className='form-control'
                                                    value={ pollOption2 } 
                                                    onChange={e => setPollOption2(e.target.value)}
                                                    placeholder="Poll Option 2" 
                                                    required />
                                                <input 
                                                    type="text" 
                                                    name="pollOption3" 
                                                    id="pollOption3" 
                                                    className='form-control'
                                                    value={ pollOption3 } 
                                                    onChange={e => setPollOption3(e.target.value)}
                                                    placeholder="Poll Option 3 (if applicable)" />
                                                <input 
                                                    type="text" 
                                                    name="pollOption4" 
                                                    id="pollOption4" 
                                                    className='form-control'
                                                    value={ pollOption4 } 
                                                    onChange={e => setPollOption4(e.target.value)}
                                                    placeholder="Poll Option 4 (if applicable)" />
                                            </section>
                                        </div>

                                        <hr />

                                        <div className='d-flex justify-content-end'>
                                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Add Poll</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </Layout>
    )
}
