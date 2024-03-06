import { useContext, useState } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { usePosts } from '@/hooks/usePosts.jsx';
import { usePost } from '@/hooks/usePost.jsx';
import { useBookmark } from '@/hooks/useBookmark.jsx';
import { usePostcomment } from '@/hooks/usePostcomment.jsx';
import { usePostlike } from '@/hooks/usePostlike.jsx';
import { useTip } from '@/hooks/useTip.jsx';
import Layout from '@/components/private/Layout.jsx';
import Logo from '@/assets/images/logo.png';


export default function Edit() {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const { posts, getPosts } = usePosts();
    const { post, getPost, repostPost, destroyPost } = usePost(params.id);
    const { createPostcomment, destroyPostcomment } = usePostcomment();
    const { createPostlike, destroyPostlike } = usePostlike();
    const { createTip } = useTip();
    const { createBookmark, destroyBookmark } = useBookmark();

    console.log(post?.data)

    /* Post update */
    async function submitPostUpdate(event) {
        event.preventDefault();

        const formData = new FormData();
        // formData.append('_method', 'put');
        formData.append('body', post.data.body);
        post.data.image_url && formData.append('image_url', post.data.image_url);
        post.data.image_url_2 && formData.append('image_url_2', post.data.image_url_2);
        post.data.image_url_3 && formData.append('image_url_3', post.data.image_url_3);
        post.data.image_url_4 && formData.append('image_url_4', post.data.image_url_4);
        post.data.video_url && formData.append('video_url', post.data.video_url);
        post.data.scheduled_live_time && formData.append('scheduled_live_time', post.data.scheduled_live_time);
        post.data.pay_per_view == 'on' ? formData.append('pay_per_view', 1) : formData.append('pay_per_view', 0);
        post.data.payperviewamount && formData.append('payperviewamount', post.data.payperviewamount);

        // console.log(post.data.body)
        // console.log(event.target.body.value)

        await updatePost(formData);

        post.data.body = '';
        post.data.image_url = '';
        post.data.image_url_2 = '';
        post.data.image_url_3 = '';
        post.data.image_url_4 = '';
        post.data.video_url = '';
        post.data.scheduled_live_time = '';
        post.data.pay_per_view = '';
        post.data.payperviewamount = '';

        await getPost(params.id);
    }
    /* Post update end */

    /* Post comment*/
    const [postCommentBody, setPostCommentBody] = useState();

    async function commentOnPost(event) {
        event.preventDefault();

        const post_id = event.target.post_id.value;
        const body = postCommentBody;

        await createPostcomment(post_id, body);
        setPostCommentBody('');
        await getPost(params.id);
    }

    /* Tip */
    async function sendTip(event) {
        event.preventDefault();

        const recipient_id = event.target.recipient_id.value;
        const amount = event.target.amount.value;

        await createTip(recipient_id, amount);
        await getPost(params.id);
    }
    /* Tip end */

    return (
        <Layout>
            <section className="col-sm-10 col-md-5 card rounded-0 main-content">
                <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                <h2 className="text-uppercase fs-5 fw-bold">Edit Post</h2>
                    <span className="mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                    </span>
                </div>
                
                <div className="mt-2 mb-1 d-flex flex-column row-gap-2" id='update-post'>
                    <form onSubmit={submitPostUpdate}>
                        <div className="mb-3 d-flex flex-column row-gap-2">
                            <section className="mb-3 d-flex flex-column row-gap-2">
                                <div className='border-bottom'>
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
                                        placeholder="Update post ..."
                                        required></textarea>
                                </div>
                                
                                <div>
                                    <input 
                                        type="file" 
                                        accept="video/*"
                                        name="video_url" 
                                        id="video_url" 
                                        placeholder={ post.data.video_url }
                                        onChange={ event => post.setData({
                                            ...post.data,
                                            video_url: event.target.files[0],
                                        }) } 
                                        className='form-control rounded-0' />
                                    <small><small className='ps-3'>*Upload a video file (mp4, avi)</small></small>
                                </div>

                                <div>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        name="image_url" 
                                        id="image_url" 
                                        placeholder={ post.data.image_url }
                                        onChange={ event => post.setData({
                                            ...post.data,
                                            image_url: event.target.files[0],
                                        }) } 
                                        className='form-control rounded-0' />
                                        <small><small className='ps-3'>*Upload an image file (jpeg, png)</small></small>
                                </div>

                                <div>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        name="image_url_2" 
                                        id="image_url_2" 
                                        placeholder={ post.data.image_url_2 }
                                        onChange={ event => post.setData({
                                            ...post.data,
                                            image_url_2: event.target.files[0],
                                        }) } 
                                        className='form-control rounded-0' />
                                        <small><small className='ps-3'>*Upload an image file (jpeg, png)</small></small>
                                </div>

                                <div>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        name="image_url_3" 
                                        id="image_url_3" 
                                        placeholder={ post.data.image_url_3 }
                                        onChange={ event => post.setData({
                                            ...post.data,
                                            image_url_3: event.target.files[0],
                                        }) } 
                                        className='form-control rounded-0' />
                                        <small><small className='ps-3'>*Upload an image file (jpeg, png)</small></small>
                                </div>

                                <div>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        name="image_url_4" 
                                        id="image_url_4" 
                                        placeholder={ post.data.image_url_4 }
                                        onChange={ event => post.setData({
                                            ...post.data,
                                            image_url_4: event.target.files[0],
                                        }) } 
                                        className='form-control rounded-0' />
                                        <small><small className='ps-3'>*Upload an image file (jpeg, png)</small></small>
                                </div>
                            </section>
                        </div>

                        <div>
                            <div className='d-flex justify-content-end'>
                                <button 
                                    type='submit' 
                                    className='btn btn-sm btn-faansy-red text-light mx-3'>Update Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}
