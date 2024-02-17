import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { useWallet } from '@/hooks/useWallet.jsx';
import { useTransactions } from '@/hooks/useTransactions.jsx';
import { useTransaction } from '@/hooks/useTransaction.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';

export default function Index() {
  const { user } = useContext(AuthContext);
  const { wallet, getWallet } = useWallet(user.id);
  const { transactions, getTransactions } = useTransactions();
  const { transaction, createTransaction, destroyTransaction } = useTransaction();

  console.log(wallet?.data)

  return (
    <Layout>
      <section className="col-sm-10 col-md-5 card rounded-0">
        <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
            <h2 className="text-uppercase fs-5 fw-bold">Wallet</h2>
            <span className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
            </span>
        </div>

        <div>
            <section className="mb-1 border px-3 py-2 column-gap-1">
                <div className="card">
                  <div className="card-body d-flex justify-content-end">
                    <div className='d-flex flex-column align-items-end'>
                      <span className='d-flex align-items-center column-gap-1'>
                        <span>Wallet Balance:&nbsp;</span><span className='fw-bold fs-4 text-success'>{ wallet?.data?.balance }$</span>
                      </span>
                      <small className='d-flex align-items-center column-gap-1'>
                        <span>Total In-flow:&nbsp;</span><span className='fw-semibold text-success'>{ wallet?.data?.total_inflow }$</span>
                      </small>
                      <small className='d-flex align-items-center column-gap-1'>
                        <span>Total Expenditure:&nbsp;</span><span className='fw-semibold text-danger'>{ wallet?.data?.total_expenditure }$</span>
                      </small>
                    </div>
                  </div>
                </div>
            </section>
            
            <section className="border-top">
                <h3 className='fw-bold pt-4 pb-2 ps-3 fs-4'>Transactions</h3>
                {(transactions?.data?.length > 0) ? transactions?.data?.map(transaction => {
                  return (
                    <article key={ transaction.id } className='card rounded-0 chat-item'>
                        <div 
                          type="button" 
                          data-bs-toggle="modal" 
                          data-bs-target={ `#transactionModal${ transaction?.id }` } 
                          data-bs-whatever="@mdo"
                          className="card-body d-flex flex-column">
                            <h4 className='card-text fs-6 fw-semibold'>
                              { transaction.transaction_type == 'tip' 
                                  ? 'Tip' 
                                  : transaction.transaction_type == 'commission_on_tip' 
                                  ? 'Commission (on Tip)' 
                                  : transaction.transaction_type == 'commission' 
                                  ? 'Commission' 
                                  : 'Transaction' }
                            </h4>
                            <div className='column-gap-2'>
                                <p className='card-text fs-6'>
                                  { transaction.beneficiary.id == user.id && transaction.transaction_type == 'tip'
                                    ? `You received ${transaction.amount}$ in tip money.` 
                                    : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission' 
                                    ? `You were charged ${transaction.amount}$ in tip money commission.`  
                                    : transaction.transactor.id == user.id && transaction.transaction_type == 'tip' 
                                    ? `You paid ${transaction.amount}$ in tip.` 
                                    : transaction.transactor.id == user.id && transaction.transaction_type == 'commission' 
                                    ? `${transaction.amount}$ in tip commission was deducted from the creator you gave a tip.` 
                                    : 'Transaction' }
                                </p>
                            </div>
                        </div>

                        <div className="modal fade" id={ `transactionModal${ transaction?.id }` } tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content position-relative">
                              <div className="modal-header">
                                <h5 className="modal-title fs-5" id="exampleModalLabel">
                                  { transaction.transaction_type == 'tip' 
                                      ? 'Tip' 
                                      : transaction.transaction_type == 'commission_on_tip' 
                                      ? 'Commission (on Tip)' 
                                      : transaction.transaction_type == 'commission' 
                                      ? 'Commission' 
                                      : 'Unnamed Transaction' }  
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <div className="messages overflow-y-auto d-flex flex-column row-gap-2" style={{ maxHeight: '50vh' }}>
                                  <div className='w-100 rounded' style={{ backgroundColor: '#82030324' }}>
                                    <div className="d-flex align-items-center p-2">
                                      <span className='card-text fs-6 fw-semibold'>
                                        <small className=''>
                                          { transaction.beneficiary.id == user.id && transaction.transaction_type == 'tip'
                                            ? `You received ${transaction.amount}$ in tip money from ${transaction.transactor.first_name} ${transaction.transactor.last_name}.` 

                                            : transaction.beneficiary.id == user.id && transaction.transaction_type == 'commission' 
                                              ? `You were charged ${transaction.amount}$ in tip money commission.`  
                                            
                                            : transaction.transactor.id == user.id && transaction.transaction_type == 'tip' 
                                              ? `You paid ${transaction.amount}$ in tip money to ${transaction.beneficiary.first_name} ${transaction.beneficiary.last_name}` 

                                            : transaction.transactor.id == user.id && transaction.transaction_type == 'commission' 
                                              ? `${transaction.amount}$ in tip commission was deducted from the creator you gave a tip.` 
                                            
                                            : 'Unnamed Transaction' }
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
                )}) : (transactions?.data?.length < 1) ? (
                    <section className='vh-100 d-flex justify-content-center align-items-center'>
                        <span className='h-50 text-center fw-semibold'>No transactions yet</span>
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
