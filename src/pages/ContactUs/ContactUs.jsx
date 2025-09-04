import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    
    // Show success message (you can integrate with toast notification)
    alert('Thank you! Your message has been sent successfully.');
  };

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
              <p className="lead mb-0">
                Have questions about our food or services? We'd love to hear from you.
                Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 h-100" style={{ borderRadius: '20px' }}>
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-dark mb-2">Send us a Message</h2>
                    <p className="text-muted">Fill out the form below and we'll get back to you within 24 hours</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      {/* Name Fields */}
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label fw-semibold text-dark">
                          <i className="bi bi-person me-2 text-primary"></i>
                          First Name *
                        </label>
                        <input 
                          type="text" 
                          className="form-control border-2"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          style={{ 
                            borderRadius: '12px', 
                            padding: '12px 16px',
                            fontSize: '1rem',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0d6efd';
                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.25)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#dee2e6';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="John"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label fw-semibold text-dark">
                          <i className="bi bi-person me-2 text-primary"></i>
                          Last Name *
                        </label>
                        <input 
                          type="text" 
                          className="form-control border-2"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          style={{ 
                            borderRadius: '12px', 
                            padding: '12px 16px',
                            fontSize: '1rem',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0d6efd';
                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.25)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#dee2e6';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Doe"
                        />
                      </div>

                      {/* Contact Fields */}
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label fw-semibold text-dark">
                          <i className="bi bi-envelope me-2 text-primary"></i>
                          Email Address *
                        </label>
                        <input 
                          type="email" 
                          className="form-control border-2"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{ 
                            borderRadius: '12px', 
                            padding: '12px 16px',
                            fontSize: '1rem',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0d6efd';
                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.25)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#dee2e6';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label fw-semibold text-dark">
                          <i className="bi bi-telephone me-2 text-primary"></i>
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          className="form-control border-2"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{ 
                            borderRadius: '12px', 
                            padding: '12px 16px',
                            fontSize: '1rem',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0d6efd';
                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.25)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#dee2e6';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      {/* Subject */}
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label fw-semibold text-dark">
                          <i className="bi bi-chat-text me-2 text-primary"></i>
                          Subject *
                        </label>
                        <select 
                          className="form-select border-2"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          style={{ 
                            borderRadius: '12px', 
                            padding: '12px 16px',
                            fontSize: '1rem',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0d6efd';
                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.25)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#dee2e6';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="order">Order Issue</option>
                          <option value="feedback">Feedback</option>
                          <option value="delivery">Delivery Issue</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div className="col-12">
                        <label htmlFor="message" className="form-label fw-semibold text-dark">
                          <i className="bi bi-chat-square-text me-2 text-primary"></i>
                          Your Message *
                        </label>
                        <textarea 
                          className="form-control border-2" 
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          style={{ 
                            borderRadius: '12px', 
                            padding: '16px',
                            fontSize: '1rem',
                            resize: 'vertical',
                            minHeight: '120px',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0d6efd';
                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.25)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#dee2e6';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Please describe your message in detail..."
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <div className="col-12">
                        <button 
                          className="btn btn-primary w-100 fw-bold rounded-pill"
                          type="submit"
                          disabled={isSubmitting}
                          style={{ 
                            padding: '14px 0',
                            fontSize: '1.1rem',
                            transition: 'all 0.3s ease',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSubmitting) {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.3)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-2"></i>
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="card shadow-lg border-0 h-100" style={{ borderRadius: '20px' }}>
                <div className="card-body p-4">
                  <h3 className="fw-bold text-dark mb-4 text-center">Contact Information</h3>
                  
                  {/* Contact Details */}
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-shrink-0 me-3">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                          <i className="bi bi-geo-alt-fill text-white"></i>
                        </div>
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1">Address</h6>
                        <p className="text-muted mb-0 small">
                          123 Food Street, Cuisine District<br />
                          Bengaluru, Karnataka 560001
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-shrink-0 me-3">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                          <i className="bi bi-telephone-fill text-white"></i>
                        </div>
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1">Phone</h6>
                        <p className="text-muted mb-0 small">+91 12345 67890</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-shrink-0 me-3">
                        <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                          <i className="bi bi-envelope-fill text-white"></i>
                        </div>
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1">Email</h6>
                        <p className="text-muted mb-0 small">support@foodapp.com</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                          <i className="bi bi-clock-fill text-white"></i>
                        </div>
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1">Business Hours</h6>
                        <p className="text-muted mb-0 small">
                          Mon - Sun: 9:00 AM - 11:00 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="text-center mt-4 pt-4 border-top">
                    <h6 className="fw-bold text-dark mb-3">Follow Us</h6>
                    <div className="d-flex justify-content-center gap-3">
                      <a href="#" className="btn btn-outline-primary rounded-circle" style={{ width: '45px', height: '45px' }}>
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="#" className="btn btn-outline-danger rounded-circle" style={{ width: '45px', height: '45px' }}>
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="#" className="btn btn-outline-info rounded-circle" style={{ width: '45px', height: '45px' }}>
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="#" className="btn btn-outline-success rounded-circle" style={{ width: '45px', height: '45px' }}>
                        <i className="bi bi-whatsapp"></i>
                      </a>
                    </div>
                  </div>

                  {/* Quick Response Promise */}
                  <div className="bg-light rounded-3 p-3 mt-4 text-center">
                    <i className="bi bi-lightning-charge-fill text-warning fs-2 mb-2"></i>
                    <h6 className="fw-bold text-dark mb-1">Quick Response</h6>
                    <small className="text-muted">We typically respond within 24 hours</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;