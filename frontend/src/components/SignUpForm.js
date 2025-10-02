import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/SignUp.css';
import ApiService, { AuthService } from '../services/api';

function SignUpForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [skills, setSkills] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const newErrors = {};
    if (!name.trim())
    {
      newErrors.name = true;
    }
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
    if (!repeatPassword)
    {
      newErrors.repeatPassword = true;
    }
    else if (password !== repeatPassword)
    {
      newErrors.repeatPassword = true;
    }
    setErrors(newErrors);
  }, [name, email, password, repeatPassword]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid && !isLoading)
    {
      setIsLoading(true);
      try {
        const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        
        const userData = {
          name: name.trim(),
          email: email.trim(),
          password,
          bio: bio.trim(),
          skills: skillsArray
        };

        const response = await ApiService.signUp(userData);
        
        if (response.success)
        {
          // Store user data and redirect
          AuthService.setUser(response.user);
          alert(response.message);
          navigate('/home');
        }
      } catch (error) {
        alert(`Signup failed: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <div className="signup-rules">
        <ul className="signup-rules-list" style={{margin: '8px 0 0 16px', padding: 0}}>
          <li>Name must not be empty</li>
          <li>Email must not be empty and must contain "@"</li>
          <li>Password must be at least 6 characters</li>
          <li>Repeat password must match password</li>
        </ul>
      </div>
      
      <h5>Full Name:</h5>
      <input
        type="text"
        name="name"
        placeholder="Enter your full name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      
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
      
      <h5>Repeat Password:</h5>
      <input
        type="password"
        name="repeatPassword"
        placeholder="Repeat your password"
        value={repeatPassword}
        onChange={e => setRepeatPassword(e.target.value)}
        required
      />
      
      <h5>Bio (Optional):</h5>
      <textarea
        name="bio"
        placeholder="Tell us about yourself..."
        value={bio}
        onChange={e => setBio(e.target.value)}
        rows={3}
        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
      />
      
      <h5>Skills (Optional):</h5>
      <input
        type="text"
        name="skills"
        placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js)"
        value={skills}
        onChange={e => setSkills(e.target.value)}
      />
      
      <button type="submit" id="signup" disabled={!isValid || isLoading}>
        {isLoading ? 'Creating Account...' : 'Sign Me Up.'}
      </button>
      
      {!isValid && (
        <div className='signup-rules-list' style={{color: 'red'}}>
          Please fix the errors above to enable signup.
        </div>
      )}
      
      <Link to="/login" id="signup">Wait... I have an account.</Link>
    </form>
  );
}

export default SignUpForm;
