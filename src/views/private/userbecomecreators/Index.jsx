import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useUserbecomecreators } from '@/hooks/useUserbecomecreators.jsx';
import { useUserbecomecreator } from '@/hooks/useUserbecomecreator.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';


export default function Index() {
    const { userBecomecreators, getUserBecomecreators } = useUserbecomecreators();
    const { userbecomecreator, approveUserbecomecreator, rejectUserbecomecreator } = useUserbecomecreator();
    const [additionalFormVisible, setAdditionalFormVisible] = useState(false);

    async function rejection (event) {
        event.preventDefault();

        console.log(userbecomecreator.data.reason_for_rejection);

        userbecomecreator.data.id = event.target.id.value;

        const formData = new FormData();
        formData.append('id', userbecomecreator.data.id);
        userbecomecreator.data.reason_for_rejection && formData.append('reason_for_rejection', userbecomecreator.data.reason_for_rejection);

        await rejectUserbecomecreator(formData);

        userbecomecreator.data.reason_for_rejection = '';

        await getUserBecomecreators();
    }

    return (
        <Layout>
            <section className="col-sm-10 col-md-9 card rounded-0 main-content">
                <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                    <h2 className="text-uppercase fs-5 fw-bold">Become Creator Requests</h2>
                    <span className="mb-2">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg> */}
                    </span>
                </div>

                <div className=''>
                    <section className="border-top">
                    {(userBecomecreators?.data?.length > 0) ? userBecomecreators?.data?.map(userBecomecreator => {
                        
                        return (
                            <article key={ userBecomecreator?.id } className='card rounded-0 user-becomecreator-item w-100'>
                                <div
                                    type="button" 
                                    data-bs-toggle="modal" 
                                    data-bs-target={`#userBecomecreatorModal${ userBecomecreator?.id }`}
                                    data-bs-whatever="@mdo"
                                    className="card-body d-flex flex-column">
                                    <div className='d-flex justify-content-between'>
                                        <h2 className='card-text fs-6 fw-semibold'>
                                            User Become Creator Request — { userBecomecreator.requester.first_name } { userBecomecreator.requester.last_name }
                                        </h2>
                                    </div>
                                    <div className='column-gap-2'>
                                        <p className='card-text fs-6'>
                                            { userBecomecreator.requester.first_name } { userBecomecreator.requester.last_name } (@{ userBecomecreator.requester.username }) requested to become a creator
                                        </p>
                                    </div>
                                </div>

                                <div 
                                    className="modal fade" 
                                    id={`userBecomecreatorModal${ userBecomecreator?.id }`} 
                                    tabIndex="-1" aria-labelledby="exampleModalLabel" 
                                    aria-hidden="true">
                                    <div className="modal-dialog">
                                    <div className="modal-content position-relative">
                                        <div className="modal-header">
                                        <h3 className="modal-title fs-5" id="exampleModalLabel">
                                            User Become Creator Request
                                        </h3>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="messages overflow-y-auto d-flex flex-column row-gap-2" style={{ maxHeight: '50vh' }}>
                                                <div className='w-100 rounded'>
                                                    <div className='d-flex justify-content-end pe-3'>
                                                        <small><small>{ dayjs.utc(userBecomecreator?.created_at).fromNow() }</small></small>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center p-2">
                                                        <figure>
                                                            <img src={ userBecomecreator.verification_material_image_url ? `${ Constants.serverURL }/storage/${userBecomecreator.verification_material_image_url}` : MissingImage } className="card-img-bottom rounded-0" alt={ userBecomecreator.requester.username } />
                                                            <figcaption>
                                                                <small>
                                                                    <small>Verification ID provided by { userBecomecreator.requester.first_name } { userBecomecreator.requester.last_name }&nbsp;
                                                                        <Link target='_blank' to={ route('home.users.show', {username:  userBecomecreator.requester.username })} className='text-decoration-none text-faansy-red'>
                                                                            (@{ userBecomecreator.requester.username })
                                                                        </Link>
                                                                        {/* (@{ userBecomecreator.requester.username }) */}
                                                                    </small>
                                                                </small>
                                                            </figcaption>
                                                        </figure>
                                                    </div>
                                                    <div className='d-flex justify-content-between px-3'>
                                                        {/* <button 
                                                            onClick={ async () => {
                                                                await rejectUserbecomecreator(userBecomecreator);
                                                                await getUserBecomecreators();
                                                            } } 
                                                            type='button'
                                                            className='btn btn-sm btn-secondary'>Reject</button> */}
                                                        <div>
                                                            <button 
                                                                onClick={() => setAdditionalFormVisible(!additionalFormVisible)}
                                                                type='button'
                                                                className='btn btn-sm btn-secondary'>
                                                                    Reject
                                                            </button>
                                                            {additionalFormVisible && (
                                                                <div className='mt-3'>
                                                                    <form 
                                                                        onSubmit={ rejection } 
                                                                        encType='multipart/form-data'
                                                                        className='d-flex flex-column'>
                                                                            <div className="mb-3">
                                                                            <input 
                                                                                name="id"
                                                                                id="id" 
                                                                                value={ userBecomecreator?.id }
                                                                                row={2} 
                                                                                className="form-control fs-6" 
                                                                                style={{ height: '7.5vh' }} 
                                                                                onChange={ event => userbecomecreator.setData({
                                                                                    ...userbecomecreator.data,
                                                                                    id: event.target.value,
                                                                                }) }
                                                                                hidden />
                                                                            </div>
                                                                            <div className="mb-3 pb-3 border-bottom">
                                                                                <div className='d-flex justify-content-between align-items-center gap-2'>
                                                                                    <div className='justify-self-end'>
                                                                                        <textarea 
                                                                                            type="text" 
                                                                                            name="reason_for_rejection" 
                                                                                            id="reason_for_rejection" 
                                                                                            value={ userbecomecreator.data.reason_for_rejection ?? '' }
                                                                                            className='form-control' 
                                                                                            onChange={ event => userbecomecreator.setData({
                                                                                                ...userbecomecreator.data,
                                                                                                reason_for_rejection: event.target.value,
                                                                                            }) } 
                                                                                            placeholder='Reason for rejection (if any)'></textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        <button type="submit" className="btn btn-sm btn-faansy-red text-light align-self-end">Submit & Mail User</button>
                                                                    </form>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <button 
                                                                onClick={ async () => {
                                                                    await approveUserbecomecreator(userBecomecreator);
                                                                    await getUserBecomecreators();
                                                                } } 
                                                                type='button'
                                                                className='btn btn-sm btn-faansy-red text-light'>
                                                                    Approve
                                                            </button>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <hr />

                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </article>
                        )}) : (userBecomecreators?.data?.length < 1) ? (
                            <section className='vh-100 d-flex justify-content-center align-items-center px-5'>
                                <span className='h-50 text-center fw-semibold px-5'>No user requests to become creator yet.</span>
                            </section>
                        ) : (
                            <section className='vh-100 pt-5 mt-2 px-5'>
                                <div className='h-50 px-5'>
                                    <Loading />
                                </div>
                            </section>
                        )}

                    </section>
                </div>
            </section>
        </Layout>
    )
}
