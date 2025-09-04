import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5">
            <div className="container">
                {/* Main Footer Content */}
                <div className="row justify-content-evenly" >
                    {/* Restaurant Info Section */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="d-flex mb-3 align-items-center justify-content-center">
                            <img 
                                src={assets.logo} 
                                alt="Restaurant Logo" 
                                className="mb-3"
                                style={{ height: "70px", width: "auto" }}
                            />
                        </div>
                        <p className="text-light opacity-75 mb-3">
                            Experience the finest dining with our carefully crafted dishes made from fresh, 
                            locally sourced ingredients. Order now and taste the difference!
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-light text-decoration-none" aria-label="Facebook">
                                <i className="bi bi-facebook fs-5" style={{ transition: "color 0.3s ease" }}
                                   onMouseEnter={(e) => e.target.style.color = "#1877f2"}
                                   onMouseLeave={(e) => e.target.style.color = ""}></i>
                            </a>
                            <a href="#" className="text-light text-decoration-none" aria-label="Instagram">
                                <i className="bi bi-instagram fs-5" style={{ transition: "color 0.3s ease" }}
                                   onMouseEnter={(e) => e.target.style.color = "#e4405f"}
                                   onMouseLeave={(e) => e.target.style.color = ""}></i>
                            </a>
                            <a href="#" className="text-light text-decoration-none" aria-label="Twitter">
                                <i className="bi bi-twitter fs-5" style={{ transition: "color 0.3s ease" }}
                                   onMouseEnter={(e) => e.target.style.color = "#1da1f2"}
                                   onMouseLeave={(e) => e.target.style.color = ""}></i>
                            </a>
                            <a href="#" className="text-light text-decoration-none" aria-label="WhatsApp">
                                <i className="bi bi-whatsapp fs-5" style={{ transition: "color 0.3s ease" }}
                                   onMouseEnter={(e) => e.target.style.color = "#25d366"}
                                   onMouseLeave={(e) => e.target.style.color = ""}></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-lg-2 col-md-6 col-6 mb-4">
                        <h5 className="text-light mb-3 fw-bold">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-light text-decoration-none opacity-75 d-flex align-items-center"
                                      style={{ transition: "opacity 0.3s ease" }}
                                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                      onMouseEnter={(e) => e.target.style.opacity = "1"}
                                      onMouseLeave={(e) => e.target.style.opacity = "0.75"}>
                                    <i className="bi bi-house me-2"></i>Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/explore" className="text-light text-decoration-none opacity-75 d-flex align-items-center"
                                      style={{ transition: "opacity 0.3s ease" }}
                                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                      onMouseEnter={(e) => e.target.style.opacity = "1"}
                                      onMouseLeave={(e) => e.target.style.opacity = "0.75"}>
                                    <i className="bi bi-list me-2"></i>Menu
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/" className="text-light text-decoration-none opacity-75 d-flex align-items-center"
                                      style={{ transition: "opacity 0.3s ease" }}
                                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                      onMouseEnter={(e) => e.target.style.opacity = "1"}
                                      onMouseLeave={(e) => e.target.style.opacity = "0.75"}>
                                    <i className="bi bi-info-circle me-2"></i>About Us
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="text-light text-decoration-none opacity-75 d-flex align-items-center"
                                      style={{ transition: "opacity 0.3s ease" }}
                                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                      onMouseEnter={(e) => e.target.style.opacity = "1"}
                                      onMouseLeave={(e) => e.target.style.opacity = "0.75"}>
                                    <i className="bi bi-telephone me-2"></i>Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    

                    {/* Contact Info Section */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="text-light mb-3 fw-bold">Get In Touch</h5>
                        <div className="mb-3">
                            <div className="d-flex align-items-start mb-2">
                                <i className="bi bi-geo-alt-fill text-primary me-3 mt-1"></i>
                                <div>
                                    <p className="text-light opacity-75 mb-0">
                                        123 Food Street, Cuisine District<br />
                                        Bengaluru, Karnataka 560001
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-telephone-fill text-primary me-3"></i>
                                <a href="tel:+911234567890" className="text-light text-decoration-none opacity-75">
                                    +91 12345 67890
                                </a>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-envelope-fill text-primary me-3"></i>
                                <a href="mailto:orders@restaurant.com" className="text-light text-decoration-none opacity-75">
                                    orders@restaurant.com
                                </a>
                            </div>
                        </div>
                        
                        {/* Newsletter Subscription */}
                        <div className="mb-3">
                            <h6 className="text-light mb-2">Subscribe to our Newsletter</h6>
                            <div className="input-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter your email"
                                    aria-label="Email for newsletter"
                                />
                                <button className="btn btn-primary" type="button">
                                    <i className="bi bi-send"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-secondary my-4" />

                {/* Bottom Footer */}
                <div className="row align-items-center">
                    <div className="col-md-6 mb-2 mb-md-0">
                        <p className="text-light opacity-75 mb-0">
                            © {new Date().getFullYear()} UNICKS_BYTES. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <div className="d-flex flex-wrap justify-content-md-end gap-3">
                            <a href="#" className="text-light text-decoration-none opacity-75 small"
                               style={{ transition: "opacity 0.3s ease" }}
                               onMouseEnter={(e) => e.target.style.opacity = "1"}
                               onMouseLeave={(e) => e.target.style.opacity = "0.75"}>
                                Privacy Policy
                            </a>
                            <a href="#" className="text-light text-decoration-none opacity-75 small"
                               style={{ transition: "opacity 0.3s ease" }}
                               onMouseEnter={(e) => e.target.style.opacity = "1"}
                               onMouseLeave={(e) => e.target.style.opacity = "0.75"}>
                                Terms of Service
                            </a>
                            <a href="#" className="text-light text-decoration-none opacity-75 small"
                               style={{ transition: "opacity 0.3s ease" }}
                               onMouseEnter={(e) => e.target.style.opacity = "1"}
                               onMouseLeave={(e) => e.target.style.opacity = "0.75"}>
                                Refund Policy
                            </a>
                        </div>
                    </div>
                </div>

                {/* Back to Top Button */}
                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
                    <button 
                        className="btn btn-primary rounded-circle shadow-lg"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{ 
                            width: "50px", 
                            height: "50px",
                            transition: "transform 0.3s ease, opacity 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        aria-label="Back to top"
                    >
                        <i className="bi bi-arrow-up"></i>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;