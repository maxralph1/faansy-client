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
  const { transactions, getTransactions } = useTransactions();

  console.log(transactions);

  const payPerViewEarningTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'pay_per_view' && transaction?.transactor.id != user.id);
  const payPerViewExpenditureTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'pay_per_view' && transaction?.transactor.id == user.id);

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


  return (
    <Layout>
      <section className="col-sm-10 col-md-9 card rounded-0 mid-body">
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
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" colSpan='2'>Activity</th>
                      <th scope="col">Amount Spent (in USD)</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" colSpan='2'>Pay-Per-View</th>
                      <td>{ payPerViewEarningSum?.toFixed(2) }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#payPerViewModal" className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan='2'>Subscription</th>
                      <td>{ subscriptionEarningSum?.toFixed(2) }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#subscriptionModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan='2'>Stream Tips</th>
                      <td>{ streamTipEarningSum?.toFixed(2) }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#streamTipModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan='2'>Tips</th>
                      <td>{ tipEarningSum?.toFixed(2) }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#tipModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                  </tbody>
                </table>
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
                            {`${ (transaction.amount)?.toFixed(2) }$ earned in content pay-per-view from ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name}, ${ dayjs.utc(transaction?.created_at).fromNow() }.`}
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
                            {`${ (transaction.amount)?.toFixed(2) }$ earned in subscription fee from ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name}, ${ dayjs.utc(transaction?.created_at).fromNow() }.`}
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
                            {`${ (transaction.amount)?.toFixed(2) }$ received from ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name} in stream tip, ${ dayjs.utc(transaction?.created_at).fromNow() }.`}
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
                            {`${ (transaction.amount)?.toFixed(2) }$ received from ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name} in tip, ${ dayjs.utc(transaction?.created_at).fromNow() }.`}
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
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" colSpan='2'>Activity</th>
                      <th scope="col">Amount Spent (in USD)</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" colSpan='2'>Pay-Per-View</th>
                      <td>{ payPerViewExpenditureSum?.toFixed(2) }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#payPerViewExpenditureModal" className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan='2'>Subscription</th>
                      <td>{ subscriptionExpenditureSum?.toFixed(2) }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#subscriptionExpenditureModal" className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan='2'>Stream Tips</th>
                      <td>{ streamTipExpenditureSum?.toFixed(2) }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#streamTipExpenditureModal" className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan='2'>Tips</th>
                      <td>{ tipExpenditureSum?.toFixed(2) }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#tipExpenditureModal" className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                  </tbody>
                </table>
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
                            {`${ (transaction.amount)?.toFixed(2) }$ paid to view ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name} content, ${ dayjs.utc(transaction?.created_at).fromNow() }.`}
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
                            {`${ (transaction.amount)?.toFixed(2) }$ paid to subscribe to ${transaction.beneficiary.first_name} ${transaction?.beneficiary?.last_name}, ${(dayjs.utc(transaction?.created_at).fromNow())}.`}
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
                            {`${ (transaction.amount)?.toFixed(2) }$ paid to ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name} in stream tip, ${ dayjs.utc(transaction?.created_at).fromNow() }.`}
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
                            {`${ (transaction.amount)?.toFixed(2) }$ paid to ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name} in tip, ${ dayjs.utc(transaction?.created_at).fromNow() }.`}
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
