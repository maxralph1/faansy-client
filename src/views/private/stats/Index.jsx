import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { Link, useParams } from 'react-router-dom';
import { route } from '@/routes';
import Constants from '@/utils/Constants.jsx';
import { useCreator } from '@/hooks/useCreator';
import { useTransactions } from '@/hooks/useTransactions.jsx';
import Layout from '@/components/private/Layout.jsx';
import MissingUserBackgroundImage from '@/assets/images/logo_non_transparent.png';
import MissingUserImage from '@/assets/images/faansy_icon_non_transparent.png';

export default function Index() {
  const { user } = useContext(AuthContext);
  const { transactions, getTransactions } = useTransactions();

  console.log(transactions)

  const payPerViewTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'pay_per_view' && transaction?.transactor.id == user.id);
  const subscriptionTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'subscription' && transaction?.transactor.id == user.id);
  const streamTipTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'stream_tip' && transaction?.transactor.id == user.id);
  const tipTransactions = transactions?.data?.filter((transaction) => transaction?.transaction_type == 'tip' && transaction?.transactor.id == user.id);

  const payPerViewSum = payPerViewTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );

  console.log(payPerViewTransactions);
  // console.log(payPerViewSum);

  const subscriptionSum = subscriptionTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );

  // console.log(subscriptionSum);

  const streamTipSum = streamTipTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );

  // console.log(streamTipSum);

  const tipSum = tipTransactions?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );

  // console.log(tipSum);

  // setTimeout(() => {
  //   console.log("this is the first message");
  // }, 5000);

  return (
    <Layout>
      <section className="col-sm-10 col-md-9 card rounded-0 mid-body">
        <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
            <h2 className="text-uppercase fs-5 fw-bold">Stats</h2>
            <span className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
            </span>
        </div>

        <div>
            <section className="border-top">
                <div className='row p-5'>
                  <div className='col-sm-12 col-md-6 d-flex flex-column align-items-end row-gap-1'>
                    <small><small>Detailed Expenses (in USD)</small></small>
                  </div>
                  <div className='col-sm-12 col-md-6'>
                  </div>
                </div>
            </section>
            
            <section className="border-top mt-3 px-3">
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
                      <td>{ payPerViewSum }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#payPerViewModal" className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan='2'>Subscription</th>
                      <td>{ subscriptionSum }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#subscriptionModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan='2'>Stream Tips</th>
                      <td>{ streamTipSum }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#streamTipModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                    <tr>
                      <th scope="row" colSpan='2'>Tips</th>
                      <td>{ tipSum }</td>
                      <td><button type='button' data-bs-toggle="modal" data-bs-target="#tipModal"  className='btn btn-sm btn-faansy-red text-light'>View Details</button></td>
                    </tr>
                  </tbody>
                </table>
            </section>

            <section className='expenses-modals'>
              <div className="modal fade" id="payPerViewModal" tabIndex="-1" aria-labelledby="payPerViewModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="payPerViewModalLabel">Pay-Per-View Expenses</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(payPerViewTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2'>
                            {`${transaction.amount}$ paid to view ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name} content`}
                          </article>
                        )
                      }))}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-sm btn-dark" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="subscriptionModal" tabIndex="-1" aria-labelledby="subscriptionModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="subscriptionModalLabel">Subscription Expenses</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(subscriptionTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2'>
                            {`${transaction.amount}$ paid to subscribe to ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name}.`}
                          </article>
                        )
                      }))}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-sm btn-dark" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="streamTipModal" tabIndex="-1" aria-labelledby="streamTipModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="streamTipModalLabel">Stream Tip Expenses</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(streamTipTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2'>
                            {`${transaction.amount}$ paid to ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name} in stream tip.`}
                          </article>
                        )
                      }))}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-sm btn-dark" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="tipModal" tabIndex="-1" aria-labelledby="tipModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3 className="modal-title fs-5" id="tipModalLabel">Tip Expenses</h3>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {(tipTransactions?.map(transaction => {
                        return (
                          <article key={ transaction.id } className='bg-faansy-red mb-2'>
                            {`${transaction.amount}$ paid to ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name} in tip.`}
                          </article>
                        )
                      }))}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-sm btn-dark" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </div>
      </section>
    </Layout>
  )
}
