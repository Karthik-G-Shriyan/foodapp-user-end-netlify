import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { calculateCartTotals } from '../../utils/CartUtils';
import axios from 'axios';
import { toast } from "react-toastify";
import { RAZORPAY_KEY } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        district: '',
        pincode: ''
    });

    const navigate = useNavigate();

    const { foodList, quantities, setQuantities, token } = useContext(StoreContext);

    const uniqueItemsInCart = Object.values(quantities).filter(qty => qty > 0).length;

    const cartItems = foodList.filter(food => quantities[food.id] > 0);

    const { subTotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const orderData = {
            userAddress: `${data.firstName} ${data.lastName} ${data.address} ${data.city} ${data.district} ${data.pincode}`,
            phoneNumber: data.phoneNumber,
            email: data.email,
            orderedItems: cartItems.map(item => ({
                foodId: item.foodId,
                quantity: quantities[item.id],
                price: item.price * quantities[item.id],
                category: item.category,
                imageUrl: item.imageUrl,
                description: item.description,
                name: item.name
            })),
            amount: Math.round(total * 100),
            orderStatus: "preparing"
        };

        try {
            const response = await axios.post(
                'https://online-food-application-backend-railway-app-production.up.railway.app/api/orders/create',
                orderData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.status === 201 && response.data.razorpayOrderId) {
                initiateRazorpayPayment(response.data);
            } else {
                toast.error("unable to place order.please try again");
            }

        } catch (error) {
            console.error("Error message:", error.message);
            toast.error("unable to place order.please try again");
        }
    };

    const initiateRazorpayPayment = (response) => {
        const options = {
            key: RAZORPAY_KEY,
            amount: response.amount * 100,
            currency: "INR",
            name: "FOOD RESTAURANT",
            description: "food order payment",
            order_id: response.razorpayOrderId,
            handler: async function (razorpayResponse) {
                await verifyPayment(razorpayResponse);
            },
            prefill: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                contact: data.phoneNumber
            },
            theme: { color: "#3399cc" },
            modal: {
                ondismiss: async function () {
                    toast.error("Payment cancelled.");
                    await deleteOrder(response.id);
                },
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const verifyPayment = async (razorpayResponse) => {
        const paymentData = {
            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
            razorpay_order_id: razorpayResponse.razorpay_order_id,
            razorpay_signature: razorpayResponse.razorpay_signature
        }

        try {
            const response = await axios.post('https://online-food-application-backend-railway-app-production.up.railway.app/api/orders/verify', paymentData,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (response.status === 200) {
                toast.success("payment successful");
                await clearCart();
                navigate('/myorders');
            } else {
                toast.error("payment failed. please try again");
                await deleteOrder(razorpayResponse.razorpay_order_id);
                navigate('/');
            }

        } catch (error) {
            console.log(error);
            toast.error("payment failed. please try again");
        }
    }

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete('https://online-food-application-backend-railway-app-production.up.railway.app/api/orders/' + orderId,
                { headers: { 'Authorization': `Bearer ${token}` } });
        } catch (error) {
            console.log(error);
        }
    }

    const clearCart = async () => {
        try {
            await axios.delete("https://online-food-application-backend-railway-app-production.up.railway.app/api/cart",
                { headers: { 'Authorization': `Bearer ${token}` } });
            setQuantities({});
        } catch (error) {
            toast.error("error while clearing the cart");
            console.log(error);
        }
    }

    return (
        <div className='container-fluid' style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container">
                {/* Header Section */}
                <div className="py-5 text-center">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                        <img 
                            className="me-3" 
                            src={assets.logo} 
                            alt="Restaurant Logo" 
                            width="72" 
                            height="64"
                            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                        />
                        <h1 className="fw-bold text-primary mb-0" style={{ fontSize: '2.5rem' }}>
                            Checkout
                        </h1>
                    </div>
                    <p className="text-muted fs-5 mb-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        "Good food is happiness delivered to your doorstep. Complete your order and let the feast begin!"
                    </p>
                </div>

                <div className="row g-5 pb-5">
                    {/* Cart Summary - Enhanced */}
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <div 
                            className="card shadow-lg border-0 position-sticky"
                            style={{ top: '120px', borderRadius: '15px' }}
                        >
                            <div className="card-header bg-primary text-white text-center py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                                <h4 className="mb-1 fw-bold">
                                    <i className="fas fa-shopping-cart me-2"></i>
                                    Order Summary
                                </h4>
                                <span className="badge bg-light text-primary px-3 py-2 rounded-pill">
                                    {uniqueItemsInCart} {uniqueItemsInCart === 1 ? 'Item' : 'Items'}
                                </span>
                            </div>

                            <div className="card-body p-0">
                                <div className="p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {cartItems.map(item => (
                                        <div key={item.id} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1 fw-semibold text-dark">{item.name}</h6>
                                                <small className="text-muted">
                                                    <i className="fas fa-times me-1"></i>
                                                    Qty: {quantities[item.id]}
                                                </small>
                                            </div>
                                            <div className="text-end">
                                                <span className="fw-bold text-success">
                                                    ₹{(item.price * quantities[item.id]).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown */}
                                <div className="p-3 bg-light" style={{ borderRadius: '0 0 15px 15px' }}>
                                    <div className="d-flex justify-content-between py-2">
                                        <span className="text-muted">Subtotal:</span>
                                        <span className="fw-semibold">₹{subTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between py-2">
                                        <span className="text-muted">Shipping:</span>
                                        <span className="fw-semibold">₹{shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between py-2 border-bottom">
                                        <span className="text-muted">Tax:</span>
                                        <span className="fw-semibold">₹{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between py-3">
                                        <span className="h5 fw-bold text-primary">Total:</span>
                                        <span className="h5 fw-bold text-success">₹{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Billing Address - Enhanced */}
                    <div className="col-md-7 col-lg-8">
                        <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
                            <div className="card-header bg-white py-4" style={{ borderRadius: '15px 15px 0 0' }}>
                                <h4 className="mb-0 text-primary fw-bold">
                                    <i className="fas fa-map-marker-alt me-2"></i>
                                    Delivery Information
                                </h4>
                                <p className="text-muted mb-0 mt-2">Please provide accurate delivery details</p>
                            </div>

                            <div className="card-body p-4">
                                <form className="needs-validation" onSubmit={onSubmitHandler}>
                                    <div className="row g-4">
                                        {/* Name Fields */}
                                        <div className="col-sm-6">
                                            <label htmlFor="firstName" className="form-label fw-semibold">
                                                <i className="fas fa-user me-2 text-primary"></i>
                                                First Name
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control form-control-lg border-2" 
                                                id="firstName"
                                                name='firstName' 
                                                onChange={onChangeHandler} 
                                                value={data.firstName} 
                                                required
                                                style={{ borderRadius: '10px' }}
                                            />
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="lastName" className="form-label fw-semibold">
                                                <i className="fas fa-user me-2 text-primary"></i>
                                                Last Name
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control form-control-lg border-2" 
                                                id="lastName"
                                                name='lastName' 
                                                onChange={onChangeHandler} 
                                                value={data.lastName} 
                                                required
                                                style={{ borderRadius: '10px' }}
                                            />
                                        </div>

                                        {/* Contact Fields */}
                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label fw-semibold">
                                                <i className="fas fa-envelope me-2 text-primary"></i>
                                                Email Address
                                            </label>
                                            <div className="input-group input-group-lg">
                                                <span className="input-group-text bg-primary text-white border-2" style={{ borderRadius: '10px 0 0 10px' }}>
                                                    @
                                                </span>
                                                <input
                                                    type="email"
                                                    className="form-control border-2"
                                                    id="email"
                                                    placeholder="your.email@example.com"
                                                    name="email"
                                                    onChange={onChangeHandler}
                                                    value={data.email}
                                                    required
                                                    style={{ borderRadius: '0 10px 10px 0' }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="mobile" className="form-label fw-semibold">
                                                <i className="fas fa-phone me-2 text-primary"></i>
                                                Mobile Number
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control form-control-lg border-2"
                                                id="mobile"
                                                placeholder="10-digit mobile number"
                                                name="phoneNumber"
                                                onChange={onChangeHandler}
                                                value={data.phoneNumber}
                                                pattern="[0-9]{10}"
                                                maxLength="10"
                                                required
                                                style={{ borderRadius: '10px' }}
                                            />
                                        </div>

                                        {/* Address Fields */}
                                        <div className="col-12">
                                            <label htmlFor="address" className="form-label fw-semibold">
                                                <i className="fas fa-home me-2 text-primary"></i>
                                                Full Address
                                            </label>
                                            <textarea
                                                className="form-control form-control-lg border-2"
                                                id="address"
                                                placeholder="House/Flat No., Street, Landmark"
                                                value={data.address}
                                                name='address'
                                                onChange={onChangeHandler}
                                                required
                                                rows="3"
                                                style={{ borderRadius: '10px', resize: 'vertical' }}
                                            />
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="city" className="form-label fw-semibold">
                                                <i className="fas fa-city me-2 text-primary"></i>
                                                City
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control form-control-lg border-2" 
                                                id="city"
                                                name='city' 
                                                onChange={onChangeHandler} 
                                                value={data.city} 
                                                required
                                                style={{ borderRadius: '10px' }}
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="district" className="form-label fw-semibold">
                                                <i className="fas fa-map me-2 text-primary"></i>
                                                District
                                            </label>
                                            <select 
                                                className="form-select form-select-lg border-2" 
                                                id="district" 
                                                onChange={onChangeHandler}
                                                name='district' 
                                                value={data.district} 
                                                required
                                                style={{ borderRadius: '10px' }}
                                            >
                                                <option value="">Select District...</option>
                                                <option>Bengaluru Urban</option>
                                                <option>Bengaluru North</option>
                                                <option>Bengaluru South</option>
                                                <option>Bengaluru Rural</option>
                                                <option>Ramanagara</option>
                                            </select>
                                        </div>

                                        <div className="col-md-2">
                                            <label htmlFor="pincode" className="form-label fw-semibold">
                                                <i className="fas fa-map-pin me-2 text-primary"></i>
                                                Pincode
                                            </label>
                                            <input 
                                                type="number" 
                                                className="form-control form-control-lg border-2" 
                                                id="pincode"
                                                value={data.pincode} 
                                                onChange={onChangeHandler} 
                                                name='pincode' 
                                                required
                                                style={{ borderRadius: '10px' }}
                                                maxLength="6"
                                            />
                                        </div>
                                    </div>

                                    <hr className="my-5" style={{ border: '2px solid #e9ecef' }} />

                                    <div className="text-center">
                                        <button 
                                            className="btn btn-primary btn-lg px-5 py-3" 
                                            type="submit" 
                                            disabled={cartItems.length === 0}
                                            style={{ 
                                                borderRadius: '25px',
                                                fontSize: '1.1rem',
                                                fontWeight: '600',
                                                boxShadow: '0 6px 20px rgba(51, 153, 204, 0.3)',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                                            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                                        >
                                            <i className="fas fa-credit-card me-2"></i>
                                            {cartItems.length === 0 ? 'Cart is Empty' : 'Proceed to Payment'}
                                        </button>
                                        {cartItems.length === 0 && (
                                            <p className="text-muted mt-3 mb-0">
                                                <i className="fas fa-info-circle me-1"></i>
                                                Add items to your cart to continue
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;