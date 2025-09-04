import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ name, description, id, imageUrl, price }) => {

    const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div className="card h-100 shadow-sm border-0" style={{ maxWidth: "320px", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                 onMouseEnter={(e) => {
                     e.currentTarget.style.transform = "translateY(-5px)";
                     e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                 }}
                 onMouseLeave={(e) => {
                     e.currentTarget.style.transform = "translateY(0)";
                     e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                 }}>
                
                {/* Image Container with Overlay Effect */}
                <div className="position-relative overflow-hidden" style={{ borderRadius: "0.375rem 0.375rem 0 0" }}>
                    <Link to={`/food/${id}`} className="text-decoration-none">
                        <img
                            src={imageUrl}
                            className="card-img-top"
                            alt={name}
                            style={{ 
                                height: "250px",
                                width: "100%",
                                objectFit: "cover",
                                transition: "transform 0.3s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        />
                        {/* Gradient Overlay */}
                        <div className="position-absolute top-0 start-0 w-100 h-100" 
                             style={{ 
                                 background: "linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 50%)",
                                 opacity: 0,
                                 transition: "opacity 0.3s ease"
                             }}
                             onMouseEnter={(e) => e.target.style.opacity = "1"}
                             onMouseLeave={(e) => e.target.style.opacity = "0"}>
                        </div>
                    </Link>
                    
                    {/* Quick Add Badge */}
                    {quantities[id] > 0 && (
                        <div className="position-absolute top-0 end-0 m-2">
                            <span className="badge bg-success rounded-pill">
                                <i className="bi bi-cart-check me-1"></i>
                                {quantities[id]}
                            </span>
                        </div>
                    )}
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark fw-bold mb-2" style={{ fontSize: "1.1rem" }}>
                        {name}
                    </h5>
                    <p className="card-text text-muted mb-3 flex-grow-1" style={{ 
                        fontSize: "0.9rem",
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}>
                        {description}
                    </p>
                    
                    {/* Price and Rating Row */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                            <span className="h5 mb-0 text-primary fw-bold">₹{price}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="me-2">
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-fill text-warning"></i>
                                <i className="bi bi-star-half text-warning"></i>
                            </div>
                            <small className="text-muted fw-medium">(4.5)</small>
                        </div>
                    </div>
                </div>

                {/* Card Footer with Actions */}
                <div className="card-footer bg-transparent border-0 pt-0">
                    <div className="d-flex justify-content-between align-items-center gap-2">
                        <Link 
                            className="btn btn-outline-primary btn-sm rounded-pill px-3 text-decoration-none" 
                            to={`/food/${id}`}
                            style={{ transition: "all 0.3s ease" }}
                        >
                            <i className="bi bi-eye me-1"></i>
                            View Details
                        </Link>
                        
                        {quantities[id] > 0 ? (
                            <div className="d-flex align-items-center gap-2">
                                <button 
                                    className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center" 
                                    onClick={() => decreaseQty(id)}
                                    style={{ width: "32px", height: "32px", transition: "all 0.2s ease" }}
                                >
                                    <i className="bi bi-dash"></i>
                                </button>
                                <span 
                                    className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-bold" 
                                    style={{ minWidth: "40px", fontSize: "0.9rem" }}
                                >
                                    {quantities[id]}
                                </span>
                                <button 
                                    className="btn btn-outline-success btn-sm rounded-circle d-flex align-items-center justify-content-center" 
                                    onClick={() => increaseQty(id)}
                                    style={{ width: "32px", height: "32px", transition: "all 0.2s ease" }}
                                >
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>
                        ) : (
                            <button 
                                className="btn btn-success btn-sm rounded-pill px-3" 
                                onClick={() => increaseQty(id)}
                                style={{ transition: "all 0.3s ease" }}
                            >
                                <i className="bi bi-cart-plus me-1"></i>
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodItem;