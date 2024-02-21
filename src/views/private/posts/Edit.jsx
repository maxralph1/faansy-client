import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { usePosts } from '@/hooks/usePosts.jsx';
import { usePost } from '@/hooks/usePost.jsx';
import { useCreator } from '@/hooks/useCreator';
import { useSubscription } from '@/hooks/useSubscription';
import Layout from '@/components/private/Layout.jsx';
import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';

export default function Edit() {
  const params = useParams();
  const { posts, getPosts } = usePosts();
  const { post, getPost, updatePost } = usePost(params.id);

  console.log(post)

  async function submitPostUpdate(event) {
    event.preventDefault();

    const formData = new FormData();
    // formData.append('_method', 'put');
    formData.append('body', post.data.body);
    if (post.data.image_url) formData.append('image_url', post.data.image_url);
    post.data.video_url && formData.append('video_url', post.data.video_url);

    // console.log(post.data.body)
    // console.log(event.target.body.value)

    await updatePost(formData);
    await getPosts();
  }

  return (
    <Layout>
      <section className="col-sm-10 col-md-5 card rounded-0 mid-body">
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
        
        <div className="mb-1 d-flex flex-column row-gap-2" id='update-post'>
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
                            {/* <textarea 
                                type="text" 
                                name="body" 
                                id="body" 
                                className='form-control' 
                                rows="3"
                                value={ body } 
                                onChange={e => setBody(e.target.value)}
                                placeholder="Body" 
                                required >
                            </textarea> */}
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
                                className='form-control' />
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
                                className='form-control' />
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
