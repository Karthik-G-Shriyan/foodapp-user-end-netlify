import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div
      className="hero-section position-relative overflow-hidden"
      style={{
        backgroundImage: `url(${assets.hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px',
        margin: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}
    >


      <div className="container position-relative">
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-10">
            {/* Main Content */}
            <div className="hero-content text-white ms-3 mb-3">
              <div className="mb-3 mt-2 ms-5">
                <span
                  className="badge bg-light text-primary px-3 py-2"
                  style={{
                    borderRadius: '50px',
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}
                >
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  BENGALURU
                </span>
              </div>

              <h1
                className="display-4 fw-bold mb-4"
                style={{
                  lineHeight: '1.2',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Order your favorite food
                <span className="d-block">
                  <span style={{ color: '#ffd700' }}>here!</span>
                </span>
              </h1>

              <p
                className="lead mb-4 opacity-90"
                style={{
                  fontSize: '1.25rem',
                  lineHeight: '1.6',
                  maxWidth: '600px'
                }}
              >
                <i className="bi bi-stars me-2" style={{ color: '#ffd700' }}></i>
                Discover the best food and drinks in Bengaluru.
                Fast delivery, fresh ingredients, amazing taste.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Link
                  to="/explore"
                  className="btn btn-light btn-lg px-4 py-3 d-flex align-items-center"
                  style={{
                    borderRadius: '50px',
                    fontWeight: '600',
                    color: '#667eea',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(255,255,255,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255,255,255,0.2)';
                  }}
                >
                  <i className="bi bi-compass me-2"></i>
                  Explore Menu
                </Link>


              </div>

              {/* Stats */}
              <div className="row text-center text-lg-start">
                <div className="col-4">
                  <div className="stat-item">
                    <div className="h4 fw-bold mb-0" style={{ color: '#ffd700' }}>40+</div>
                    <small className="opacity-75">Delicious Varieties</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-item">
                    <div className="h4 fw-bold mb-0" style={{ color: '#ffd700' }}>10k+</div>
                    <small className="opacity-75">Happy Customers</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-item">
                    <div className="h4 fw-bold mb-0" style={{ color: '#ffd700' }}>30min</div>
                    <small className="opacity-75">Avg Delivery</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @media (max-width: 991.98px) {
          .hero-section {
            margin: 10px !important;
            minHeight: 50vh !important;
            borderRadius: 15px !important;
          }
          .display-4 {
            fontSize: 2.5rem !important;
          }
        }
        
        @media (max-width: 576px) {
          .hero-section {
            margin: 5px !important;
            borderRadius: 10px !important;
          }
          .display-4 {
            fontSize: 2rem !important;
          }
          .lead {
            fontSize: 1.1rem !important;
          }
          .btn-lg {
            padding: 12px 24px !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;