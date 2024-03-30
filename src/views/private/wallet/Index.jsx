import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { route } from '@/routes';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useWallet } from '@/hooks/useWallet.jsx';
import { useTransactions } from '@/hooks/useTransactions.jsx';
import { useTransaction } from '@/hooks/useTransaction.jsx';
import { useCards } from '@/hooks/useCards.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';


export default function Index() {
  const { user } = useContext(AuthContext);
  const { wallet, getWallet } = useWallet(user.id);
  const { transactions, getTransactions } = useTransactions();
  const { transaction, createTransaction, destroyTransaction } = useTransaction();
  const { cards, getCards } = useCards();

  console.log(wallet?.data)
  console.log(transactions)

  return (
    <Layout>
      <section className="col-sm-10 col-md-5 card rounded-0 main-content">
        <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
          <h2 className="text-uppercase fs-5 fw-bold">Wallet</h2>
          <span className="mb-2">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg> */}
          </span>
        </div>

        <div>
          <section className="mb-1 border px-3 py-2 column-gap-1">
            <div className="card">
              <div className="card-body d-flex justify-content-end">
                <div className='d-flex flex-column align-items-end'>
                  <span className='d-flex align-items-center column-gap-1'>
                    <span>Wallet Balance:&nbsp;</span><span className='fw-bold fs-4 text-success'>{wallet?.data?.balance}$</span>
                  </span>
                  <small className='d-flex align-items-center column-gap-1'>
                    <span>Total In-flow:&nbsp;</span><span className='fw-semibold text-success'>{wallet?.data?.total_inflow}$</span>
                  </small>
                  <small className='d-flex align-items-center column-gap-1'>
                    <span>Total Expenditure:&nbsp;</span><span className='fw-semibold text-danger'>{wallet?.data?.total_expenditure}$</span>
                  </small>
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#fundWalletModal"
                    data-bs-whatever="@fat"
                    className='btn btn-sm btn-success my-2'><small>Fund wallet</small>
                  </span>

                  <div className="modal fade" id="fundWalletModal" tabIndex="-1" aria-labelledby="fundWalletModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title fs-5" id="fundWalletModalLabel">Fund Wallet</h4>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          {(cards?.data?.length > 0) ?
                            <form className='d-flex flex-column'>
                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="amount"
                                  placeholder='Amount in USD' />
                              </div>
                              <div className="form-floating mb-3">
                                {(cards?.data?.length > 0) &&
                                  <>
                                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                      {(cards?.data?.length > 0) && cards?.data?.map(card => {
                                        return (
                                          <option key={card?.id} value="">{card.card_number}</option>
                                        )
                                      })}
                                      {/* <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option> */}
                                    </select>
                                    <label htmlFor="floatingSelect">Select the card for funding</label>
                                  </>
                                }
                              </div>

                              <hr />

                              <div className='align-self-end'>
                                <button type="button" className="btn btn-sm btn-success text-light">Fund Now</button>
                              </div>
                            </form>
                            : (
                              <div className='py-2 d-flex justify-content-center'>
                                <span className='text-center'>You have no saved card yet.&nbsp;
                                  {/* <Link to={ route('home.cards.index') } className='text-faansy-red'>Add One</Link> */}
                                </span>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-top">
            <h3 className='fw-bold pt-4 pb-2 ps-3 fs-4'>Transactions</h3>
            {(transactions?.data?.length > 0) ? transactions?.data?.map(transaction => {
              // {(transactions?.data?.length > 0) ? transactions?.data?.filter((transaction) => ((transaction?.transaction_type != 'commission_on_pay_per_view_in_chat') || (transaction?.transaction_type != 'commission_on_pay_per_view_on_post') || (transaction?.transaction_type != 'commission_on_subscription')) && (transaction?.transactor?.id != user?.id || transaction?.beneficiary?.id == user?.id))?.map(transaction => {
              return (
                <article key={transaction.id} className='card rounded-0 chat-item'>
                  <div
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={`#transactionModal${transaction?.id}`}
                    data-bs-whatever="@mdo"
                    className="card-body d-flex flex-column">
                    <h4 className='card-text fs-6 fw-semibold'>
                      {transaction.transaction_type == 'pay_per_view_in_chat'
                        ? 'Pay-Per-View in Chat'
                        : transaction.transaction_type == 'commission_on_pay_per_view_in_chat'
                          ? 'Commission (on Pay-Per-View on Chat)'
                          : transaction.transaction_type == 'pay_per_view_on_post'
                            ? 'Pay-Per-View on Post'
                            : transaction.transaction_type == 'commission_on_pay_per_view_on_post'
                              ? 'Commission (on Pay-Per-View on Post)'
                              : transaction.transaction_type == 'subscription'
                                ? 'Subscription'
                                : transaction.transaction_type == 'commission_on_subscription'
                                  ? 'Commission (on Subscription)'
                                  : transaction.transaction_type == 'stream_tip'
                                    ? 'Stream Tip'
                                    : transaction.transaction_type == 'commission_on_stream_tip'
                                      ? 'Commission (on Stream Tip)'
                                      : transaction.transaction_type == 'tip'
                                        ? 'Tip'
                                        : transaction.transaction_type == 'commission_on_tip'
                                          ? 'Commission (on Tip)'
                                          : transaction.transaction_type == 'subscription'
                                            ? 'Subscription'
                                            : transaction.transaction_type == 'commission_on_subscription'
                                              ? 'Commission (on Subscription)'
                                              : transaction.transaction_type == 'commission'
                                                ? 'Commission'
                                                : transaction.transaction_type == 'vat'
                                                  ? 'VAT'
                                                  : transaction.transaction_type == 'others'
                                                    ? '(Others)'
                                                    : 'Transaction'}
                    </h4>
                    <div className='column-gap-2'>
                      <p className='card-text fs-6'>
                        {transaction.beneficiary.id == user.id && transaction.transaction_type == 'pay_per_view_in_chat'
                          ? `You received ${(transaction.amount).toFixed(2)}$ on a chat Pay-Per-View.`
                          : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_pay_per_view_in_chat'
                            ? `You were charged ${(transaction.amount).toFixed(2)}$ commission (Pay-Per-View on Chat).`
                            : transaction.transactor.id == user.id && transaction.transaction_type == 'pay_per_view_in_chat'
                              ? `You paid ${(transaction.amount).toFixed(2)}$ on a chat Pay-Per-View.`
                              : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_pay_per_view_in_chat'
                                ? `${(transaction.amount).toFixed(2)}$ commission in Pay-Per-View on Chat was deducted from the creator you viewed their content.`
                                : transaction.beneficiary.id == user.id && transaction.transaction_type == 'pay_per_view_on_post'
                                  ? `You received ${(transaction.amount).toFixed(2)}$ on a post Pay-Per-View.`
                                  : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_pay_per_view_on_post'
                                    ? `You were charged ${(transaction.amount).toFixed(2)}$ commission (Pay-Per-View on Post).`
                                    : transaction.transactor.id == user.id && transaction.transaction_type == 'pay_per_view_on_post'
                                      ? `You paid ${(transaction.amount).toFixed(2)}$ on a post Pay-Per-View.`
                                      : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_pay_per_view_on_post'
                                        ? `${(transaction.amount).toFixed(2)}$ commission in Pay-Per-View on Post was deducted from the creator you viewed their content.`
                                        : transaction.beneficiary.id == user.id && transaction.transaction_type == 'subscription'
                                          ? `You received ${(transaction.amount).toFixed(2)}$ in subscription fees.`
                                          : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_subscription'
                                            ? `You were charged ${(transaction.amount).toFixed(2)}$ in subscription fee commission.`
                                            : transaction.transactor.id == user.id && transaction.transaction_type == 'subscription'
                                              ? `You paid ${(transaction.amount).toFixed(2)}$ in subscription fees.`
                                              : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_subscription'
                                                ? `${(transaction.amount).toFixed(2)}$ in commission on subscription fee was deducted from the creator you subscribed to.`
                                                : transaction.beneficiary.id == user.id && transaction.transaction_type == 'stream_tip'
                                                  ? `You received ${(transaction.amount).toFixed(2)}$ in stream tip money.`
                                                  : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_stream_tip'
                                                    ? `You were charged ${(transaction.amount).toFixed(2)}$ commission in stream tip money.`
                                                    : transaction.transactor.id == user.id && transaction.transaction_type == 'stream_tip'
                                                      ? `You paid ${(transaction.amount).toFixed(2)}$ in stream tip.`
                                                      : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_stream_tip'
                                                        ? `${(transaction.amount).toFixed(2)}$ commission in stream tip was deducted from the creator you gave a stream tip.`
                                                        : transaction.beneficiary.id == user.id && transaction.transaction_type == 'tip'
                                                          ? `You received ${(transaction.amount).toFixed(2)}$ in tip money.`
                                                          : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_tip'
                                                            ? `You were charged ${(transaction.amount).toFixed(2)}$ in tip money commission.`
                                                            : transaction.transactor.id == user.id && transaction.transaction_type == 'tip'
                                                              ? `You paid ${(transaction.amount).toFixed(2)}$ in tip.`
                                                              : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_tip'
                                                                ? `${(transaction.amount).toFixed(2)}$ in tip commission was deducted from the creator you gave a tip.`
                                                                : transaction.beneficiary.id == user.id && transaction.transaction_type == 'vat'
                                                                  ? `You received ${(transaction.amount).toFixed(2)}$ in VAT.`
                                                                  : transaction.transactor.id == user.id && transaction.transaction_type == 'vat'
                                                                    ? `You paid ${(transaction.amount).toFixed(2)}$ in VAT.`
                                                                    : 'Transaction'}
                      </p>
                    </div>
                  </div>

                  <div className="modal fade" id={`transactionModal${transaction?.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content position-relative">
                        <div className="modal-header">
                          <h5 className="modal-title fs-5" id="exampleModalLabel">
                            {transaction.transaction_type == 'pay_per_view_in_chat'
                              ? 'Pay-Per-View (on Chat)'
                              : transaction.transaction_type == 'commission_on_pay_per_view_in_chat'
                                ? 'Commission (on Pay-Per-View (on Chat))'
                                : transaction.transaction_type == 'pay_per_view_on_post'
                                  ? 'Pay-Per-View (on Post)'
                                  : transaction.transaction_type == 'commission_on_pay_per_view_on_post'
                                    ? 'Commission (on Pay-Per-View (on Post))'
                                    : transaction.transaction_type == 'stream_tip'
                                      ? 'Stream Tip'
                                      : transaction.transaction_type == 'commission_on_stream_tip'
                                        ? 'Commission (on Stream Tip)'
                                        : transaction.transaction_type == 'subscription'
                                          ? 'Subscription'
                                          : transaction.transaction_type == 'commission_on_subscription'
                                            ? 'Commission (on Subscription)'
                                            : transaction.transaction_type == 'tip'
                                              ? 'Tip'
                                              : transaction.transaction_type == 'commission_on_tip'
                                                ? 'Commission (on Tip)'
                                                : transaction.transaction_type == 'commission'
                                                  ? 'Commission'
                                                  : transaction.transaction_type == 'vat'
                                                    ? 'VAT'
                                                    : 'Unnamed Transaction'}
                          </h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="messages overflow-y-auto d-flex flex-column row-gap-2" style={{ maxHeight: '50vh' }}>
                            <div className='w-100 rounded'>
                              <div className="d-flex align-items-center p-2">
                                <span className='card-text fs-6'>
                                  <small className=''>
                                    {/* Pay-Per-View on Chat */}
                                    {transaction.beneficiary.id == user.id && transaction.transaction_type == 'pay_per_view_in_chat'
                                      ? `You received ${(transaction.amount).toFixed(2)}$ in Pay-Per-View on Chat fee from ${transaction.transactor.first_name} ${transaction.transactor.last_name}.`

                                      : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_pay_per_view_in_chat'
                                        ? `You were charged ${(transaction.amount).toFixed(2)}$ commission (on Pay-Per-View (on Chat)).`

                                        : transaction.transactor.id == user.id && transaction.transaction_type == 'pay_per_view_in_chat'
                                          ? `You paid ${(transaction.amount).toFixed(2)}$ to view content by ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name}`

                                          : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_pay_per_view_in_chat'
                                            ? `${(transaction.amount).toFixed(2)}$ commission was deducted from the creator you viewed their chat Pay-Per-View content.`


                                            /* Pay-Per-View on Post */
                                            : transaction.beneficiary.id == user.id && transaction.transaction_type == 'pay_per_view_on_post'
                                              ? `You received ${(transaction.amount).toFixed(2)}$ in Pay-Per-View on Post fee from ${transaction.transactor.first_name} ${transaction.transactor.last_name}.`

                                              : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_pay_per_view_on_post'
                                                ? `You were charged ${(transaction.amount).toFixed(2)}$ commission (on Pay-Per-View (on Post)).`

                                                : transaction.transactor.id == user.id && transaction.transaction_type == 'pay_per_view_on_post'
                                                  ? `You paid ${(transaction.amount).toFixed(2)}$ to view content by ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name}`

                                                  : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_pay_per_view_on_post'
                                                    ? `${(transaction.amount).toFixed(2)}$ commission was deducted from the creator you viewed their post Pay-Per-View content.`


                                                    /* Stream Tip */
                                                    : transaction.beneficiary.id == user.id && transaction.transaction_type == 'stream_tip'
                                                      ? `You received ${(transaction.amount).toFixed(2)}$ in stream tip money from ${transaction.transactor.first_name} ${transaction.transactor.last_name}.`

                                                      : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_stream_tip'
                                                        ? `You were charged ${(transaction.amount).toFixed(2)}$ in stream tip money commission.`

                                                        : transaction.transactor.id == user.id && transaction.transaction_type == 'stream_tip'
                                                          ? `You paid ${(transaction.amount).toFixed(2)}$ in stream tip money to ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name}`

                                                          : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_stream_tip'
                                                            ? `${(transaction.amount).toFixed(2)}$ in stream tip commission was deducted from the creator you gave a stream tip.`


                                                            /* Subscription */
                                                            : transaction.beneficiary.id == user.id && transaction.transaction_type == 'subscription'
                                                              ? `You received ${(transaction.amount).toFixed(2)}$ in subscription fee from ${transaction.transactor.first_name} ${transaction.transactor.last_name}.`

                                                              : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_subscription'
                                                                ? `You were charged ${(transaction.amount).toFixed(2)}$ in subscription fee commission.`

                                                                : transaction.transactor.id == user.id && transaction.transaction_type == 'subscription'
                                                                  ? `You paid ${(transaction.amount).toFixed(2)}$ in subscription fee to subscribe to ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name}`

                                                                  : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_subscription'
                                                                    ? `${(transaction.amount).toFixed(2)}$ in subscription fee commission was deducted from the creator you subscribed to.`


                                                                    /* Tip */
                                                                    : transaction.beneficiary.id == user.id && transaction.transaction_type == 'tip'
                                                                      ? `You received ${(transaction.amount).toFixed(2)}$ in tip money from ${transaction.transactor.first_name} ${transaction.transactor.last_name}.`

                                                                      : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission_on_tip'
                                                                        ? `You were charged ${(transaction.amount).toFixed(2)}$ in tip money commission.`

                                                                        : transaction.transactor.id == user.id && transaction.transaction_type == 'tip'
                                                                          ? `You paid ${(transaction.amount).toFixed(2)}$ in tip money to ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name}`

                                                                          : transaction.transactor.id == user.id && transaction.transaction_type == 'commission_on_tip'
                                                                            ? `${(transaction.amount).toFixed(2)}$ in tip commission was deducted from the creator you gave a tip.`

                                                                            : 'Unnamed Transaction'}
                                  </small>
                                </span>
                              </div>
                            </div>

                          </div>

                          <hr />

                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            }) : (transactions?.data?.length < 1) ? (
              <section className='vh-100 d-flex justify-content-center align-items-center px-5'>
                <span className='h-50 text-center fw-semibold px-5'>You currently have no transactions.</span>
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
