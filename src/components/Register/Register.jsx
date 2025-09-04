import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service/AuthService";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {  
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success('Registration completed. Please log in');
        navigate("/login");
      } else {
        toast.error('Unable to register. Please try again');
      }
    } catch (error) {
      toast.error('Unable to register. Please try again');
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            
            {/* Register Card */}
            <div className="card shadow border-0 rounded-4">
              
              {/* Header */}
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <i className="fas fa-user-plus text-success mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="fw-bold text-dark">Create Account</h3>
                  <p className="text-muted">Join us and start ordering</p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandler}>
                  
                  {/* Full Name */}
                  <div className="mb-3 text-start">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter your full name"
                      value={data.name}
                      onChange={onchangeHandler}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3 text-start">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={data.email}
                      onChange={onchangeHandler}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4 text-start">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Create a password"
                        value={data.password}
                        onChange={onchangeHandler}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} ></i>
                      </button>
                    </div>
                    <div className="form-text text-muted small mt-2">
                      Password should be at least 6 characters long
                    </div>
                  </div>

                  {/* Register Button */}
                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>

                  {/* Login Link */}
                  <p className="text-muted">
                    Already have an account? 
                    <a href="/login" className="text-success text-decoration-none ms-1">
                      Sign In
                    </a>
                  </p>
                </form>
              </div>
            </div>

            {/* Terms Notice */}
            <div className="text-center mt-3">
              <p className="text-muted small">
                By creating an account, you agree to our 
                <a href="#" className="text-success text-decoration-none mx-1">Terms of Service</a> 
                and 
                <a href="#" className="text-success text-decoration-none ms-1">Privacy Policy</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;