import React, { useContext, useState } from "react";
import { login } from "../../service/AuthService";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, loadCartItems } = useContext(StoreContext);

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await login(data);
      if (response.status === 200) {
        setToken(response.data.token);
        sessionStorage.setItem('token', response.data.token);
        await loadCartItems(response.data.token);
        toast.success('Login successful! Welcome back!');
        navigate("/");
      } else {
        toast.error('invalid username or password. please try again..!');
      }
    } catch (error) {
      console.log('Error while logging in', error);
      toast.error('Unable to login. Please check your credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            
            {/* Login Card */}
            <div className="card shadow border-0 rounded-4">
              
              {/* Header */}
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <i className="fas fa-user-circle text-primary mb-3" style={{ fontSize: '3rem' }}></i>
                  <h3 className="fw-bold text-dark">Welcome Back</h3>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandler}>
                  
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
                  <div className="mb-3 text-start">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
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
                  </div>

                 

                  {/* Login Button */}
                  <div className="d-grid mb-4 mt-5">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <p className="text-muted">
                    Don't have an account? 
                    <a href="/register" className="text-primary text-decoration-none ms-1">
                      Create Account
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;