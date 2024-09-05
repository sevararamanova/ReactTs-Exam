

import './Footer.css';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter className='custom-footer text-center text-white text-lg-left footer-custom'>
            <section>
                <MDBContainer className='text-center text-md-start '>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-5'>
                            <h6 className='text-uppercase fw-bold mb-4 mt-4'>
                                <span className="font-bold text-pink-500 text-2xl" style={{ fontFamily: "fantasy" }}>SR Store</span>
                            </h6>
                            <p>
                                Enhance your confidence and radiance <br></br>with high-quality cosmetics for every occasion.
                            </p>
                        </MDBCol>

                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4 mt-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>ABOUT</h6>
                            <p>
                                <a href='/about' className='text-reset'>
                                    About Us
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Stores
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Join the team
                                </a>
                            </p>
                            <p>
                                <a href='/terms' className='text-reset'>
                                    Ts & Cs
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4 mt-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>CUSTOMER CARE</h6>
                            <p>
                                <a href='/blog' className='text-reset'>
                                    The Blog
                                </a>
                            </p>
                            <p>
                                <a href='/faq' className='text-reset'>
                                    FAQs
                                </a>
                            </p>
                            <p>
                                <a href='/shipping' className='text-reset'>
                                    Shipping Info
                                </a>
                            </p>
                            <p>
                                <a href='/returns' className='text-reset'>
                                    Returns
                                </a>
                            </p>
                        </MDBCol>
                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4 mt-4 contact'>
                            <h6 className='text-uppercase fw-bold mb-4'>CONTACT</h6>
                            <p>
                                TASHKENT,UZB
                            </p>
                            <p>
                                info@srstore.com
                            </p>
                            <p>
                                + (94) 177 77 77
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <div className='text-center p-4 subfooter' >
                © 2024 SR STORE
            </div>
        </MDBFooter>
    );
}
