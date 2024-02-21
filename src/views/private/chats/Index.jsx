import { useContext, useEffect, useRef } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
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
    const { createMessage, destroyMessage } = useMessage();

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
      // send state to server with e.g. `window.fetch`
      const body = event.target.body.value;
      const chat_id = event.target.chat_id.value;
      const user_id = user.id;

      console.log(body, chat_id, user_id);
      await createMessage(body, chat_id, user_id);
      await getChats();
    }

    return (
        <Layout>
            <section className="col-sm-10 col-md-5 card rounded-0">
                <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
                    <h2 className="text-uppercase fs-5 fw-bold">Chats</h2>
                    <span className="mb-2">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                            viewBox="0 0 16 16">
                            <path
                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg> */}
                    </span>
                </div>

                <div>
                    <section className="border-top">
                      {(chats?.data?.length > 0) ? chats?.data?.map(chat => {
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
                                      {/* <span>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                                              <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                                          </svg>
                                      </span> */}
                                      {/* <p className='card-text fs-6'>This is the last message from me james. Do well to pay me my money.</p> */}
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
                                        {(chat?.messages?.length > 0) ? chat?.messages.map(message => {
                                          return (
                                            <div key={ message?.id } className='d-flex flex-column'>
                                              {(message?.user?.id != user?.id) 
                                                ? <article className='w-75 rounded' style={{ backgroundColor: '#82030324' }}>
                                                    <div className="d-flex align-items-center p-2">
                                                      <span className='card-text fs-6 fw-semibold'>{ message.body }</span>
                                                    </div>
                                                  </article>
                                                : <article className='w-75 rounded align-self-end' style={{ backgroundColor: '#82030324' }}>
                                                    <div className="d-flex align-items-center p-2">
                                                      <span className='card-text fs-6 fw-semibold'>{ message.body }</span>
                                                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
                                                          <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                                                      </svg> */}
                                                    </div>
                                                  </article>}
                                            </div>
                                          )
                                        }) : (<span className='text-center'>No messages yet</span>)}

                                      </div>

                                      <hr />

                                      <form 
                                        onSubmit={ addMessage }
                                        className='d-flex flex-column'>
                                        <div className="mb-3">
                                          <input 
                                            name="body"
                                            id="body"
                                            row={2} 
                                            className="form-control fs-6" 
                                            style={{ height: '7.5vh' }} />
                                          <input 
                                            name="chat_id"
                                            id="chat_id" 
                                            defaultValue={chat.id}
                                            row={2} 
                                            className="form-control fs-6" 
                                            style={{ height: '7.5vh' }} 
                                            hidden />
                                        </div>
                                        <button type="submit" className="btn btn-sm btn-faansy-red text-light align-self-end">Send message</button>
                                      </form>
                                    </div>
                                    {/* <div className="modal-footer">
                                    </div> */}
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

                        {/* <div className='card rounded-0 chat-item'>
                            <div className="card-body d-flex flex-column">
                                <h2 className='card-text fs-6 fw-semibold'>James John</h2>
                                <div className='d-flex flex-row column-gap-2'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                                      </svg>
                                    </span>
                                    <p className='card-text fs-6'>This is the last message from me james. Do well to pay me my money.</p>
                                </div>
                                
                            </div>
                        </div>

                        <div className='card rounded-0 chat-item'>
                            <div className="card-body d-flex flex-column">
                                <h2 className='card-text fs-6 fw-semibold'>James John</h2>
                                <div className='d-flex flex-row column-gap-2'>
                                    <p className='card-text fs-6'>This is the last message from me james. Do well to pay me my money.</p>
                                </div>
                                
                            </div>
                        </div> */}
                    </section>
                </div>

            </section>
        </Layout>
    )
}
