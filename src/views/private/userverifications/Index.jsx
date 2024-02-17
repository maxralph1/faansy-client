import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import { useUserverifications } from '@/hooks/useUserverifications';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';


export default function Index() {
    const { userVerifications, getUserVerifications } = useUserverifications();

    return (
        <Layout>
            <section className="col-sm-10 col-md-5 card rounded-0 mid-body">
                <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                    <h2 className="text-uppercase fs-5 fw-bold">User Verifications</h2>
                    <span className="mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                    </span>
                </div>

                <div className=''>
                    <section className="border-top">
                    {(userVerifications?.data?.length > 0) ? userVerifications?.data?.map(userVerification => {
                        
                        return (
                            <article key={ userVerification?.id } className='card rounded-0 user-verification-item w-100'>
                                <div
                                    type="button" 
                                    data-bs-toggle="modal" 
                                    data-bs-target={`#userVerificationModal${ userVerification?.id }`}
                                    data-bs-whatever="@mdo"
                                    className="card-body d-flex flex-column">
                                    <div className='d-flex justify-content-between'>
                                        <h2 className='card-text fs-6 fw-semibold'>
                                            User Verification — { userVerification.user.first_name } { userVerification.user.last_name }
                                        </h2>
                                    </div>
                                    <div className='column-gap-2'>
                                        <p className='card-text fs-6'>
                                            { userVerification.user.first_name } { userVerification.user.last_name } ({ userVerification.user.username }) requested to be verified
                                        </p>
                                    </div>
                                </div>

                                <div 
                                    className="modal fade" 
                                    id={`userVerificationModal${ userVerification?.id }`} 
                                    tabIndex="-1" aria-labelledby="exampleModalLabel" 
                                    aria-hidden="true">
                                    <div className="modal-dialog">
                                    <div className="modal-content position-relative">
                                        <div className="modal-header">
                                        <h3 className="modal-title fs-5" id="exampleModalLabel">
                                            User Verification
                                        </h3>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                        <div className="messages overflow-y-auto d-flex flex-column row-gap-2" style={{ maxHeight: '50vh' }}>
                                            <div className='w-100 rounded' style={{ backgroundColor: '#82030324' }}>
                                            <div className="d-flex align-items-center justify-content-center p-2">
                                                
                                            </div>
                                            </div>
                                            
                                        </div>

                                        <hr />

                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </article>
                        )}) : (userVerifications?.data?.length < 1) ? (
                            <section className='vh-100 d-flex justify-content-center align-items-center'>
                                <span className='h-50 text-center fw-semibold'>No user verifications yet.</span>
                            </section>
                        ) : (
                            <section className='vh-50 pt-5 mt-2'>
                                <Loading />
                            </section>
                        )}

                    </section>
                </div>

            </section>
        </Layout>
    )
}
