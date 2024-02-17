import { useContext } from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useFeaturedPosts } from '@/hooks/useFeaturedPosts.jsx';
import Loading from '@/components/Loading.jsx';
import Logo from '@/assets/images/logo.png';
import MissingImage from '@/assets/images/name_non-transparent.png';
// import Video from '@/assets/videos/spicy_tofu(720p).mp4';


export default function FeaturedPosts() {
    const { posts, getPosts } = useFeaturedPosts();
    console.log(posts?.data);
    console.log(posts);
    const pageNumber = (posts?.meta?.current_page + 1 > posts?.meta?.last_page) ? posts?.meta?.last_page : posts?.meta?.current_page + 1;
    console.log(pageNumber);

    return (
        <section className="text-bg-light">
            { (posts?.data?.length > 0) && 
                <h2 className="container fw-normal px-5 pt-5 pb-0">Featured Posts</h2>
            }

            {(posts?.data?.length > 0) ? posts?.data?.map(post => {
                return (
                    <article key={ post.id } className="container px-5 my-5">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="d-flex justify-content-start align-items-center column-gap-2">
                                        <div className="rounded-circle">
                                            <img src={ Logo } alt="" width="65" />
                                        </div>
                                        <Link 
                                            to={ route('home.users.show', { username: 'faansy' })}
                                            className="d-flex flex-column text-body-secondary text-decoration-none">
                                            <h3 className="card-title fs-5 d-flex align-items-center column-gap-1">
                                                <span>Faansy</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                    className="bi bi-patch-check" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd"
                                                        d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                                    <path
                                                        d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                                                </svg>
                                            </h3>
                                            <span className="text-body-secondary">@faansy</span>
                                        </Link>
                                    </div>

                                    <div>
                                        <span className="text-body-secondary">{ dayjs.utc(post.created_at).fromNow() }</span>
                                    </div>
                                </div>
                                
                                <p className="card-text">{ post.body }</p>
                                {/* <span><a href="" className="text-decoration-none text-faansy-red">Read more</a></span> */}
                            </div>
                            <>
                                { (post.image_url == null && post.video_url != null) 
                                    ? 
                                        <video controls width="250" className="card-img-bottom" alt="video title">
                                            <source src="/media/cc0-videos/flower.webm" type="video/webm" />
                                        
                                            <source src={ post.video_url } type="video/mp4" />
                                        
                                            Or download the
                                            <a href={ post.video_url }>WEBM</a>
                                            or
                                            <a href={ post.video_url }>MP4</a>
                                            video.
                                        </video>
                                    : 
                                        <img src={ post.image_url ? `${ Constants.serverURL }/storage/${post.image_url}` : MissingImage } className="card-img-bottom rounded-0" alt="..." />
                                }
                            </>
                        </div>
                    </article>
                )}) : (
                    <>
                        <section className='vh-50 py-5'>
                            <Loading />
                        </section>
                    </>
            )}

            { ((posts?.data?.length > 0) && ((posts?.meta?.current_page < posts?.meta?.last_page))) 
                &&
                    <div className="d-flex justify-content-center pb-5 text-bg-light">
                        <button 
                            type="button"
                            onClick={ async () => {
                                await getPosts(pageNumber)
                            } }
                            className="btn btn-outline-secondary py-1 px-3 rounded-pill text-faansy-red text-uppercase fw-semibold show-more">
                                Show More
                        </button>
                    </div>
            }
        </section>
    )
}
