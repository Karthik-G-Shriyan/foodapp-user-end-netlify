import React, { useContext, useState } from 'react';
import './Menubar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';

const Menubar = () => {
  const [active, setActive] = useState('home');
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);
  const uniqueItemsInCart = Object.values(quantities).filter(qty => qty > 0).length;

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken("");
    setQuantities({});
    navigate("/");

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to={"/"}>
          <img src={assets.logo} alt="Logo" className='logo me-2 mx-3' height={58} width={58} onClick={() => setActive('home')} />
        </Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse my-2 mx-5" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <Link className={active === "home" ? "nav-link active" : "nav-link"} aria-current="page" to="/" onClick={() => setActive('home')}>
                <i className="bi bi-house-door me-1"></i>
                Home</Link>
            </li>
            <li className="nav-item me-3">
              <Link className={active === "explore" ? "nav-link active" : "nav-link"} to="/explore" onClick={() => setActive('explore')}>
                <i className="bi bi-compass me-1"></i>
                Explore</Link>
            </li>
            <li className="nav-item">
              <Link className={active === "contact" ? "nav-link active" : "nav-link"} to="/contact" onClick={() => setActive('contact')}>
                <i className="bi bi-envelope me-1"></i>
                Contact Us</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {/* Cart */}
            <div className="position-relative me-5">
              <Link to={"/cart"}><img src={assets.cart} alt="Cart" height={32} width={38} /></Link>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning"
              >
                {uniqueItemsInCart}
              </span>
            </div>

            {/* Buttons */}
            {
              !token ?
                <>
                  <button className="btn btn-outline-primary me-3" onClick={() => navigate("/register")}>
                    <i className="bi bi-person-plus me-1"></i>
                    <span className="d-none d-sm-inline">Register</span>
                  </button>
                  <button className="btn btn-success me-3" onClick={() => navigate("/login")}>
                    <i className="bi bi-box-arrow-in-right me-1"></i>

                    Login</button>
                </>
                : <div className="dropdown text-end">
                  <a
                    href="#"
                    className="d-block text-decoration-none dropdown-toggle position-relative"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ border: 'none' }}
                  >
                    <img
                      src={assets.profile}
                      alt="User Profile"
                      width={45}
                      height={45}
                      className="rounded-circle"
                      style={{
                        border: '2px solid #0d6efd',
                        padding: '2px',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    {/* Active badge */}
                    <span
                      className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle"
                      style={{
                        width: '12px',
                        height: '12px',
                        marginLeft: '-8px',
                        marginTop: '8px'
                      }}
                    >
                      <span className="visually-hidden">Online status</span>
                    </span>
                  </a>

                  <ul
                    className="dropdown-menu text-small shadow"
                    style={{
                      borderRadius: '12px',
                      border: '1px solid #dee2e6',
                      minWidth: '180px',
                      padding: '8px 0'
                    }}
                  >
                    {/* Header */}
                    <li className="px-3 py-2 border-bottom">
                      <small className="text-muted fw-semibold">My Account</small>
                    </li>

                    {/* Orders */}
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center py-2 px-3"
                        onClick={() => navigate("/myorders")}
                        style={{
                          fontSize: '14px',
                          transition: 'background-color 0.2s ease',
                          border: 'none',
                          background: 'none',
                          width: '100%',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <i className="bi bi-bag-check me-2 text-success"></i>
                        My Orders
                      </button>
                    </li>

                  

                    {/* Divider */}
                    <li><hr className="dropdown-divider my-1" /></li>

                    {/* Logout */}
                    <li>
                      <button
                        className="dropdown-item text-danger d-flex align-items-center py-2 px-3"
                        onClick={logout}
                        style={{
                          fontSize: '14px',
                          transition: 'background-color 0.2s ease',
                          border: 'none',
                          background: 'none',
                          width: '100%',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f8d7da';
                          e.target.style.color = '#721c24';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#dc3545';
                        }}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menubar;
