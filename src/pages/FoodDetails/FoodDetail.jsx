import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFoodDetails } from '../../service/FoodService';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const FoodDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const { increaseQty, quantities } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const loadFoodDetails = async () => {
      try {
        setLoading(true);
        const foodData = await fetchFoodDetails(id);
        setData(foodData);
      } catch (error) {
        console.error("Error fetching food details:", error);
        toast.error('Error while fetching the details');
      } finally {
        setLoading(false);
      }
    };

    loadFoodDetails();
  }, [id]);

  const addToCart = () => {
    increaseQty(data.id);
    toast.success(`${data.name} added to cart!`);
    navigate("/cart");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading food details...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container px-4 px-lg-5 my-5">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <button 
                className="btn btn-link p-0 text-decoration-none" 
                onClick={handleGoBack}
              >
                <i className="bi bi-arrow-left me-1"></i>
                Back
              </button>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {data.name}
            </li>
          </ol>
        </nav>

        <div className="card shadow-lg border-0 overflow-hidden">
          <div className="row g-0">
            {/* Image Section */}
            <div className="col-lg-6 position-relative">
              <div className="ratio ratio-1x1 position-relative overflow-hidden">
                {imageLoading && (
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading image...</span>
                    </div>
                  </div>
                )}
                <img
                  className="w-100 h-100 object-fit-cover"
                  src={data.imageUrl}
                  alt={data.name || 'Food Image'}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                  style={{ 
                    transition: 'transform 0.3s ease',
                    display: imageLoading ? 'none' : 'block'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                
                {/* Quantity Badge */}
                {quantities[data.id] > 0 && (
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-success rounded-pill fs-6 px-3 py-2">
                      <i className="bi bi-cart-check me-1"></i>
                      {quantities[data.id]} in cart
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="col-lg-6">
              <div className="card-body p-4 p-lg-5 h-100 d-flex flex-column">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">
                    <i className="bi bi-tag me-1"></i>
                    {data.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="display-6 fw-bold text-dark mb-3">
                  {data.name}
                </h1>

                {/* Rating Section */}
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-half text-warning"></i>
                  </div>
                  <span className="text-muted">(4.5/5 - 124 reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="h2 text-primary fw-bold">
                    ₹{data.price}
                  </span>
                  <span className="text-muted ms-2">(inclusive of all taxes)</span>
                </div>

                {/* Description */}
                <div className="mb-4 flex-grow-1">
                  <h5 className="fw-bold text-dark mb-2">Description</h5>
                  <p className="text-muted lh-lg" style={{ fontSize: '1.1rem' }}>
                    {data.description}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="row mb-4">
                  <div className="col-6">
                    <div className="d-flex align-items-center text-muted">
                      <i className="bi bi-clock me-2 text-primary"></i>
                      <span>15-20 mins</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 mt-auto">
                  <button 
                    className="btn btn-primary flex-fill py-3 fw-bold rounded-pill"
                    type="button" 
                    onClick={addToCart}
                    style={{ 
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <i className="bi bi-cart-plus me-2"></i>
                    Add to Cart
                  </button>
                  
                </div>

              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default FoodDetail;