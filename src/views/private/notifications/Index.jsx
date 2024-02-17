import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
// import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import { useNotifications } from '@/hooks/useNotifications';
import { useNotification } from '@/hooks/useNotification';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';


export default function Index() {
  const { user } = useContext(AuthContext);
  const { notifications, getNotifications } = useNotifications();
  const { notification, markAsReadNotification, destroyNotification } = useNotification();

  return (
    <Layout>
      <section className="col-sm-10 col-md-5 card rounded-0 mid-body">
        <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
            <h2 className="text-uppercase fs-5 fw-bold">Notifications</h2>
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
              {(notifications?.data?.length > 0) ? notifications?.data?.map(notification => {
                  return (
                      <article key={ notification?.id } className='card rounded-0 notification-item w-100'>
                        <div 
                            onClick={ async () => {
                                await markAsReadNotification(notification);
                                await getNotifications();
                            } }
                            type='button'>
                              <div 
                                // onClick={ async () => {
                                //   await markAsReadNotification(notification);
                                //   await getNotifications();
                                // } }
                                type="button" 
                                data-bs-toggle="modal" 
                                data-bs-target={`#notificationModal${ notification?.id }`}
                                data-bs-whatever="@mdo"
                                className="card-body d-flex flex-column">
                                  <div className='d-flex justify-content-between'>
                                    <h2 className='card-text fs-6 fw-semibold'>
                                      {
                                        notification.notification_type == 'tip' 
                                        ? 'Tip Notification' 
                                        : 'New Message'
                                      }
                                    </h2>
                                    <span 
                                        className="bg-secondary text-light opacity-75 px-1 py-0 rounded z-2 fs-6">
                                          <small>{ notification.read == true ? 'Read' : 'Unread' }</small>
                                    </span>
                                  </div>
                                  <div className='column-gap-2'>
                                      <p className='card-text fs-6'>
                                        {
                                          notification.notification_type == 'tip'
                                            ? `You received a tip of $${(notification.monies_if_any / 100).toFixed(2)}` 
                                            : 'New Message'
                                        } 
                                      </p>
                                  </div>
                              </div>
                        </div>

                          <div 
                            className="modal fade" 
                            id={`notificationModal${ notification?.id }`} 
                            tabIndex="-1" aria-labelledby="exampleModalLabel" 
                            aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content position-relative">
                                <div className="modal-header">
                                  <h3 className="modal-title fs-5" id="exampleModalLabel">
                                      {
                                          notification.notification_type == 'tip' 
                                              ? 'Tip Notification' 
                                              : 'New Message'
                                      }
                                  </h3>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <div className="messages overflow-y-auto d-flex flex-column row-gap-2" style={{ maxHeight: '50vh' }}>
                                    <div className='w-100 rounded' style={{ backgroundColor: '#82030324' }}>
                                      <div className="d-flex align-items-center p-2">
                                        {
                                            notification.notification_type == 'tip' 
                                                ? <span className='card-text fs-6 fw-semibold'><small className='fst-italic'>You received a tip of ${(notification.monies_if_any / 100).toFixed(2)} from&nbsp;
                                                  <a 
                                                    href={ route('home.users.show', {username: notification.transactor.username})}
                                                    className='text-dark'>
                                                        { `${notification.transactor.first_name} ${notification.transactor.last_name}`}
                                                  </a>.</small></span>
                                                : <span className='card-text fs-6 fw-semibold'><span>James says:&nbsp;</span><small className='fst-italic'>This is the last message from me james. Do well to pay me my money.</small></span>
                                        } 
                                      </div>
                                    </div>
                                    
                                  </div>

                                  <hr />

                                </div>
                              </div>
                            </div>
                          </div>
                      </article>
                  )}) : (notifications?.data?.length < 1) ? (
                      <section className='vh-100 d-flex justify-content-center align-items-center'>
                          <span className='h-50 text-center fw-semibold'>No notifications yet</span>
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
