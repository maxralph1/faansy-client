import { useContext } from 'react';
import AuthContext from '@/context/AuthContext.jsx';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"; 
dayjs.extend(relativeTime);
import { useCards } from '@/hooks/useCards.jsx';
import { useCard } from '@/hooks/useCard.jsx';
import Layout from '@/components/private/Layout.jsx';
import Loading from '@/components/Loading.jsx';

export default function Index() {
  const { user } = useContext(AuthContext);
  const { cards, getCards } = useCards();
  const { card, createCard, destroyCard } = useCard();

  console.log(cards)

  async function addCard (event) {
      event.preventDefault();
      const address = event.target.address.value;
      const city = event.target.city.value;
      const state_province = event.target.state_province.value;
      const country = event.target.country.value;
      const card_number = event.target.card_number.value;
      const expiration = event.target.expiration.value;
      const cvc = event.target.cvc.value;
      const name_on_card = event.target.name_on_card.value;
      const email = event.target.email.value;
      const user_id = user.id;

      console.log(address, city, state_province, country, card_number, expiration, cvc, name_on_card, email);
      await createCard(address, city, state_province, country, card_number, expiration, cvc, name_on_card, email);
      await getCards();
    }

  return (
    <Layout>
      <section className="col-sm-10 col-md-5 card rounded-0 main-content">
          <div className="position-sticky top-0 d-flex justify-content-between align-items-center pt-3 pb-2 px-3 bg-white border-bottom z-3">
              <h2 className="text-uppercase fs-5 fw-bold">Cards</h2>
              <span className="mb-2">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16">
                      <path
                          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg> */}
              </span>
          </div>

          <div>
              {/* <section className="mb-1 border px-3 py-2 column-gap-1 default-card">
                  <div className="card">
                    <div className="credit-card">
                      <div className="card__reader">
                        <div className="card__reader--risk card__reader--risk-one"></div>
                        <div className="card__reader--risk card__reader--risk-two"></div>
                        <div className="card__reader--risk card__reader--risk-three"></div>
                        <div className="card__reader--risk card__reader--risk-four"></div>
                      </div>
                      <p className="card__number">5032 9334 3764 9846</p>
                      <div className="card__dates">
                        <span className="card__dates--first">09/16</span>
                        <span className="card__dates--second">09/19</span>
                      </div>
                      <p className="card__name">GABRIEL FERREIRA</p>
                      <div className="card__flag">
                        <div className="card__flag--globe"></div>
                        <div className="card__flag--red"></div>
                        <div className="card__flag--yellow"></div>
                      </div>
                    </div>
                    <div className="assign">
                      <p>Designed by <a href="https://github.com/maxralph1" target="_blank">Maximillian Raphaels</a></p>
                    </div>
                  </div>
              </section> */}
              
              <section className="border-top">
                  <section className='d-flex justify-content-between align-items-center px-3'>
                      <h3 className='fw-bold pt-4 pb-2 fs-4'>Cards List</h3>
                      <button type="button" data-bs-toggle="modal" data-bs-target="#cardAddModal" data-bs-whatever="@mdo" className='btn btn-sm btn-faansy-red text-light'>Add Card</button>
                  </section>

                  <section className="modal fade" id="cardAddModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title fs-5" id="cardModalLabel">New Card</h4>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={addCard}>
                          <div className="modal-body">
                            <div className="mb-2 row gap-2">
                              <div className='col-md'>
                                <input name="address" id="address" type="text" className="form-control" placeholder="Address" />
                              </div>
                            </div>
                            <div className="mb-2 row gap-2">
                              <div className='col-md'>
                                <input name="city" id="city" type="text" className="form-control" placeholder="City" />
                              </div>
                            </div>
                            <div className="mb-2 row gap-2">
                              <div className='col-md'>
                                <input name="state_province" id="state_province" type="text" className="form-control" placeholder="State/Province" />
                              </div>
                            </div>
                            <div className="mb-2 row gap-2">
                              <div className='col-md'>
                                <input name="country" id="country" type="text" className="form-control" placeholder="Country" />
                              </div>
                            </div>
                            <div className="mb-2 row">
                              <div className='col-7'>
                                <input name="card_number" id="card_number" type="text" className="form-control" placeholder="Card Number" />
                              </div>
                              <div className='col-3'>
                                <input name="expiration" id="expiration" type="text" className="form-control" placeholder="Expiry" />
                              </div>
                              <div className='col-2'>
                                <input name="cvc" id="cvc" type="text" className="form-control" placeholder="CVC" />
                              </div>
                            </div>
                            <div className="mb-2 row">
                              <div className='col-md'>
                                <input name="name_on_card" id="name_on_card" type="text" className="form-control" placeholder="Name on Card" />
                              </div>
                            </div>
                            <div className="mb-2 row">
                              <div className='col-md'>
                                <input name="email" id="email" type="email" className="form-control" placeholder="Email" />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="submit" className="btn btn-sm btn-faansy-red text-light">Add Card</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>

                  <section>
                    {(cards?.data?.length > 0) ? cards?.data?.map(card => {
                      return (
                          <article key={ card?.id } className='card rounded-0 chat-item'>
                              <div 
                                type="button" 
                                data-bs-toggle="modal" 
                                data-bs-target={`#cardModal${card?.id}`} 
                                data-bs-whatever=""
                                className="card-body d-flex flex-column">
                                  { card?.default == false && <span className='card-text fs-6 fw-semibold mb-1'>Default</span>}
                                  <div className='column-gap-2'>
                                      <p className='card-text fs-6'>Card number: <span className='fw-semibold'> { card.card_number} </span></p>
                                  </div>
                              </div>

                              <div className="modal fade" id={`cardModal${card?.id}`} tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                  <div className="modal-content position-relative">
                                    <div className="modal-header">
                                      <h5 className="modal-title fs-5" id="cardModalLabel">Card Details</h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className="messages overflow-y-auto d-flex flex-column row-gap-2" style={{ maxHeight: '50vh' }}>
                                        <div className='w-100 rounded' style={{ backgroundColor: '#82030324' }}>
                                          <div className="d-flex flex-column row-gap-2 p-2">
                                            <span className='card-text fs-6'>Card Number:&nbsp;<span className='fw-semibold'>{ card.card_number }</span></span>
                                            <span className='card-text fs-6'>Name on Card:&nbsp;<span className='fw-semibold'>{ card.name_on_card }</span></span>
                                            <span className='card-text fs-6'>Expiry:&nbsp;<span className='fw-semibold'>{ card.expiration }</span></span>
                                            <span className='card-text fs-6'>CVC:&nbsp;<span className='fw-semibold'>{ card.cvc }</span></span>
                                            <span className='card-text fs-6'>Email:&nbsp;<span className='fw-semibold'>{ card.email }</span></span>
                                            <span className='card-text fs-6'>Address:&nbsp;<span className='fw-semibold'>{ card.address }</span></span>
                                            <span className='card-text fs-6'>City:&nbsp;<span className='fw-semibold'>{ card.city }</span></span>
                                            <span className='card-text fs-6'>State/Province:&nbsp;<span className='fw-semibold'>{ card.state_province }</span></span>
                                            <span className='card-text fs-6'>Country:&nbsp;<span className='fw-semibold'>{ card.country }</span></span>
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
                    }) : (cards?.data?.length < 1) ? (
                      <section className='vh-100 d-flex justify-content-center align-items-center px-5'>
                        <span className='h-50 text-center fw-semibold px-5'>You do not yet have saved cards.</span>
                      </section>
                    ) : (
                      <section className='vh-100 pt-5 mt-2 px-5'>
                          <div className='h-50 px-5'>
                              <Loading />
                          </div>
                      </section>
                    )}
                  </section>
              </section>
          </div>
      </section>
    </Layout>
  )
}
