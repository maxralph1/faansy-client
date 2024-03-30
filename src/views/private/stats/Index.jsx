import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useFanactivities } from '@/hooks/useFanactivities.jsx';
import { useFanactivity } from '@/hooks/useFanactivity.jsx';
import { useFanlists } from '@/hooks/useFanlists.jsx';
import { useCreator } from '@/hooks/useCreator';
import { useTransactions } from '@/hooks/useTransactions.jsx';
import Layout from '@/components/private/Layout.jsx';
import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';

export default function Index() {
  // /* Chats initialization */
  // const xArray = ["Italy", "France", "Spain", "USA", "Argentina"];
  // const yArray = [55, 49, 44, 24, 15];

  // const data = [{
  //   x:xArray,
  //   y:yArray,
  //   type:"bar",
  //   orientation:"v",
  //   marker: {color:"#230303"}
  // }];

  // const layout = {title:"World Wide Wine Production"};

  // Plotly.newPlot("myPlot", data, layout);

  // Plotly.newPlot("myPlot2", data, layout);


  /* Other initializations */
  const { user } = useContext(AuthContext);
  const { fanactivities, getFanactivities } = useFanactivities();
  const { destroyFanactivity } = useFanactivity();
  const { fanlists } = useFanlists();
  const { transactions } = useTransactions();

  console.log(transactions);
  console.log(fanactivities);
  console.log(fanlists);

  const payPerViewEarningTransactions = transactions?.data?.filter((transaction) => (transaction?.transaction_type == 'pay_per_view_in_chat' || transaction?.transaction_type == 'pay_per_view_on_post') && transaction?.transactor.id != user.id);
  const payPerViewExpenditureTransactions = transactions?.data?.filter((transaction) => (transaction?.transaction_type == 'pay_per_view_in_chat' || transaction?.transaction_type == 'pay_per_view_on_post') && transaction?.transactor.id == user.id);

  const subscriptionEarningTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'subscription' && transaction?.transactor.id != user.id);
  const subscriptionExpenditureTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'subscription' && transaction?.transactor.id == user.id);

  const streamTipEarningTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'stream_tip' && transaction?.transactor.id != user.id);
  const streamTipExpenditureTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'stream_tip' && transaction?.transactor.id == user.id);

  const tipEarningTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'tip' && transaction?.transactor.id != user.id);
  const tipExpenditureTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'tip' && transaction?.transactor.id == user.id);

  /* Pay-Per-View */
  const payPerViewEarningSum = payPerViewEarningTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
  console.log(payPerViewEarningTransactions);
  console.log(payPerViewEarningSum);

  const payPerViewExpenditureSum = payPerViewExpenditureTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
  console.log(payPerViewExpenditureTransactions);
  console.log(payPerViewExpenditureSum);
  /* End Pay-Per-View */

  /* Subscription */
  const subscriptionEarningSum = subscriptionEarningTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
  console.log(subscriptionEarningTransactions);
  console.log(subscriptionEarningSum);

  const subscriptionExpenditureSum = subscriptionExpenditureTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
  console.log(subscriptionExpenditureTransactions);
  console.log(subscriptionExpenditureSum);
  /* End Subscription */

  /* Stream Tip */
  const streamTipEarningSum = streamTipEarningTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
  console.log(streamTipEarningTransactions);
  console.log(streamTipEarningSum);

  const streamTipExpenditureSum = streamTipExpenditureTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
  console.log(streamTipExpenditureTransactions);
  console.log(streamTipExpenditureSum);
  /* End Stream Tip */

  /* Tip */
  const tipEarningSum = tipEarningTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
  console.log(tipEarningTransactions);
  console.log(tipEarningSum);

  const tipExpenditureSum = tipExpenditureTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );
  console.log(tipExpenditureTransactions);
  console.log(tipExpenditureSum);
  /* End Tip */


  // /* Chart */
  // const xArray = ["Italy", "France", "Spain", "USA", "Argentina"];
  // const yArray = [55, 49, 44, 24, 15];

  // const data = [{
  //   x:xArray,
  //   y:yArray,
  //   type:"bar"
  // }];

  // const layout = {title:"World Wide Wine Production"};

  // Plotly.newPlot("myPlot", data, layout);


  return (
    <Layout>
      <section className="col-sm-10 col-md-9 card rounded-0 main-content pb-5">
        <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
            <h2 className="text-uppercase fs-5 fw-bold">Stats</h2>
            <span className="mb-2">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg> */}
            </span>
        </div>

        <section>
          {/* <div id="myPlot" style="width:100%;max-width:700px"></div> */}
        </section>

        <section className='fans-section row px-3 pb-4'>
            <section className="border-top mt-3 col-12">
                <h3 className='fs-5 fw-semibold text-underline py-3'>Fans</h3>
                <div className="row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Top Fans</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (fanactivities?.data?.length) } { ((fanactivities?.data?.length) > 1) ? 'fans' : 'fan' }</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#topFansModal"  className='btn btn-sm btn-faansy-red text-light'>View List</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Fans</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (fanlists?.data?.length) } { ((fanlists?.data?.length) > 1) ? 'fans' : 'fan' }</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#fanListsModal"  className='btn btn-sm btn-faansy-red text-light'>View List</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </section>

            <section className='fans-modals'>
                {/* Top Fans Modal */}
                <div className="modal fade" id="topFansModal" tabIndex="-1" aria-labelledby="topFansModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3 className="modal-title fs-5" id="topFansModalLabel">Top Fans</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        {(fanactivities?.data?.length > 0) ? (fanactivities?.data?.map(fanactivity => {
                          return (
                            <article key={ fanactivity?.id } className='bg-faansy-red mb-2 border-bottom d-flex justify-content-between align-items-center'>
                              <div className='d-flex gap-2 flex-wrap'>
                                  <div className="w-100 d-flex justify-content-between align-items-center py-1 px-1">
                                      <span>
                                        <img src={ fanactivity?.fan?.user_image_url ? `${ Constants.serverURL }/storage/${ fanactivity?.fan?.user_image_url }` : MissingUserImage } alt="" width="40" height="40" className='object-fit-cover border border-light border-1 rounded-circle d-block' />
                                      </span>
                                      <span className="fw-semibold text-capitalize ms-2 d-flex align-items-center gap-1">
                                        <Link 
                                          target='_blank' 
                                          to={ route('home.users.show', {'username': fanactivity?.fan?.username}) } 
                                          className='text-dark text-decoration-none'>
                                          { fanactivity?.fan?.first_name + ' ' + fanactivity?.fan?.last_name } <span className='text-lowercase'>(@{ fanactivity?.fan?.username })</span>
                                        </Link>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                          <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                        </svg>
                                      </span>
                                  </div>
                              </div>
                              <div>
                                  <button 
                                      onClick={ async () => {
                                          await destroyFanactivity(fanactivity);
                                          await getFanactivities();
                                      } }
                                      type='button' 
                                      className='border-0 bg-transparent'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#4b4242" className="bi bi-trash2-fill text-secondary" viewBox="0 0 16 16">
                                          <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                                        </svg>
                                  </button>
                              </div>
                            </article>
                          )
                        })) : (
                          <div className='py-2 d-flex justify-content-center'>
                            <span className='text-center'>You have no fans yet.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fans Modal */}
                <div className="modal fade" id="fanListsModal" tabIndex="-1" aria-labelledby="fanListsModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3 className="modal-title fs-5" id="fanListsModalLabel">Fans</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        {(fanactivities?.data?.length > 0) ? (fanactivities?.data?.map(fanactivity => {
                          return (
                            <article key={ fanactivity?.id } className='bg-faansy-red mb-2 border-bottom d-flex justify-content-between align-items-center'>
                              <div className='d-flex gap-2 flex-wrap'>
                                  <div className="w-100 d-flex justify-content-between align-items-center column-gap-3 py-1 px-1">
                                      <span>
                                        <img src={ fanactivity?.fan?.user_image_url ? `${ Constants.serverURL }/storage/${ fanactivity?.fan?.user_image_url }` : MissingUserImage } alt="" width="40" height="40" className='object-fit-cover border border-light border-1 rounded-circle d-block' />
                                      </span>
                                      <span className="fw-semibold text-capitalize ms-2 d-flex align-items-center gap-1">
                                        <Link 
                                          target='_blank' 
                                          to={ route('home.users.show', {'username': fanactivity?.fan?.username}) } 
                                          className='text-dark text-decoration-none'>
                                          { fanactivity?.fan?.first_name + ' ' + fanactivity?.fan?.last_name } <span className='text-lowercase'>(@{ fanactivity?.fan?.username })</span>
                                        </Link>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                          <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                        </svg>
                                      </span>
                                  </div>
                              </div>
                              <div>
                                  <button 
                                      onClick={ async () => {
                                          await destroyFanactivity(fanactivity);
                                          await getFanactivities();
                                      } }
                                      type='button' 
                                      className='border-0 bg-transparent'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#4b4242" className="bi bi-trash2-fill text-secondary" viewBox="0 0 16 16">
                                          <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                                        </svg>
                                  </button>
                              </div>
                            </article>
                          )
                        })) : (
                          <div className='py-2 d-flex justify-content-center'>
                            <span className='text-center'>You have no fans yet.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
            </section>
        </section>

        <section className='earnings-section row px-3'>
            {/* <section className="border-top">
                <div className='row p-5'>

                  <div className='col-md d-flex flex-column align-items-end row-gap-1'>
                    <div id="myPlot" style={{ maxWidth: '150px'}}></div>
                    <small><small>Detailed Earnings (in USD)</small></small>
                  </div>

                  <div className='col-md d-flex flex-column align-items-end row-gap-1'>
                    <div id="myPlot2" style={{ maxWidth: '150px'}}></div>
                    <small><small>Detailed Income (in USD)</small></small>
                  </div>
                  
                </div>
            </section> */}
            
            <section className="border-top mt-3 col-12">
                <h3 className='fs-5 fw-semibold text-underline py-3'>Cumulative Earnings (in USD)</h3>
                <div className="row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Pay-Per-View</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (payPerViewEarningSum * 100)?.toFixed(2) }$</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#payPerViewModal" className='btn btn-sm btn-faansy-red text-light'>View Details</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Subscription</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (subscriptionEarningSum * 100)?.toFixed(2) }$</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#subscriptionModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Stream Tips</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (streamTipEarningSum * 100)?.toFixed(2) }$</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#streamTipModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Tips</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (tipEarningSum * 100)?.toFixed(2) }$</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#tipModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </section>

            <section className='earnings-modals'>
              {/* Pay-per-View Modal */}
              <div className="modal fade" id="payPerViewModal" tabIndex="-1" aria-labelledby="payPerViewModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="payPerViewModalLabel">Pay-Per-View Earnings</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(payPerViewEarningTransactions?.length > 0) ? (payPerViewEarningTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2 border-bottom'>
                            <div className='d-flex align-items-center gap-3'>
                              <span className='flex-shrink-0'>
                                <small>{ dayjs.utc(transaction?.created_at).fromNow() }</small>
                              </span>
                              <span className='flex-grow-1'>
                                Earning in content view from&nbsp;
                                <span className="fw-semibold text-capitalize">
                                  <Link 
                                    target='_blank' 
                                    to={ route('home.users.show', {'username': transaction?.beneficiary?.username}) } 
                                    className='text-dark text-decoration-none'>
                                    <span>
                                      { transaction?.beneficiary?.first_name + ' ' + transaction?.beneficiary?.last_name } <span className='text-lowercase'>(@{ transaction?.beneficiary?.username })</span>
                                    </span>
                                    <span className='align-top'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                      </svg>
                                    </span>
                                  </Link>
                                </span>
                              </span>
                              <span className='flex-shrink-0 fw-semibold'>
                                {`${ (transaction.amount * 100)?.toFixed(2) }$`}
                              </span>
                            </div>
                          </article>
                        )
                      })) : (
                        <div className='py-2 d-flex justify-content-center'>
                          <span className='text-center'>You have no earnings yet from Pay-Per-View.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Modal */}
              <div className="modal fade" id="subscriptionModal" tabIndex="-1" aria-labelledby="subscriptionModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="subscriptionModalLabel">Subscription Earnings</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(subscriptionEarningTransactions?.length > 0) ? (subscriptionEarningTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2 border-bottom'>
                            <div className='d-flex align-items-center gap-3'>
                              <span className='flex-shrink-0'>
                                <small>{ dayjs.utc(transaction?.created_at).fromNow() }</small>
                              </span>
                              <span className='flex-grow-1'>
                                Earning in subscription fee from&nbsp;
                                <span className="fw-semibold text-capitalize">
                                  <Link 
                                    target='_blank' 
                                    to={ route('home.users.show', {'username': transaction?.beneficiary?.username}) } 
                                    className='text-dark text-decoration-none'>
                                    <span>
                                      { transaction?.beneficiary?.first_name + ' ' + transaction?.beneficiary?.last_name } <span className='text-lowercase'>(@{ transaction?.beneficiary?.username })</span>
                                    </span>
                                    <span className='align-top'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                      </svg>
                                    </span>
                                  </Link>
                                </span>
                              </span>
                              <span className='flex-shrink-0 fw-semibold'>
                                {`${ (transaction.amount * 100)?.toFixed(2) }$`}
                              </span>
                            </div>
                          </article>
                        )
                      })) : (
                        <div className='py-2 d-flex justify-content-center'>
                          <span className='text-center'>You have no earnings yet from Subscriptions.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stream Tip Modal */}
              <div className="modal fade" id="streamTipModal" tabIndex="-1" aria-labelledby="streamTipModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="streamTipModalLabel">Stream Tip Earnings</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(streamTipEarningTransactions?.length > 0) ? (streamTipEarningTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2 border-bottom'>
                            <div className='d-flex align-items-center gap-3'>
                              <span className='flex-shrink-0'>
                                <small>{ dayjs.utc(transaction?.created_at).fromNow() }</small>
                              </span>
                              <span className='flex-grow-1'>
                                Earning in stream tip from&nbsp;
                                <span className="fw-semibold text-capitalize">
                                  <Link 
                                    target='_blank' 
                                    to={ route('home.users.show', {'username': transaction?.beneficiary?.username}) } 
                                    className='text-dark text-decoration-none'>
                                    <span>
                                      { transaction?.beneficiary?.first_name + ' ' + transaction?.beneficiary?.last_name } <span className='text-lowercase'>(@{ transaction?.beneficiary?.username })</span>
                                    </span>
                                    <span className='align-top'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                      </svg>
                                    </span>
                                  </Link>
                                </span>
                              </span>
                              <span className='flex-shrink-0 fw-semibold'>
                                {`${ (transaction.amount * 100)?.toFixed(2) }$`}
                              </span>
                            </div>
                          </article>
                        )
                      })) : (
                        <div className='py-2 d-flex justify-content-center'>
                          <span className='text-center'>You have no earnings yet from Stream Tips.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tip Modal */}
              <div className="modal fade" id="tipModal" tabIndex="-1" aria-labelledby="tipModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="tipModalLabel">Tip Earnings</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(tipEarningTransactions?.length > 0) ? (tipEarningTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2 border-bottom'>
                            <div className='d-flex align-items-center gap-3'>
                              <span className='flex-shrink-0'>
                                <small>{ dayjs.utc(transaction?.created_at).fromNow() }</small>
                              </span>
                              <span className='flex-grow-1'>
                                Received a tip from&nbsp;
                                <span className="fw-semibold text-capitalize">
                                  <Link 
                                    target='_blank' 
                                    to={ route('home.users.show', {'username': transaction?.beneficiary?.username}) } 
                                    className='text-dark text-decoration-none'>
                                    <span>
                                      { transaction?.beneficiary?.first_name + ' ' + transaction?.beneficiary?.last_name } <span className='text-lowercase'>(@{ transaction?.beneficiary?.username })</span>
                                    </span>
                                    <span className='align-top'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                      </svg>
                                    </span>
                                  </Link>
                                </span>
                              </span>
                              <span className='flex-shrink-0 fw-semibold'>
                                {`${ (transaction.amount * 100)?.toFixed(2) }$`}
                              </span>
                            </div>
                          </article>
                        )
                      })) : (
                        <div className='py-2 d-flex justify-content-center'>
                          <span className='text-center'>You have no earnings yet from Tips.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </section>

        <section className='expenses-section row px-3'>
            {/* <section className="border-top">
                <div className='row p-5'>

                  <div className='col-md d-flex flex-column align-items-end row-gap-1'>
                    <div id="myPlot" style={{ maxWidth: '150px'}}></div>
                    <small><small>Detailed Expenses (in USD)</small></small>
                  </div>

                  <div className='col-md d-flex flex-column align-items-end row-gap-1'>
                    <div id="myPlot2" style={{ maxWidth: '150px'}}></div>
                    <small><small>Detailed Income (in USD)</small></small>
                  </div>
                  
                </div>
            </section> */}
            
            <section className="border-top mt-3 col-12">
                <h3 className='fs-5 fw-semibold text-underline py-3'>Cumulative Expenditures (in USD)</h3>
                <div className="row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Pay-Per-View</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (payPerViewExpenditureSum * 100)?.toFixed(2) }$</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#payPerViewExpenditureModal" className='btn btn-sm btn-faansy-red text-light'>View Details</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Subscription</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (subscriptionExpenditureSum * 100)?.toFixed(2) }$</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#subscriptionExpenditureModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Stream Tips</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (streamTipExpenditureSum * 100)?.toFixed(2) }$</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#streamTipExpenditureModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title fs-6 fw-semibold">Tips</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className="card-text">{ (tipExpenditureSum * 100)?.toFixed(2) }$</span>
                          <span><button type='button' data-bs-toggle="modal" data-bs-target="#tipExpenditureModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </section>

            <section className='expenses-modals'>
              {/* Pay-per-View Modal */}
              <div className="modal fade" id="payPerViewExpenditureModal" tabIndex="-1" aria-labelledby="payPerViewModalExpenditureLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="payPerViewModalExpenditureLabel">Pay-Per-View Expenses</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(payPerViewExpenditureTransactions?.length) ? (payPerViewExpenditureTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2'>
                            <div className='d-flex align-items-center gap-3'>
                              <span className='flex-shrink-0'>
                                <small>{ dayjs.utc(transaction?.created_at).fromNow() }</small>
                              </span>
                              <span className='flex-grow-1'>
                                Paid to view content by&nbsp;
                                <span className="fw-semibold text-capitalize">
                                  <Link 
                                    target='_blank' 
                                    to={ route('home.users.show', {'username': transaction?.beneficiary?.username}) } 
                                    className='text-dark text-decoration-none'>
                                    <span>
                                      { transaction?.beneficiary?.first_name + ' ' + transaction?.beneficiary?.last_name } <span className='text-lowercase'>(@{ transaction?.beneficiary?.username })</span>
                                    </span>
                                    <span className='align-top'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                      </svg>
                                    </span>
                                  </Link>
                                </span>
                              </span>
                              <span className='flex-shrink-0 fw-semibold'>
                                {`${ (transaction.amount * 100)?.toFixed(2) }$`}
                              </span>
                            </div>
                          </article>
                        )
                      })) : (
                        <div className='py-2 d-flex justify-content-center'>
                          <span className='text-center'>You have no expenses yet on Pay-Per-View.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Modal */}
              <div className="modal fade" id="subscriptionExpenditureModal" tabIndex="-1" aria-labelledby="subscriptionExpenditureModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="subscriptionExpenditureModalLabel">Subscription Expenses</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(subscriptionExpenditureTransactions?.length > 0) ? (subscriptionExpenditureTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2'>
                            <div className='d-flex align-items-center gap-3'>
                              <span className='flex-shrink-0'>
                                <small>{ dayjs.utc(transaction?.created_at).fromNow() }</small>
                              </span>
                              <span className='flex-grow-1'>
                                Paid subscription fee to subscribe to creator&nbsp;
                                <span className="fw-semibold text-capitalize">
                                  <Link 
                                    target='_blank' 
                                    to={ route('home.users.show', {'username': transaction?.beneficiary?.username}) } 
                                    className='text-dark text-decoration-none'>
                                    <span>
                                      { transaction?.beneficiary?.first_name + ' ' + transaction?.beneficiary?.last_name } <span className='text-lowercase'>(@{ transaction?.beneficiary?.username })</span>
                                    </span>
                                    <span className='align-top'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                      </svg>
                                    </span>
                                  </Link>
                                </span>
                              </span>
                              <span className='flex-shrink-0 fw-semibold'>
                                {`${ (transaction.amount * 100)?.toFixed(2) }$`}
                              </span>
                            </div>
                          </article>
                        )
                      })) : (
                        <div className='py-2 d-flex justify-content-center'>
                          <span className='text-center'>You have no expenses yet on Subscriptions.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stream Tip Modal */}
              <div className="modal fade" id="streamTipExpenditureModal" tabIndex="-1" aria-labelledby="streamTipExpenditureModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="streamTipExpenditureModalLabel">Stream Tip Expenses</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(streamTipExpenditureTransactions?.length > 0) ? (streamTipExpenditureTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2'>
                            <div className='d-flex align-items-center gap-3'>
                              <span className='flex-shrink-0'>
                                <small>{ dayjs.utc(transaction?.created_at).fromNow() }</small>
                              </span>
                              <span className='flex-grow-1'>
                                Gave stream tip to creator,&nbsp;
                                <span className="fw-semibold text-capitalize">
                                  <Link 
                                    target='_blank' 
                                    to={ route('home.users.show', {'username': transaction?.beneficiary?.username}) } 
                                    className='text-dark text-decoration-none'>
                                    <span>
                                      { transaction?.beneficiary?.first_name + ' ' + transaction?.beneficiary?.last_name } <span className='text-lowercase'>(@{ transaction?.beneficiary?.username })</span>
                                    </span>
                                    <span className='align-top'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                      </svg>
                                    </span>
                                  </Link>
                                </span>
                              </span>
                              <span className='flex-shrink-0 fw-semibold'>
                                {`${ (transaction.amount * 100)?.toFixed(2) }$`}
                              </span>
                            </div>
                          </article>
                        )
                      })) : (
                        <div className='py-2 d-flex justify-content-center'>
                          <span className='text-center'>You have no expenses yet on Stream Tips.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tip Modal */}
              <div className="modal fade" id="tipExpenditureModal" tabIndex="-1" aria-labelledby="tipExpenditureModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="tipExpenditureModalLabel">Tip Expenses</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(tipExpenditureTransactions?.length > 0) ? (tipExpenditureTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2'>
                            <div className='d-flex align-items-center gap-3'>
                              <span className='flex-shrink-0'>
                                <small>{ dayjs.utc(transaction?.created_at).fromNow() }</small>
                              </span>
                              <span className='flex-grow-1'>
                                Gave a tip to&nbsp;
                                <span className="fw-semibold text-capitalize">
                                  <Link 
                                    target='_blank' 
                                    to={ route('home.users.show', {'username': transaction?.beneficiary?.username}) } 
                                    className='text-dark text-decoration-none'>
                                    <span>
                                      { transaction?.beneficiary?.first_name + ' ' + transaction?.beneficiary?.last_name } <span className='text-lowercase'>(@{ transaction?.beneficiary?.username })</span>
                                    </span>
                                    <span className='align-top'>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg align-self-start" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                      </svg>
                                    </span>
                                  </Link>
                                </span>
                              </span>
                              <span className='flex-shrink-0 fw-semibold'>
                                {`${ (transaction.amount * 100)?.toFixed(2) }$`}
                              </span>
                            </div>
                          </article>
                        )
                      })) : (
                        <div className='py-2 d-flex justify-content-center'>
                          <span className='text-center'>You have no expenses yet on Tips.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </section>
      </section>
    </Layout>
  )
}
