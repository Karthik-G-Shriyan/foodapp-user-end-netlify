import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';


const MyOrders = () => {
    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
      const navigate = useNavigate();


    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/orders",
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            setData(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'preparing': return 'warning';
            case 'delivered': return 'success';
            case 'cancelled': return 'danger';
            case 'out for delivery': return 'info';
            case 'confirmed': return 'primary';
            default: return 'secondary';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'preparing': return 'fas fa-clock';
            case 'delivered': return 'fas fa-check-circle';
            case 'cancelled': return 'fas fa-times-circle';
            case 'out for delivery': return 'fas fa-truck';
            case 'confirmed': return 'fas fa-check';
            default: return 'fas fa-info-circle';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                        <div className="text-center">
                            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3 text-muted fs-5">Loading your orders...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container">
                {/* Header Section */}
                <div className="py-5 text-center">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <i className="fas fa-receipt text-primary me-3" style={{ fontSize: '2.5rem' }}></i>
                        <h1 className="fw-bold text-primary mb-0">My Orders</h1>
                    </div>
                    <p className="text-muted fs-5 mb-0">
                        Track your delicious orders and view order history
                    </p>
                </div>

                {/* Orders Section */}
                <div className="row justify-content-center pb-5">
                    <div className="col-12">
                        {data.length === 0 ? (
                            // Empty State
                            <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
                                <div className="card-body text-center py-5">
                                    <i className="fas fa-shopping-bag text-muted mb-4" style={{ fontSize: '4rem' }}></i>
                                    <h3 className="text-muted mb-3">No Orders Found</h3>
                                    <p className="text-muted">You haven't placed any orders yet. Start ordering your favorite food!</p>
                                    <button className="btn btn-primary btn-lg px-4 py-2 mt-3"
                                        onClick={() => navigate("/explore")}
                                        style={{ borderRadius: '25px' }}>
                                        <i className="fas fa-utensils me-2"></i>
                                        Start Ordering
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Orders List
                            <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
                                <div className="card-header bg-primary text-white py-4" style={{ borderRadius: '15px 15px 0 0' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="mb-0 fw-bold">
                                            <i className="fas fa-list-alt me-2"></i>
                                            Order History
                                        </h4>
                                        <button
                                            className="btn btn-light btn-sm px-3"
                                            onClick={fetchOrders}
                                            style={{ borderRadius: '20px' }}
                                        >
                                            <i className="fas fa-sync-alt me-1"></i>
                                            Refresh
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body p-0">
                                    {data.map((order, index) => (
                                        <div key={index} className="border-bottom">
                                            <div className="p-4">
                                                <div className="row align-items-center">
                                                    {/* Order Icon */}
                                                    <div className="col-auto">
                                                        <div
                                                            className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center"
                                                            style={{ width: '60px', height: '60px' }}
                                                        >
                                                            <img
                                                                src={assets.delivery}
                                                                alt="Delivery"
                                                                width="36"
                                                                height="36"
                                                                style={{ filter: 'brightness(0) saturate(100%) invert(41%) sepia(96%) saturate(1347%) hue-rotate(201deg) brightness(97%) contrast(94%)' }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Order Details */}
                                                    <div className="col">
                                                        <div className="row">
                                                            <div className="col-md-6 mb-3 mb-md-0">
                                                                <h6 className="fw-bold text-dark mb-2">
                                                                    <i className="fas fa-hashtag me-1 text-primary"></i>
                                                                    Order #{order.id || index + 1}
                                                                </h6>
                                                                <div className="text-muted small mb-2">
                                                                    {order.createdAt && (
                                                                        <>
                                                                            <i className="fas fa-calendar-alt me-1"></i>
                                                                            {formatDate(order.createdAt)}
                                                                        </>
                                                                    )}
                                                                </div>
                                                                <div className="mb-2">
                                                                    <span
                                                                        className={`badge bg-${getStatusColor(order.orderStatus)} px-3 py-2 rounded-pill`}
                                                                        style={{ fontSize: '0.85rem' }}
                                                                    >
                                                                        <i className={`${getStatusIcon(order.orderStatus)} me-1`}></i>
                                                                        {order.orderStatus}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="d-flex justify-content-md-end align-items-center mb-3">
                                                                    <div className="text-end">
                                                                        <div className="h5 fw-bold text-success mb-1">
                                                                            ₹{(order.amount / 100).toFixed(2)}
                                                                        </div>
                                                                        <div className="text-muted small">
                                                                            <i className="fas fa-box me-1"></i>
                                                                            {order.orderedItems.length} item{order.orderedItems.length > 1 ? 's' : ''}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Order Items */}
                                                        <div className="mt-3">
                                                            <div
                                                                className="bg-light p-3 rounded-3"
                                                                style={{ borderLeft: '4px solid var(--bs-primary)' }}
                                                            >
                                                                <div className="small text-muted mb-2 fw-semibold">
                                                                    <i className="fas fa-utensils me-1"></i>
                                                                    Items Ordered:
                                                                </div>
                                                                <div className="text-dark">
                                                                    {order.orderedItems.map((item, itemIndex) => (
                                                                        <span key={itemIndex} className="me-2">
                                                                            <span className="fw-semibold">{item.name}</span>
                                                                            <span className="text-primary"> ×{item.quantity}</span>
                                                                            {itemIndex < order.orderedItems.length - 1 && (
                                                                                <span className="text-muted"> • </span>
                                                                            )}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;