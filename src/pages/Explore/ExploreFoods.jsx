import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const ExploreFoods = () => {
  const [category, setCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'grid' },
    { value: 'pizza', label: 'Pizza', icon: 'circle' },
    { value: 'burger', label: 'Burger', icon: 'record-circle' },
    { value: 'french-fries', label: 'French Fries', icon: 'list' },
    { value: 'rolls', label: 'Rolls', icon: 'circle-fill' },
    { value: 'sandwich', label: 'Sandwich', icon: 'layers' },
    { value: 'salad', label: 'Salad', icon: 'flower1' },
    { value: 'pasta', label: 'Pasta', icon: 'bezier' },
    { value: 'biriyani', label: 'Biriyani', icon: 'bowl' },
    { value: 'rice', label: 'Rice', icon: 'droplet' },
    { value: 'cake', label: 'Cake', icon: 'gift' },
    { value: 'icecream', label: 'Ice Cream', icon: 'snow' },
    { value: 'juice', label: 'Juice', icon: 'cup-straw' },
    { value: 'beverages', label: 'Beverages', icon: 'cup-hot' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality handled by parent component
  };

  const clearFilters = () => {
    setCategory('all');
    setSearchText('');
  };

  return (
    <div className="py-5 bg-light">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Explore Delicious Foods
          </h1>
          <p className="lead text-muted mb-0">
            Discover your favorite dishes from our wide variety of cuisines
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4">
                <form onSubmit={handleSearch}>
                  {/* Mobile-First Responsive Layout */}
                  <div className="row g-3 align-items-end">
                    {/* Category Select */}
                    <div className="col-md-4">
                      <label htmlFor="categorySelect" className="form-label fw-semibold text-dark mb-2">
                        <i className="bi bi-funnel me-1"></i>
                        Category
                      </label>
                      <select 
                        id="categorySelect"
                        className="form-select rounded-3 border-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ 
                          fontSize: '0.95rem',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                        }}
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search Input */}
                    <div className="col-md-6">
                      <label htmlFor="searchInput" className="form-label fw-semibold text-dark mb-2">
                        <i className="bi bi-search me-1"></i>
                        Search Food
                      </label>
                      <div className="position-relative">
                        <input 
                          id="searchInput"
                          type="text" 
                          className="form-control rounded-3 border-2 pe-5" 
                          placeholder="Search your favorite food..." 
                          onChange={(e) => setSearchText(e.target.value)} 
                          value={searchText}
                          style={{ 
                            fontSize: '0.95rem',
                            paddingLeft: '1rem',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                          }}
                        />
                        {searchText && (
                          <button
                            type="button"
                            className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-1"
                            onClick={() => setSearchText('')}
                            style={{ fontSize: '0.8rem' }}
                          >
                            <i className="bi bi-x-lg text-muted"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="col-md-2">
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-primary rounded-3 flex-fill"
                          type="submit"
                          style={{ 
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(13, 110, 253, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          <i className="bi bi-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(category !== 'all' || searchText) && (
          <div className="row justify-content-center mb-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-center flex-wrap gap-2">
                <span className="text-muted fw-medium">Active filters:</span>
                
                {category !== 'all' && (
                  <span className="badge bg-primary rounded-pill px-3 py-2">
                    <i className="bi bi-funnel me-1"></i>
                    {categories.find(c => c.value === category)?.label}
                    <button
                      className="btn btn-link btn-sm text-white p-0 ms-2"
                      onClick={() => setCategory('all')}
                      style={{ fontSize: '0.7rem' }}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </span>
                )}
                
                {searchText && (
                  <span className="badge bg-success rounded-pill px-3 py-2">
                    <i className="bi bi-search me-1"></i>
                    "{searchText}"
                    <button
                      className="btn btn-link btn-sm text-white p-0 ms-2"
                      onClick={() => setSearchText('')}
                      style={{ fontSize: '0.7rem' }}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="row">
          <div className="col-12">
            <FoodDisplay category={category} searchText={searchText} />
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="d-md-none">
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3">
          <button
            className="btn btn-primary rounded-pill shadow-lg px-4 py-2"
            data-bs-toggle="modal"
            data-bs-target="#mobileFilterModal"
          >
            <i className="bi bi-sliders me-2"></i>
            Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreFoods;