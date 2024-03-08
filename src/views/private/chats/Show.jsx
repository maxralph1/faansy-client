import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
import { useParams } from 'react-router-dom';
import Constants from '@/utils/Constants.jsx';
import { useMessage } from '@/hooks/useMessage.jsx';
import Layout from '@/components/private/Layout.jsx';

export default function Show() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const { message, getMessage, destroyMessage } = useMessage(params?.id);

  console.log(message?.data);

  return (
    <Layout>
      <section className="col-sm-10 col-md-5 card rounded-0 main-content">
        <section className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
            <h2 className="text-uppercase fs-5 fw-bold">Message View</h2>
            <span className="mb-2">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg> */}
            </span>
        </section>

        <article className='w-100 rounded my-5 d-flex justify-content-center'>
          <div className="d-flex flex-column justify-content-center gap-2 p-2">
            { message?.data?.data?.body != "undefined" && 
              <div>
                <span className='card-text fs-6 fw-semibold'>{ message?.data?.data?.body }</span>
              </div>
            }
            <div className='d-flex flex-column'>
                <>
                  { message?.data?.data?.image_url && 
                  <span className='pt-2'>
                    <img src={ `${ Constants.serverURL }/storage/${ message?.data?.data?.image_url }` } className="card-img-bottom object-fit-cover rounded" height={150} /> 
                  </span> }
                  { message?.video_url && 
                    <span className='pt-3'>
                      <video controls height={150} className="card-img-bottom object-fit-cover rounded mb-1" alt={ message?.id }>
                        <source src={ `${ Constants.serverURL }/storage/${ message?.data?.data?.video_url }` } type="video/webm" />
                        <source src={ `${ Constants.serverURL }/storage/${ message?.data?.data?.video_url }` } type="video/mp4" />
                        Download the
                        <a href={ `${ Constants.serverURL }/storage/${ message?.data?.data?.video_url }` }>video</a>.
                      </video> 
                    </span> }
                </>
            </div>
          </div>
        </article>
      </section>
    </Layout>
  )
}
