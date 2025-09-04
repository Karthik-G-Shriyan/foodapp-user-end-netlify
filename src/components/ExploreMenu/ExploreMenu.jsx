import React, { useRef } from 'react';
import { categories } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const styles = {
    exploreMenu: {
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: '20px',
      margin: '20px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      height: '400px',
    },
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '15px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2c3e50',
      margin: 0,
      display: 'flex',
      alignItems: 'center'
    },
    titleIcon: {
      marginRight: '15px',
      color: '#e74c3c',
      fontSize: '2.2rem'
    },
    scrollControls: {
      display: 'flex',
      gap: '10px'
    },
    scrollIcon: {
      fontSize: '32px',
      cursor: 'pointer',
      color: '#6c757d',
      transition: 'all 0.3s ease',
      padding: '8px',
      borderRadius: '50%',
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#6c757d',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center'
    },
    subtitleIcon: {
      marginRight: '8px',
      color: '#f39c12'
    },
    menuContainer: {
      position: 'relative'
    },
    menuList: {
      display: 'flex',
      gap: '25px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      padding: '10px 0',
      scrollSnapType: 'x mandatory'
    },
    menuItem: {
      textAlign: 'center',
      minWidth: '140px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      padding: '15px',
      borderRadius: '16px',
      scrollSnapAlign: 'center'
    },
    menuImage: {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      border: '3px solid transparent'
    },
    activeImage: {
      border: '4px solid #28a745',
      boxShadow: '0 6px 20px rgba(40, 167, 69, 0.3)',
      transform: 'scale(1.05)'
    },
    menuText: {
      marginTop: '12px',
      fontWeight: '600',
      color: '#495057',
      fontSize: '14px',
      transition: 'color 0.3s ease'
    },
    activeText: {
      color: '#28a745',
      fontWeight: '700'
    },
    divider: {
      margin: '30px 0',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #dee2e6, transparent)',
      border: 'none'
    }
  };

  return (
    <div style={styles.exploreMenu}>
      {/* Header */}
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>
          <i className="bi bi-grid-3x3-gap" style={styles.titleIcon}></i>
          Explore Our Menu
        </h1>
        <div style={styles.scrollControls}>
          <i
            className="bi bi-chevron-left"
            style={styles.scrollIcon}
            onClick={scrollLeft}
            onMouseEnter={(e) => {
              e.target.style.color = '#e74c3c';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#6c757d';
              e.target.style.transform = 'scale(1)';
            }}
          ></i>
          <i
            className="bi bi-chevron-right"
            style={styles.scrollIcon}
            onClick={scrollRight}
            onMouseEnter={(e) => {
              e.target.style.color = '#e74c3c';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#6c757d';
              e.target.style.transform = 'scale(1)';
            }}
          ></i>
        </div>
      </div>

      {/* Subtitle */}
      <p style={styles.subtitle}>
        <i className="bi bi-star-fill" style={styles.subtitleIcon}></i>
        Your next favorite meal is just a click away
      </p>

      {/* Menu Categories */}
      <div style={styles.menuContainer}>
        <div
          style={styles.menuList}
          ref={menuRef}
        >
          {categories.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.menuItem,
                ...(item.category === category ? { backgroundColor: 'rgba(40, 167, 69, 0.05)' } : {})
              }}
              onClick={() => setCategory(prev => prev === item.category ? 'all' : item.category)}
              onMouseEnter={(e) => {
                if (item.category !== category) {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }
              }}
              onMouseLeave={(e) => {
                if (item.category !== category) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <img
                src={item.icon}
                alt={item.category}
                className="rounded-circle"
                height={120}
                width={120}
                style={{
                  ...styles.menuImage,
                  ...(item.category === category ? styles.activeImage : {})
                }}
              />
              <p style={{
                ...styles.menuText,
                ...(item.category === category ? styles.activeText : {})
              }}>
                {item.category}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr style={styles.divider} />

      {/* Custom styles for scrollbar hiding */}
      <style jsx>{`
        .menuList::-webkit-scrollbar {
          display: none;
        }
        
        @media (max-width: 768px) {
          .title {
            font-size: 2rem !important;
          }
          .scrollControls {
            display: none !important;
          }
          .menuItem {
            min-width: 110px !important;
            padding: 10px !important;
          }
          .menuImage {
            height: 90px !important;
            width: 90px !important;
          }
          .exploreMenu {
            margin: 10px !important;
            padding: 25px 15px !important;
          }
        }
        
        @media (max-width: 576px) {
          .title {
            font-size: 1.5rem !important;
          }
          .subtitle {
            font-size: 1rem !important;
          }
          .menuItem {
            min-width: 90px !important;
          }
          .menuImage {
            height: 75px !important;
            width: 75px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ExploreMenu;