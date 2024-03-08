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
import { useChats } from '@/hooks/useChats.jsx';
import { useChat } from '@/hooks/useChat.jsx';
import { useMessage } from '@/hooks/useMessage.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';
import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';

export default function Index() {
    const { user } = useContext(AuthContext);
    const { chats, getChats } = useChats();
    const { chat, createChat, destroyChat } = useChat();
    const { message, createMessage, destroyMessage } = useMessage();
    const [additionalFormVisible, setAdditionalFormVisible] = useState(false);
    const [payPerViewToggle, setPayPerViewToggle] = useState(false);

    console.log(chats);

    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });

    // setInterval(() => {
    //     getChats();
    // }, 10000);

    async function addMessage (event) {
        event.preventDefault();

        console.log(event.target.chat_id.value);
        console.log(message.data.body);
        console.log(message.data.image_url);
        console.log(message.data.video_url);
        console.log(message.data.pay_per_view);
        console.log(message.data.payperviewamount);

        const formData = new FormData();
        formData.append('chat_id', event.target.chat_id.value);
        formData.append('body', message.data.body);
        message.data.image_url && formData.append('image_url', message.data.image_url);
        message.data.video_url && formData.append('video_url', message.data.video_url);
        payPerViewToggle == true ? formData.append('pay_per_view', 1) : formData.append('pay_per_view', 0);
        message.data.payperviewamount && formData.append('payperviewamount', message.data.payperviewamount);

        await createMessage(formData);

        event.target.chat_id.value = '';
        message.data.body = '';
        message.data.image_url = '';
        message.data.video_url = '';
        message.data.pay_per_view = '';
        message.data.payperviewamount = '';

        await getChats();
    }

    return (
        <Layout>
            <section className="col-sm-10 col-md-5 card rounded-0 main-content">
                <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                    <h2 className="text-uppercase fs-5 fw-bold">Chats</h2>
                    <span className="mb-2">
                    </span>
                </div>

                <div>
                    <section className="border-top">
                      {(chats?.data?.length > 0) ? chats?.data?.sort((a, b) => new Date(b?.updated_at) - new Date(a?.updated_at)).map(chat => {
                        console.log(chat)
                        return (
                          <article key={ chat?.id } className='card rounded-0 chat-item'>
                              <div 
                                type="button" 
                                data-bs-toggle="modal" 
                                data-bs-target={ `#messageModal${chat.id}` } 
                                data-bs-whatever="@mdo"
                                className="card-body d-flex flex-column">
                                  <h2 className='card-text fs-6 fw-semibold'>
                                    { chat.participator_1.id == user.id && chat.participator_2.id != user.id
                                        ? `${chat.participator_2.first_name} ${chat.participator_2.last_name}` 
                                        : `${chat.participator_1.first_name} ${chat.participator_1.last_name}`}
                                  </h2>
                                  <div className='d-flex flex-row column-gap-2'>
                                      <div>{(chat?.messages?.length > 0) && chat?.messages?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at)).slice(0,1).map(message => {
                                          return (
                                              <span key={ message?.id } className='d-flex align-items-center column-gap-1'>
                                                { message.user.id == user.id ? 
                                                  <span className=''>
                                                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                                                          <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                                                      </svg> */}
                                                      <small className='fst-italic' style={{ paddingTop: '-30px' }}>(me): </small>
                                                  </span> : 
                                                    <span className=''>
                                                      <small className='fst-italic' style={{ paddingTop: '-30px' }}>({ message.user.first_name + ' ' + message.user.last_name }): </small>
                                                  </span> }
                                                <p className='card-text fs-6'>{ message.body != 'undefined' ? message.body : '(Attachment)' }</p>
                                              </span>
                                          )})}
                                      </div>

                                  </div>
                              </div>

                              <div className="modal fade" id={ `messageModal${chat.id}` } tabIndex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                  <div className="modal-content position-relative">
                                    <div className="modal-header">
                                      <h3 className="modal-title fs-5" id="messageModalLabel">
                                        { chat.participator_1.id == user.id && chat.participator_2.id != user.id
                                          ? `${chat.participator_2.first_name} ${chat.participator_2.last_name}` 
                                          : `${chat.participator_1.first_name} ${chat.participator_1.last_name}`}
                                      </h3>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="messages overflow-y-auto d-flex flex-column row-gap-2" style={{ maxHeight: '50vh' }} >
                                        {(chat?.messages?.length > 0) ? chat?.messages?.sort((a, b) => new Date(a?.created_at) - new Date(b?.created_at)).map(message => {
                                          return (
                                            <div key={ message?.id } className='d-flex flex-column'>
                                              {(message?.user?.id != user?.id) 
                                                ? <article className='w-75 rounded' style={{ backgroundColor: '#82030324' }}>
                                                    <div className="d-flex flex-column justify-content-center gap-2 p-2">
                                                      { message?.body != "undefined" && 
                                                        <div>
                                                          <span className='card-text fs-6 fw-semibold'>{ message.body }</span>
                                                        </div> }
                                                      <div className='d-flex flex-column'>
                                                        { (message?.payperviewamount <= 0) ?
                                                          <>
                                                            { message?.image_url && 
                                                            <span className='pt-2'>
                                                              <img src={ `${ Constants.serverURL }/storage/${ message?.image_url }` } className="card-img-bottom object-fit-cover rounded" height={150} /> 
                                                            </span> }
                                                            { message?.video_url && 
                                                              <span className='pt-3'>
                                                                <video controls height={150} className="card-img-bottom object-fit-cover rounded mb-1" alt={ message?.id }>
                                                                  <source src={ `${ Constants.serverURL }/storage/${ message?.video_url }` } type="video/webm" />
                                                                  <source src={ `${ Constants.serverURL }/storage/${ message?.video_url }` } type="video/mp4" />
                                                                  Download the
                                                                  <a href={ `${ Constants.serverURL }/storage/${ message?.video_url }` }>video</a>.
                                                                </video> 
                                                              </span> }
                                                          </>
                                                          : <>
                                                              <span className="pt-1 pb-2">
                                                                  <Link 
                                                                      target='_blank' 
                                                                      to={ route('home.chats.show', { 'id': message?.id})}
                                                                      className='btn btn-faansy-red text-light'>
                                                                          View Content (for { (message?.payperviewamount).toFixed(2) }$)
                                                                  </Link>
                                                              </span>
                                                            </> }
                                                      </div>
                                                    </div>
                                                  </article>
                                                : <article className='w-75 rounded align-self-end' style={{ backgroundColor: '#82030324' }}>
                                                    <div className="d-flex flex-column justify-content-center gap-2 p-2">
                                                      { message?.body != "undefined" && 
                                                        <div>
                                                          <span className='card-text fs-6 fw-semibold'>{ message?.body }</span>
                                                          {/* { message.user.id == user.id && 
                                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                                                              <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                                                          </svg> } */}
                                                        </div> }
                                                      <div className='d-flex flex-column'>
                                                        { message?.image_url && 
                                                        <span className='pt-2'>
                                                          <img src={ `${ Constants.serverURL }/storage/${ message?.image_url }` } className="card-img-bottom object-fit-cover rounded" height={150} /> 
                                                        </span> }
                                                        { message?.video_url && 
                                                          <span className='pt-3'>
                                                            <video controls height={150} className="card-img-bottom object-fit-cover rounded mb-1" alt={ message?.id }>
                                                              <source src={ `${ Constants.serverURL }/storage/${ message?.video_url }` } type="video/webm" />
                                                              <source src={ `${ Constants.serverURL }/storage/${ message?.video_url }` } type="video/mp4" />
                                                              Download the
                                                              <a href={ `${ Constants.serverURL }/storage/${ message?.video_url }` }>video</a>.
                                                            </video> 
                                                          </span> }
                                                      </div>
                                                    </div>
                                                  </article>}
                                            </div>
                                          )
                                        }) : (<span className='text-center'>No messages yet</span>)}

                                      </div>

                                      <hr />

                                      <div className='d-flex align-items-start column-gap-3'>
                                        <button 
                                          onClick={() => setAdditionalFormVisible(!additionalFormVisible)}
                                          className='bg-transparent border-0'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#4c2828" className="bi bi-paperclip pt-2" viewBox="0 0 16 16">
                                              <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
                                            </svg>
                                        </button>

                                        <div className='flex-grow-1'>
                                          <form 
                                            onSubmit={ addMessage } 
                                            encType='multipart/form-data'
                                            className='d-flex flex-column'>

                                            <div className="mb-3">
                                              <input 
                                                type="text" 
                                                name="body" 
                                                id="body" 
                                                value={ message.data.body ?? '' }
                                                row={2} 
                                                className="form-control fs-6" 
                                                style={{ height: '7.5vh' }} 
                                                onChange={ event => message.setData({
                                                    ...message.data,
                                                    body: event.target.value,
                                                }) }  />
                                              <input 
                                                name="chat_id"
                                                id="chat_id" 
                                                value={chat.id}
                                                row={2} 
                                                className="form-control fs-6" 
                                                style={{ height: '7.5vh' }} 
                                                onChange={ event => message.setData({
                                                    ...message.data,
                                                    chat_id: event.target.value,
                                                }) }
                                                hidden />
                                            </div>

                                            {additionalFormVisible && (
                                              <div className="mb-3 pb-3 border-bottom">
                                                <div className='mb-2'>
                                                  <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    name="image_url" 
                                                    id="image_url" 
                                                    className='form-control' 
                                                    onChange={ event => message.setData({
                                                        ...message.data,
                                                        image_url: event.target.files[0],
                                                    }) } />
                                                    <small><small>*Add an image to your message</small></small>
                                                </div>
                                                
                                                <div className='mb-2'>
                                                  <input 
                                                    type="file" 
                                                    accept="video/*"
                                                    name="video_url" 
                                                    id="video_url" 
                                                    className='form-control' 
                                                    onChange={ event => message.setData({
                                                        ...message.data,
                                                        video_url: event.target.files[0],
                                                    }) } />
                                                  <small><small>*Add a video to your message</small></small>
                                                </div>
                                                
                                                <div className='d-flex justify-content-between align-items-center gap-2'>
                                                  <div>
                                                    <input 
                                                        type="checkbox" 
                                                        name="pay_per_view" 
                                                        id="pay_per_view" 
                                                        value={ message.data.pay_per_view ?? '' }
                                                        className="form-check-input" 
                                                        onChange={ event => message.setData({
                                                            ...message.data,
                                                            pay_per_view: payPerViewToggle,
                                                        }) } 
                                                        role="switch" 
                                                        hidden />
                                                    { payPerViewToggle == false ?
                                                      (<span 
                                                        type="button" 
                                                        onClick={() => setPayPerViewToggle(true)}>
                                                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-off" viewBox="0 0 16 16">
                                                            <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
                                                          </svg>
                                                      </span>) :
                                                      (<span 
                                                        type="button" 
                                                        onClick={() => setPayPerViewToggle(false)}>
                                                          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#820303" className="bi bi-toggle-on" viewBox="0 0 16 16">
                                                            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
                                                          </svg>
                                                      </span>)
                                                    }
                                                    <small className="form-check-label ms-1" htmlFor="pay_per_view">Pay-Per-View</small>
                                                  </div>

                                                  <div className='justify-self-end'>
                                                    <input 
                                                        type="text" 
                                                        name="payperviewamount" 
                                                        id="payperviewamount" 
                                                        value={ message.data.payperviewamount ?? '' }
                                                        className='form-control' 
                                                        onChange={ event => message.setData({
                                                            ...message.data,
                                                            payperviewamount: event.target.value,
                                                        }) } 
                                                        placeholder='PPV Amount (USD)' />
                                                  </div>
                                                </div>

                                              </div>
                                            )}

                                            <button type="submit" className="btn btn-sm btn-faansy-red text-light align-self-end">Send message</button>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                          </article>
                        )})  : (chats?.data?.length < 1) ? (
                            <section className='vh-100 d-flex justify-content-center align-items-center'>
                                <span className='h-50 text-center fw-semibold px-5'>You currently do not have on-going chats.</span>
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
