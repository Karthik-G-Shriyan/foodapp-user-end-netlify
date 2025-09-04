import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { calculateCartTotals } from '../../utils/CartUtils';

const Cart = () => {
  const navigate = useNavigate();
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } = useContext(StoreContext);
  const cartItems = foodList.filter(food => quantities[food.id] > 0);
  const { subTotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);

  const EmptyCart = () => (
    <div className="text-center py-5">
      <div className="mb-4">
        <i className="bi bi-cart-x display-1 text-muted"></i>
      </div>
      <h3 className="fw-bold text-dark mb-3">Your cart is empty</h3>
      <p className="text-muted mb-4 lead">
        Looks like you haven't added any delicious food to your cart yet.
      </p>
      <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5">
        <i className="bi bi-arrow-left me-2"></i>
        Start Shopping
      </Link>
    </div>
  );

  const CartItem = ({ food }) => (
    <div 
      className="card border-0 shadow-sm mb-3 overflow-hidden"
      style={{ 
        borderRadius: '16px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
      }}
    >
      <div className="card-body p-4">
        <div className="row align-items-center">
          {/* Product Image */}
          <div className="col-md-3 col-4 mb-3 mb-md-0">
            <div className="position-relative">
              <img 
                src={food.imageUrl} 
                alt={food.name} 
                className="img-fluid rounded-3"
                style={{ 
                  height: '100px',
                  width: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              {/* Quantity Badge */}
              <span 
                className="position-absolute top-0 start-100 translate-middle badge bg-primary rounded-pill"
                style={{ fontSize: '0.75rem' }}
              >
                {quantities[food.id]}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-4 col-8 mb-3 mb-md-0">
            <h5 className="fw-bold text-dark mb-2" style={{ fontSize: '1.1rem' }}>
              {food.name}
            </h5>
            <div className="d-flex align-items-center mb-2">
              <span className="badge bg-light text-dark me-2">
                <i className="bi bi-tag me-1"></i>
                {food.category}
              </span>
              <div className="text-warning">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </div>
            </div>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
              <i className="bi bi-currency-rupee me-1"></i>
              {food.price} per item
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="col-md-3 col-6 mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center">
              <button 
                className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center me-2"
                onClick={() => decreaseQty(food.id)}
                style={{ 
                  width: '36px', 
                  height: '36px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#dc3545';
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.color = '#dc3545';
                }}
              >
                <i className="bi bi-dash"></i>
              </button>
              
              <span 
                className="fw-bold bg-light rounded-pill px-3 py-2 mx-2 text-center"
                style={{ 
                  minWidth: '50px',
                  fontSize: '1rem',
                  border: '2px solid #e9ecef'
                }}
              >
                {quantities[food.id]}
              </span>
              
              <button 
                className="btn btn-outline-success btn-sm rounded-circle d-flex align-items-center justify-content-center ms-2"
                onClick={() => increaseQty(food.id)}
                style={{ 
                  width: '36px', 
                  height: '36px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#198754';
                  e.target.style.borderColor = '#198754';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#198754';
                  e.target.style.color = '#198754';
                }}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="col-md-2 col-6 text-end">
            <div className="mb-2">
              <p className="fw-bold text-primary mb-1" style={{ fontSize: '1.2rem' }}>
                ₹{(food.price * quantities[food.id]).toFixed(2)}
              </p>
              <small className="text-muted">
                ({quantities[food.id]} × ₹{food.price})
              </small>
            </div>
            <button 
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
              onClick={() => removeFromCart(food.id)}
              style={{ transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#dc3545';
                e.target.style.borderColor = '#dc3545';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#dc3545';
                e.target.style.color = '#dc3545';
              }}
            >
              <i className="bi bi-trash3 me-1"></i>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="display-5 fw-bold text-dark mb-2">
                  <i className="bi bi-cart3 me-3 text-primary"></i>
                  Shopping Cart
                </h1>
                <p className="text-muted lead mb-0">
                  {cartItems.length > 0 
                    ? `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`
                    : 'Your cart is currently empty'
                  }
                </p>
              </div>
              {cartItems.length > 0 && (
                <Link 
                  to="/" 
                  className="btn btn-outline-primary rounded-pill px-4"
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
              )}
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="row g-4">
            {/* Cart Items */}
            <div className="col-lg-8">
              <div className="mb-4">
                {cartItems.map((food) => (
                  <CartItem key={food.id} food={food} />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
                <Link 
                  to="/" 
                  className="btn btn-outline-secondary rounded-pill px-4"
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
                
                <div className="d-flex gap-2">
                 
                  
                  <button 
                    className="btn btn-outline-danger rounded-pill px-4"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear your cart?')) {
                        cartItems.forEach(item => removeFromCart(item.id));
                      }
                    }}
                  >
                    <i className="bi bi-trash3 me-2"></i>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div className="position-sticky" style={{ top: '100px' }}>
                <div 
                  className="card border-0 shadow-lg"
                  style={{ 
                    borderRadius: '20px',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
                  }}
                >
                  <div className="card-body p-4">
                    <h5 className="fw-bold text-dark mb-4 d-flex align-items-center">
                      <i className="bi bi-receipt me-2 text-primary"></i>
                      Order Summary
                    </h5>

                    {/* Summary Items */}
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-3 pb-2">
                        <span className="text-muted">
                          <i className="bi bi-bag me-2"></i>
                          Subtotal ({cartItems.length} items)
                        </span>
                        <span className="fw-semibold">₹{subTotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3 pb-2">
                        <span className="text-muted">
                          <i className="bi bi-truck me-2"></i>
                          Delivery Fee
                        </span>
                        <span className="fw-semibold text-success">
                          {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3 pb-2">
                        <span className="text-muted">
                          <i className="bi bi-percent me-2"></i>
                          Taxes & Fees
                        </span>
                        <span className="fw-semibold">₹{tax.toFixed(2)}</span>
                      </div>

                      <hr className="my-3" style={{ borderColor: '#dee2e6' }} />
                      
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className="h5 fw-bold text-dark mb-0">Total Amount</span>
                        <span className="h4 fw-bold text-primary mb-0">₹{total.toFixed(2)}</span>
                      </div>
                    </div>

                  

                    {/* Checkout Button */}
                    <button 
                      className="btn btn-primary w-100 rounded-pill fw-bold py-3 mb-3"
                      disabled={cartItems.length === 0}
                      onClick={() => navigate('/order')}
                      style={{ 
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        background: 'linear-gradient(45deg, #0d6efd 0%, #0b5ed7 100%)'
                      }}
                      onMouseEnter={(e) => {
                        if (cartItems.length > 0) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <i className="bi bi-credit-card me-2"></i>
                      Proceed to Checkout
                    </button>

                    {/* Trust Badges */}
                    <div className="row text-center mt-4">
                      <div className="col-4">
                        <i className="bi bi-shield-check text-success fs-4 mb-1"></i>
                        <small className="d-block text-muted">Secure</small>
                      </div>
                      <div className="col-4">
                        <i className="bi bi-truck text-primary fs-4 mb-1"></i>
                        <small className="d-block text-muted">Fast Delivery</small>
                      </div>
                      <div className="col-4">
                        <i className="bi bi-flower3 text-warning fs-4 mb-1"></i>
                        <small className="d-block text-muted">Freshness Guarantee</small>
                      </div>
                    </div>

                    {/* Estimated Delivery */}
                    <div className="bg-light rounded-3 p-3 mt-3 text-center">
                      <small className="text-muted">
                        <i className="bi bi-clock me-1"></i>
                        Estimated delivery: 25-35 minutes
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;