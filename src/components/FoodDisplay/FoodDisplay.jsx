import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, searchText }) => {

  const { foodList } = useContext(StoreContext);

  const filteredFoods = foodList.filter(food => (
    (category === "all" || food.category === category) &&
    food.name.toLowerCase().includes(searchText.toLowerCase())
  ));

  

        return (
          <div
            style={{
              padding: '30px 20px',
              backgroundColor: '#f8f9fa',
              minHeight: '60vh',
              borderRadius: '20px',
              margin: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}
          >

            {/* Header Section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px',
                flexWrap: 'wrap',
                gap: '15px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2
                  style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#2c3e50',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <i
                    className="bi bi-grid-3x3-gap-fill"
                    style={{ marginRight: '10px', color: '#e74c3c' }}
                  ></i>
                  {category === 'all' ? 'All Foods' : category}
                </h2>
                {filteredFoods.length > 0 && (
                  <span
                    style={{
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    {filteredFoods.length} item{filteredFoods.length !== 1 ? 's' : ''} found
                  </span>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  flexWrap: 'wrap'
                }}
              >
        


              </div>
            </div>
            <div className="container">
              <div className="row">
                {filteredFoods.length > 0 ? (
                  filteredFoods.map((food, index) => (
                    <FoodItem key={index}
                      name={food.name}
                      description={food.description}
                      id={food.id}
                      imageUrl={food.imageUrl}
                      price={food.price} />

                  ))
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '60px 20px',
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{ fontSize: '4rem', color: '#dee2e6', marginBottom: '20px' }}>
                      <i className="bi bi-search"></i>
                    </div>
                    <h4
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#6c757d',
                        marginBottom: '10px'
                      }}
                    >
                      No Foods Found
                    </h4>
                    <p style={{ color: '#adb5bd', fontSize: '1rem' }}>
                      {searchText
                        ? `No results found for "${searchText}" in ${category === 'all' ? 'all categories' : category}`
                        : `No items available in ${category === 'all' ? 'this category' : category}`
                      }
                    </p>
                    <button
                      className="btn btn-outline-primary mt-3"
                      onClick={() => window.location.reload()}
                      style={{ borderRadius: '20px', padding: '10px 20px' }}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>
                      Refresh
                    </button>
                  </div>
                )
                }
              </div>
            </div>
          </div>
        );
    };

    export default FoodDisplay;
