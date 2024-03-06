import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { usePost } from '@/hooks/usePost.jsx';
import Layout from '@/components/private/Layout.jsx';


export default function Repost() {
    const params = useParams();
    const { post, getPost, repostPost } = usePost(params.id);

    console.log(post?.data);

    /* Post repost*/
    const [repostBody, setRepostBody] = useState();

    async function repostPostSubmit(event) {
        event.preventDefault();

        const repost_body = event.target.repost_body.value;
        console.log(repost_body)

        await repostPost(repost_body);
        setRepostBody('');
        getPost();
    }

    return (
        <Layout>
            <section className="col-sm-10 col-md-5 card rounded-0 mid-body">
                <section className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                    <h2 className="text-uppercase fs-5 fw-bold">Repost Post</h2>
                    <span className="mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                    </span>
                </section>
                
                <section className="mb-3 d-flex flex-column row-gap-2" id='repost-post'>
                    <form onSubmit={ repostPostSubmit }>
                        <div className="mb-1">
                            <textarea 
                                name="repost_body" 
                                id="repost_body" 
                                value={repostBody}
                                onChange={e => setRepostBody(e.target.value)}
                                placeholder="Add some repost text (optional)" 
                                aria-label="Repost body"
                                className="form-control rounded-0"></textarea>
                        </div>
                        <div className="d-flex justify-content-end px-3">
                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Repost</button>
                        </div>
                    </form>
                </section>

                <section className='post-section'>
                    <h3 className='fw-semibold fs-5 border-top pt-2 px-3'>Original Post</h3>
                    <article key={ post?.data?.id } className="card border-0 border-top border-bottom pb-3">
                        <div className='card-body rounded-0'>
                            <div className="d-flex justify-content-between mb-3">
                                    <Link 
                                        to={ route('home.users.show', {'username': post?.data?.user?.username})}
                                        className="d-flex justify-content-start align-items-center column-gap-2 text-decoration-none">
                                        <div className="d-flex flex-column">
                                            <h3 className="card-title fs-6 text-dark">
                                                <span>{ `${ post?.data?.user?.first_name } ${ post?.data?.user?.last_name }` }</span>
                                                { post?.data?.user?.verified == true
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
                                            <span className="text-body-secondary">@{ post?.data?.user?.username }</span>
                                        </div>
                                    </Link>
                                {/* </div> */}
                            </div>
                
                            <p className="card-text">{ post?.data?.body }</p>
                        </div>

                                <>
                                    {/* <video controls width="250" className="card-img-bottom rounded-0" alt="video title">
                                        <source src="/media/cc0-videos/flower.webm" type="video/webm" />
                                        <source src="../videos/spicy_tofu(720p).mp4" type="video/mp4" />
                                        Download the
                                        <a href="/media/cc0-videos/flower.webm">WEBM</a>
                                        or
                                        <a href="../videos/spicy_tofu(720p).mp4">MP4</a>
                                        video.
                                    </video> */}
                                    <div id="carouselExampleIndicators" className="carousel slide">
                                        {/* <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div> */}
                                        <div className="carousel-inner">
                                            { post?.data?.images?.length > 0 && post?.data?.images?.map((image, index) => {
                                                if (index == 0) {
                                                    return (
                                                        <div className={`carousel-item active`}>
                                                            <img key={ image.id } src={ `${ Constants.serverURL }/storage/${ image?.image_url }` } className="card-img-bottom object-fit-cover rounded-0" height={400} />
                                                        </div>
                                                    )
                                                }

                                                return (
                                                    <div className={`carousel-item`}>
                                                        <img key={ image.id } src={ `${ Constants.serverURL }/storage/${ image?.image_url }` } className="card-img-bottom object-fit-cover rounded-0" height={400} />
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>

                                        { post?.data?.images?.length > 1 && 
                                            <>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </>
                                        }
                                    </div>
                                </>

                        <section className="px-3 d-flex gap-3 pt-3">
                            <span><span className="fw-semibold">{ post?.data?.likes?.length }</span>{ (post?.data?.likes?.length > 1) ? ' likes' : ' like' }</span>
                            <span><span className="fw-semibold">{ post?.data?.comments?.length }</span>{ (post?.data?.comments?.length > 1) ? ' comments' : ' comment' }</span>
                        </section>
                    </article>
                </section>
            </section>
        </Layout>
    )
}
