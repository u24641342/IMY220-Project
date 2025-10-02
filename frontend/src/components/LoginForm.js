import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/SignUp.css';
import ApiService, { AuthService } from '../services/api';

function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const newErrors = {};
    if (!email)
    {
      newErrors.email = true;
    }
    else if (!email.includes("@"))
    {
      newErrors.email = true;
    }
    if (!password)
    {
      newErrors.password = true;
    }
    else if (password.length < 6)
    {
      newErrors.password = true;
    }
    setErrors(newErrors);
  }, [email, password]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid && !isLoading)
    {
      setIsLoading(true);
      try {
        const response = await ApiService.signIn({ email, password });
        
        if (response.success)
        {
          // Store authentication data
          AuthService.setToken(response.token);
          AuthService.setUser(response.user);
          alert(response.message);
          navigate('/home');
        }
      } catch (error) {
        alert(`Login failed: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <div className="signup-rules">
        <ul className="signup-rules-list">
          <li>Email must not be empty and must contain "@"</li>
          <li>Password must be at least 6 characters</li>
        </ul>
      </div>
      <h5>Email Address:</h5>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <h5>Password:</h5>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button type="submit" id="signup" disabled={!isValid || isLoading}>
        {isLoading ? 'Signing In...' : 'Get to work.'}
      </button>
      {!isValid && (
        <div className='signup-rules-list' style={{color: 'red'}}>
          Please fix the errors above to enable login.
        </div>
      )}
      <Link to="/signup" id="signup">Wait... I don't have an account.</Link>
    </form>
  );
}

export default LoginForm;
