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
import { useCreator } from '@/hooks/useCreator.jsx';
import { usePoll } from '@/hooks/usePoll.jsx';
import { useUserverification } from '@/hooks/useUserverification.jsx';
import { useUserbecomecreator } from '@/hooks/useUserbecomecreator.jsx';
import { useMyPosts } from '@/hooks/useMyPosts.jsx';
import { usePost } from '@/hooks/usePost.jsx';
import { usePostcomment } from '@/hooks/usePostcomment.jsx';
import { usePostlike } from '@/hooks/usePostlike.jsx';
import { useBookmark } from '@/hooks/useBookmark.jsx';
import { useRestrict } from '@/hooks/useRestrict.jsx';
import { useBlock } from '@/hooks/useBlock.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';
import Logo from '@/assets/images/logo.png';
import MissingImage from '@/assets/images/name_non-transparent.png';
import MissingUserBackgroundImage from '@/assets/images/faansy_bg_index.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';


export default function MyProfile() {
    const { user } = useContext(AuthContext);
    const { creator, getCreator, updateCreator, updateProfilePhotoCreator, updateBackgroundPhotoCreator } = useCreator(user.username);
    const { posts, getPosts } = useMyPosts();
    const { post, createPost, featurePost, destroyPost } = usePost();
    // const { polls, getPolls } = usePolls();
    const { poll, getPoll, createPoll, updatePoll, destroyPoll } = usePoll();
    const { createBookmark, destroyBookmark } = useBookmark();
    const { userverification, createUserverification } = useUserverification();
    const { userbecomecreator, createUserbecomecreator } = useUserbecomecreator();
    const { createPostcomment, destroyPostcomment } = usePostcomment();
    const { createPostlike, destroyPostlike } = usePostlike();
    const { destroyRestrict } = useRestrict();
    const { destroyBlock } = useBlock();

    // console.log(user)
    // console.log(user.username)
    console.log(creator)

    /* Poll add states*/
    const [questionnaire, setQuestionnaire] = useState();
    const [closingTime, setClosingTime] = useState();
    const [pollOption1, setPollOption1] = useState();
    const [pollOption2, setPollOption2] = useState();
    const [pollOption3, setPollOption3] = useState();
    const [pollOption4, setPollOption4] = useState();

    /* User Profile Update states*/
    const [showActivityStatus, setShowActivityStatus] = useState(creator?.data?.show_activity_status);
    const [usersMustBeSubscribedToViewMyContent, setUsersMustBeSubscribedToViewMyContent] = useState(creator?.data?.users_must_be_subscribed_to_view_my_content);
    const [freeSubscription, setFreeSubscription] = useState(creator?.data?.free_subscription);
    const [showSubscriptionOffers, setShowSubscriptionOffers] = useState(creator?.data?.show_subscription_offers);
    const [darkMode, setDarkMode] = useState(creator?.data?.false);

    /* Verify Profile state*/
    const [userVerificationImageUrl, setUserVerificationImageUrl] = useState();

    /* Post comment state*/
    const [postCommentBody, setPostCommentBody] = useState();
    

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
        setPollOption1('');
        setPollOption2('');
        setPollOption3('');
        setPollOption4('');

        await getCreator();
    }

    async function updateProfile(event) {
        event.preventDefault();

        console.log(creator.data.first_name);
        console.log(creator.data.last_name);
        console.log(creator.data.username);
        console.log(creator.data.email);

        const formData = new FormData();
        // formData.append('_method', 'put');
        formData.append('first_name', creator.data.first_name);
        formData.append('last_name', creator.data.last_name);
        formData.append('username', creator.data.username);
        formData.append('email', creator.data.email);
        event.target.user_image_url.files[0] != null && formData.append('user_image_url', event.target.user_image_url.files[0]);
        event.target.user_background_image_url.files[0] != null && formData.append('user_background_image_url', event.target.user_background_image_url.files[0]);
        showActivityStatus == false ? formData.append('show_activity_status', 0) : formData.append('show_activity_status', 1);
        usersMustBeSubscribedToViewMyContent == false ? formData.append('users_must_be_subscribed_to_view_my_content', 0) : formData.append('users_must_be_subscribed_to_view_my_content', 1);
        freeSubscription == false ? formData.append('free_subscription', 0) : formData.append('free_subscription', 1);
        formData.append('subscription_amount', creator.data.subscription_amount);
        showSubscriptionOffers == false ? formData.append('show_subscription_offers', 0) : formData.append('show_subscription_offers', 1);

        /* Profile Section */ 
        formData.append('bio', creator.data.bio);
        formData.append('phone_number', creator.data.phone_number);
        formData.append('website_url', creator.data.website_url);
        formData.append('twitter_account', creator.data.twitter_account);
        formData.append('google_account', creator.data.google_account);
        formData.append('language', creator.data.language);
        darkMode == false ? formData.append('dark_mode', 0) : formData.append('dark_mode', 1);

        await updateCreator(formData);

        await getCreator(user.username);
    }

    async function updateProfilePhoto(event) {
        event.preventDefault();

        const formData = new FormData();
        event.target.user_image_url.files[0] != null && formData.append('user_image_url', event.target.user_image_url.files[0]);

        await updateProfilePhotoCreator(formData);

        await getCreator(user.username);
    }

    async function updateBackgroundPhoto(event) {
        event.preventDefault();

        const formData = new FormData();
        event.target.user_background_image_url.files[0] != null && formData.append('user_background_image_url', event.target.user_background_image_url.files[0]);

        await updateBackgroundPhotoCreator(formData);

        await getCreator(user.username);
    }

    async function commentOnPost(event) {
        event.preventDefault();

        const post_id = event.target.post_id.value;
        const body = postCommentBody;

        console.log(post_id, body);
        await createPostcomment(post_id, body);
        setPostCommentBody('');
        await getPosts();
    }
    
    async function verifyProfile(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('verification_material_image_url', userverification.data.verification_material_image_url);

        await createUserverification(formData);

        await getCreator(user.username);
    }
    
    async function becomeCreator(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('verification_material_image_url', userbecomecreator.data.verification_material_image_url);

        await createUserbecomecreator(formData);

        await getCreator(user.username);
    }

    // async function sendTip(event) {
    //     event.preventDefault();

    //     const recipient_id = event.target.recipient_id.value;
    //     const donor_id = event.target.donor_id.value;
    //     const amount = event.target.amount.value;

    //     await createTip(recipient_id, donor_id, amount);
    //     await getPosts();
    // }

    return (
        <Layout>
            <section className="col-sm-10 col-md-5 card rounded-0 main-content">
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
                    
                    <div className="d-flex align-items-center column-gap-3">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star"
                            viewBox="0 0 16 16">
                            <path
                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-up-right"
                            viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                            <path fillRule="evenodd"
                                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                        </svg> */}
                        <span className='mb-2 dropstart'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                className="bi bi-three-dots-vertical" style={{ marginTop: '10px' }} viewBox="0 0 16 16" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                            <ul className="dropdown-menu">
                                <li>
                                    <div 
                                        type="button"
                                        className="dropdown-item fw-bold" 
                                        href="#profilePhoto" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#profilePhotoModal" 
                                        data-bs-whatever="profilePhoto">
                                            <small>Update Profile Photo&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" class="bi bi-file-image" viewBox="0 0 16 16">
                                                    <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z"/>
                                                </svg>
                                            </small>
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        type="button"
                                        className="dropdown-item fw-bold" 
                                        href="#backgroundPhoto" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#backgroundPhotoModal" 
                                        data-bs-whatever="backgroundPhoto">
                                            <small>Update Background Photo&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" class="bi bi-image-fill" viewBox="0 0 16 16">
                                                    <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                                </svg>
                                            </small>
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        type="button"
                                        className="dropdown-item fw-bold" 
                                        href="#polls" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#pollsModal" 
                                        data-bs-whatever="polls">
                                            <small>Polls&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-bar-chart-fill mb-1" viewBox="0 0 16 16">
                                                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                                                </svg>
                                            </small>
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        type="button"
                                        className="dropdown-item fw-bold" 
                                        href="#add-poll" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#addPollModal" 
                                        data-bs-whatever="addPoll">
                                            <small>Add Poll&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-clipboard-data-fill mb-1" viewBox="0 0 16 16">
                                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1"/>
                                                </svg>
                                            </small>
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        type="button"
                                        className="dropdown-item fw-bold" 
                                        href="#update-profile" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#updateProfileModal" 
                                        data-bs-whatever="update-profile">
                                            <small>Update Profile&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#820303" className="bi bi-person-fill-gear mb-1" viewBox="0 0 16 16">
                                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                                </svg>
                                            </small>
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        type="button"
                                        className="dropdown-item fw-bold" 
                                        href="#get-verified" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#getVerifiedModal" 
                                        data-bs-whatever="get-verified">
                                            <small>Get Verified&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-patch-check-fill mb-1" viewBox="0 0 16 16">
                                                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                                </svg>
                                            </small>
                                    </div>
                                </li>
                                { user.role.title == 'generic-user' &&
                                    <li>
                                        <div 
                                            type="button"
                                            className="dropdown-item fw-bold" 
                                            href="#become-a-creator" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#becomeCreatorModal" 
                                            data-bs-whatever="become-a-creator">
                                                <small>Become a Creator&nbsp;
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-person-lines-fill mb-1" viewBox="0 0 16 16">
                                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                                                    </svg>
                                                </small>
                                        </div>
                                    </li> 
                                }
                                <li>
                                    <div 
                                        type="button"
                                        className="dropdown-item fw-bold" 
                                        href="#restricted-list" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#restrictedListModal" 
                                        data-bs-whatever="restricted-list">
                                            <small>Restricted List&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" class="bi bi-person-exclamation mb-1" viewBox="0 0 16 16">
                                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                                </svg>
                                            </small>
                                    </div>
                                </li> 
                                <li>
                                    <div 
                                        type="button"
                                        className="dropdown-item fw-bold" 
                                        href="#blocked-list" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#blockedListModal" 
                                        data-bs-whatever="blocked-list">
                                            <small>Blocked List&nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" class="bi bi-person-fill-exclamation mb-1" viewBox="0 0 16 16">
                                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                                </svg>
                                            </small>
                                    </div>
                                </li> 
                            </ul>
                        </span>
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
                                
                                { creator?.data?.posts?.filter((post => post?.video_url != null)).length > 0 &&
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
                        </div>
                    </div>
                </section>

                { (creator?.data?.polls?.length > 0) && 
                    <section className="mt-1 p-3 border-top rounded-0">
                        <div className='d-flex flex-column justify-content-between align-items-start'>
                            <h4 className='fs-6 fw-semibold margin-bottom mb-3'>Polls</h4>
                            <div className='d-flex flex-column gap-3'>
                                { creator?.data?.polls?.map(poll => {
                                    return (
                                        <article key={ poll.id } className='border-bottom mb-2'>
                                            <div className='d-flex align-items-start gap-2 border-bottom'>
                                                <h5 className='fs-6'>Questionnaire: <span className='fw-semibold'>{ poll.questionnaire }</span></h5>
                                                <small>({ `${(poll?.responses?.filter(response => response?.poll_id == poll?.id)).length}` } Vote{ `${((poll?.responses?.filter(response => response?.poll_id == poll?.id)).length > 1) ? 's' : ''}` })</small>
                                            </div>
                                            
                                            { poll?.options?.map(option => {
                                                return (
                                                    <div key={ option.id }>
                                                        <span 
                                                            className='d-flex gap-2'>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                                    </svg>
                                                                </span>
                                                                <span><small>{ option.option }</small></span>
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
                        {(posts?.data?.length > 0) ? posts?.data.map(post => {
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
                                                    {/* <span className="text-body-secondary">{dayjs.utc(post.created_at).format('MMM D, YYYY HH:mm')}</span> */}
                                                    <small className="text-body-secondary">
                                                        <span>reposted</span> { dayjs.utc(post.created_at).fromNow() }
                                                    </small>
                                                    {/* <span className="text-body-secondary">9 hours ago</span> */}
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
                                    <div className={ `card-body ${ post?.repost == true && 'px-5' }` }>
                                        <div className="d-flex justify-content-between mb-3">
                                            {/* <div className="d-flex justify-content-start align-items-center column-gap-2"> */}
                                                <Link 
                                                    to={ route('home.users.show', {'username': post?.user?.username})}
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
                                                        <span className="text-body-secondary">@{ post.user.username }</span>
                                                    </div>
                                                </Link>
                                            {/* </div> */}
                            
                                            <div className="d-flex column-gap-3">
                                                {/* <span className="text-body-secondary">{dayjs.utc(post.created_at).format('MMM D, YYYY HH:mm')}</span> */}
                                                <span className="text-body-secondary">
                                                    { post?.repost_original_post_timestamp != null 
                                                        ? dayjs.utc(post?.repost_original_post_timestamp).fromNow() 
                                                        : dayjs.utc(post?.created_at).fromNow()}
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
                                                                        await getPosts(posts?.meta?.current_page);
                                                                    } }
                                                                    type='button' 
                                                                    className="dropdown-item fw-bold" href="#make-post-featured"><small>Make Post Featured</small>
                                                                </button>
                                                            }
                                                            <li>
                                                                <Link 
                                                                    to={ route('home.posts.show', { id: post.id})}
                                                                    className="dropdown-item fw-bold" 
                                                                    href="#show-post"><small>View Post</small>
                                                                </Link>
                                                            </li>
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
                                                                        await getPosts();
                                                                    } }
                                                                    type='button' 
                                                                    className="dropdown-item fw-bold text-secondary" href="#delete-post"><small>Delete Post</small>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </span>
                                                }
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
                                                <div id={`carouselIndicators${ post?.id }`} className="carousel slide mb-3">
                                                    <div className="carousel-indicators">
                                                        { post?.images?.length > 0 && post?.images?.map((image, index) => {
                                                            return (
                                                                <button key={image?.id} type="button" data-bs-target={`carouselIndicators${ image?.id }`} data-bs-slide-to={index} className="active" aria-current="true" aria-label={ `Slide` + (index+1) }></button>
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
                                            <span className="card-img-bottom rounded d-flex justify-content-center align-items-center">
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
                                                            await getPosts();
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
                                                            await getPosts();
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
                                                                                await getPosts();
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
                                                                                await getPosts();
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

                                            {/* <span className='tip-section'>
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
                                                                        <input 
                                                                            type="text" 
                                                                            name="donor_id" 
                                                                            id="donor_id" 
                                                                            defaultValue={ user?.id } 
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
                                            </span> */}
                                        </div>

                                        <div>
                                            {(post?.bookmarks?.length > 0) && post.bookmarks?.find(foundBookmark => foundBookmark?.user?.id == user?.id)
                                                ? 
                                                    <button 
                                                        onClick={ async () => {
                                                            await destroyBookmark((post?.bookmarks?.length > 0) && post.bookmarks?.find(foundBookmark => foundBookmark?.user?.id == user?.id));
                                                            await getPosts();
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
                                                        await getPosts();
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
                                <span className='h-50 text-center fw-semibold'>You have not yet created posts.</span>
                            </section>
                        ) : (
                        <section className='vh-50 pt-5 mt-2'>
                            <Loading />
                        </section>
                        )}
                    </div>
                </section>


                <section className='modal-section'>
                    <div 
                        className="modal fade" 
                        id="profilePhotoModal" 
                        tabIndex="-1" 
                        aria-labelledby="profilePhotoModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="profilePhotoModalLabel">Update Profile Photo</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ updateProfilePhoto } encType='multipart/form-data'>
                                        <div className="mb-3 d-flex flex-column row-gap-2">
                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        name="user_image_url" 
                                                        id="user_image_url" 
                                                        className='form-control'
                                                        // value={ creator.data.user_image_url ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            user_image_url: event.target.files[0],
                                                        }) }
                                                        placeholder="User Image" />
                                                </div>
                                                <small style={{ marginTop: '-7px' }}><small>*Upload profile photo</small></small>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-end'>
                                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Update Profile Photo</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="modal fade" 
                        id="backgroundPhotoModal" 
                        tabIndex="-1" 
                        aria-labelledby="backgroundPhotoModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="backgroundPhotoModalLabel">Update Background Photo</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ updateBackgroundPhoto } encType='multipart/form-data'>
                                        <div className="mb-3 d-flex flex-column row-gap-2">
                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        name="user_background_image_url" 
                                                        id="user_background_image_url" 
                                                        className='form-control'
                                                        // value={ creator.data.user_background_image_url ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            user_background_image_url: event.target.files[0],
                                                        }) }
                                                        placeholder="User Profile Background Image" />
                                                </div>
                                                <small style={{ marginTop: '-7px' }}><small>*Upload background photo</small></small>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-end'>
                                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Update Background Photo</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="modal fade" 
                        id="pollsModal" 
                        tabIndex="-1" 
                        aria-labelledby="pollsModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="pollsModalLabel">Polls</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <section className=''>
                                        {(creator?.data?.polls?.length > 0) ? creator?.data?.polls?.map(poll => {
                                            return (
                                                <article key={ poll.id } className='border-bottom mb-4'>
                                                    <div className='d-flex align-items-start gap-2 border-bottom'>
                                                        <h5 className='fs-6'>Questionnaire: <span className='fw-semibold'>{ poll.questionnaire }</span></h5>
                                                        <small>({ `${(poll?.responses?.filter(response => response?.poll_id == poll?.id)).length}` } Vote{ `${((poll?.responses?.filter(response => response?.poll_id == poll?.id)).length > 1) ? 's' : ''}` })</small>
                                                    </div>
                                                    
                                                    { (poll?.options?.length > 0) ? poll?.options?.map(option => {
                                                        return (
                                                            <div key={ option.id }>
                                                                <span 
                                                                    className='d-flex gap-2'>
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#820303" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                                            </svg>
                                                                        </span>
                                                                        <span><small>{ option.option }</small></span>
                                                                </span>
                                                            </div>
                                                        )
                                                    }) : (
                                                        <span className='d-flex justify-content-center py-3'>No polls yet.</span>
                                                    )}
                                                </article>
                                            )
                                        }) : (
                                            <span className='d-flex justify-content-center py-3'>No polls yet.</span>
                                        )}
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="modal fade" 
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
                                            <section className="mb-3 d-flex flex-column row-gap-2">
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
                                                    className='form-control'
                                                    value={ closingTime } 
                                                    onChange={e => setClosingTime(e.target.value)}
                                                    placeholder="Poll Option 1" 
                                                    required />
                                                    <small><small>*Closing time (if applicable)</small></small>
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

                    <div 
                        className="modal fade" 
                        id="updateProfileModal" 
                        tabIndex="-1" 
                        aria-labelledby="updateProfileModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="updateProfileModalLabel">Update Profile</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ updateProfile } encType='multipart/form-data'>
                                        <div className="mb-3 d-flex flex-column row-gap-2">
                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        name="user_image_url" 
                                                        id="user_image_url" 
                                                        className='form-control'
                                                        // value={ creator.data.user_image_url ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            user_image_url: event.target.files[0],
                                                        }) }
                                                        placeholder="User Image" />
                                                </div>
                                                <small style={{ marginTop: '-7px' }}><small>*Upload your profile image</small></small>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        name="user_background_image_url" 
                                                        id="user_background_image_url" 
                                                        className='form-control'
                                                        // value={ creator.data.user_background_image_url ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            user_background_image_url: event.target.files[0],
                                                        }) }
                                                        placeholder="User Profile Background Image" />
                                                </div>
                                                <small style={{ marginTop: '-7px' }}><small>*Upload your profile background image</small></small>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="text" 
                                                        name="first_name" 
                                                        id="first_name" 
                                                        className='form-control'
                                                        value={ creator.data.first_name ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            first_name: event.target.value,
                                                        }) }
                                                        placeholder="First Name" />
                                                </div>
                                                <div className='col-md'>
                                                    <input 
                                                        type="text" 
                                                        name="last_name" 
                                                        id="last_name" 
                                                        className='form-control'
                                                        value={ creator.data.last_name ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            last_name: event.target.value,
                                                        }) }
                                                        placeholder="Last Name" />
                                                </div>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="text" 
                                                        name="username" 
                                                        id="username" 
                                                        className='form-control'
                                                        value={ creator.data.username ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            username: event.target.value,
                                                        }) }
                                                        placeholder="Userame" />
                                                </div>
                                                <div className='col-md'>
                                                    <input 
                                                        type="email" 
                                                        name="email" 
                                                        id="email" 
                                                        className='form-control'
                                                        value={ creator.data.email ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            email: event.target.value,
                                                        }) }
                                                        placeholder="Email" />
                                                </div>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <textarea 
                                                        type="text" 
                                                        name="bio" 
                                                        id="bio" 
                                                        className='form-control'
                                                        value={ creator.data.bio ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            bio: event.target.value,
                                                        }) }
                                                        placeholder="Bio"></textarea>
                                                </div>
                                            </div>

                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="text" 
                                                        name="twitter_account" 
                                                        id="twitter_account" 
                                                        className='form-control'
                                                        value={ creator.data.twitter_account ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            twitter_account: event.target.value,
                                                        }) }
                                                        placeholder="Twitter Account" />
                                                </div>

                                                <div className='col-md'>
                                                    <input 
                                                        type="text" 
                                                        name="google_account" 
                                                        id="google_account" 
                                                        className='form-control'
                                                        value={ creator.data.google_account ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            google_account: event.target.value,
                                                        }) }
                                                        placeholder="Google Account" />
                                                </div>
                                            </div>

                                            <div className='d-flex align-items-center gap-2'>
                                                { showActivityStatus == false ?
                                                    (<span 
                                                        type="button" 
                                                        onClick={() => setShowActivityStatus(true)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-off" viewBox="0 0 16 16">
                                                            <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                                                        </svg>
                                                    </span>) :
                                                    (<span 
                                                        type="button" 
                                                        onClick={() => setShowActivityStatus(false)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-on" viewBox="0 0 16 16">
                                                            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                                                        </svg>
                                                    </span>)
                                                }
                                                <small className="form-check-label" htmlFor="showActivityStatus">Show Activity Status</small>
                                            </div>

                                            <div className='d-flex align-items-center gap-2'>
                                                { usersMustBeSubscribedToViewMyContent == false ?
                                                    (<span 
                                                        type="button" 
                                                        onClick={() => setUsersMustBeSubscribedToViewMyContent(true)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-off" viewBox="0 0 16 16">
                                                            <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                                                        </svg>
                                                    </span>) :
                                                    (<span 
                                                        type="button" 
                                                        onClick={() => setUsersMustBeSubscribedToViewMyContent(false)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-on" viewBox="0 0 16 16">
                                                            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                                                        </svg>
                                                    </span>)
                                                }
                                                <small className="form-check-label" htmlFor="showActivityStatus">Users Must Be Subscribed To View My Content</small>
                                            </div>

                                            <div className='row row-gap-2 align-items-center'>
                                                <div className='col-md'>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        { freeSubscription == false ?
                                                            (<span 
                                                                type="button" 
                                                                onClick={() => setFreeSubscription(true)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-off" viewBox="0 0 16 16">
                                                                    <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                                                                </svg>
                                                            </span>) :
                                                            (<span 
                                                                type="button" 
                                                                onClick={() => setFreeSubscription(false)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-on" viewBox="0 0 16 16">
                                                                    <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                                                                </svg>
                                                            </span>)
                                                        }
                                                        <small className="form-check-label" htmlFor="showActivityStatus">Free Subscription</small>
                                                    </div>
                                                </div>
                                                <div className='col-md'>
                                                    <input 
                                                        type="text" 
                                                        name="subscription_amount" 
                                                        id="subscription_amount" 
                                                        className='form-control'
                                                        value={ creator.data.subscription_amount ?? '' } 
                                                        onChange={ event => creator.setData({
                                                            ...creator.data,
                                                            subscription_amount: event.target.value,
                                                        }) }
                                                        placeholder="Subscription Amount" />
                                                </div>
                                            </div>

                                            <div className='d-flex align-items-center gap-2'>
                                                { showSubscriptionOffers == false ?
                                                    (<span 
                                                        type="button" 
                                                        onClick={() => setShowSubscriptionOffers(true)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-off" viewBox="0 0 16 16">
                                                            <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                                                        </svg>
                                                    </span>) :
                                                    (<span 
                                                        type="button" 
                                                        onClick={() => setShowSubscriptionOffers(false)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-on" viewBox="0 0 16 16">
                                                            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                                                        </svg>
                                                    </span>)
                                                }
                                                <small className="form-check-label" htmlFor="showActivityStatus">Show Subscription Offers</small>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-end'>
                                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Update Profile</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="modal fade" 
                        id="getVerifiedModal" 
                        tabIndex="-1" 
                        aria-labelledby="getVerifiedModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="getVerifiedModalLabel">User Verification (Upload ID)</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ verifyProfile } encType='multipart/form-data'>
                                        <div className="mb-3 d-flex flex-column row-gap-2">
                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        name="verification_material_image_url" 
                                                        id="verification_material_image_url" 
                                                        className='form-control'
                                                        onChange={ event => userverification.setData({
                                                            ...userverification.data,
                                                            verification_material_image_url: event.target.files[0],
                                                        }) }
                                                        placeholder="User Verification Image" />
                                                </div>
                                                <small>
                                                    <small>*Could be an international passport, national ID card</small>
                                                </small>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-end'>
                                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Verify Profile</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="modal fade" 
                        id="becomeCreatorModal" 
                        tabIndex="-1" 
                        aria-labelledby="becomeCreatorModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="becomeCreatorModalLabel">Request to Become A Creator</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ becomeCreator } encType='multipart/form-data'>
                                        <div className="mb-3 d-flex flex-column row-gap-2">
                                            <div className='row row-gap-2'>
                                                <div className='col-md'>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        name="verification_material_image_url" 
                                                        id="verification_material_image_url" 
                                                        className='form-control'
                                                        onChange={ event => userbecomecreator.setData({
                                                            ...userbecomecreator.data,
                                                            verification_material_image_url: event.target.files[0],
                                                        }) }
                                                        placeholder="User Verification Image" />
                                                </div>
                                                <small style={{ marginTop: '-7.5px' }}>
                                                    <small>*Could be an international passport, national ID card</small>
                                                </small>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-end'>
                                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Send Request</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="modal fade" 
                        id="restrictedListModal" 
                        tabIndex="-1" 
                        aria-labelledby="restrictedListModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="restrictedListModalLabel">Restricted Users</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3 d-flex flex-column row-gap-2">
                                        <div className='row row-gap-2'>
                                            <div className='col-md'>
                                                { (creator?.data?.restrictor?.length > 0) ? creator?.data?.restrictor?.map(restrict => {
                                                    return (
                                                        <div key={ restrict?.id } className='d-flex justify-content-between align-items-center border-bottom py-2'>
                                                            <span className=''>
                                                                <Link 
                                                                    to={ route('home.users.show', { username: restrict?.restrictee?.username })} 
                                                                    className='text-decoration-none text-faansy-red'>
                                                                    { `${restrict?.restrictee?.first_name + ' ' + restrict?.restrictee?.last_name}` }
                                                                </Link>
                                                            </span>
                                                            <span>
                                                                <button 
                                                                    onClick={ async () => {
                                                                    await destroyRestrict(restrict);
                                                                    await getCreator(user?.username);
                                                                    } }
                                                                    className='btn btn-sm btn-faansy-red text-light'>
                                                                        <small>Unrestrict</small>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    )
                                                }) : (
                                                    <span className='d-flex justify-content-center'><small>You have no restricted users yet.</small></span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="modal fade" 
                        id="blockedListModal" 
                        tabIndex="-1" 
                        aria-labelledby="blockedListModalLabel" 
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5" id="blockedListModalLabel">Blocked Users</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3 d-flex flex-column row-gap-2">
                                        <div className='row row-gap-2'>
                                            <div className='col-md'>
                                                { (creator?.data?.blocker?.length > 0) ? creator?.data?.blocker?.map(block => {
                                                    return (
                                                        <div key={ block?.id } className='d-flex justify-content-between align-items-center border-bottom py-2'>
                                                            <span className=''>
                                                                <Link 
                                                                    to={ route('home.users.show', { username: block?.blocked?.username })} 
                                                                    className='text-decoration-none text-faansy-red'>
                                                                    { `${block?.blocked?.first_name + ' ' + block?.blocked?.last_name}` }
                                                                </Link>
                                                            </span>
                                                            <span>
                                                                <button 
                                                                    onClick={ async () => {
                                                                    await destroyBlock(block);
                                                                    await getCreator(user?.username);
                                                                    } }
                                                                    className='btn btn-sm btn-faansy-red text-light'>
                                                                        <small>Unblock</small>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    )
                                                }) : (
                                                    <span className='d-flex justify-content-center'><small>You have no restricted users yet.</small></span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </section>
        </Layout>
    )
}
