import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/SignUp.css';

function SignUpForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

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
    if (!repeatPassword) 
    {
      newErrors.repeatPassword = true;
    } 
    else if (password !== repeatPassword) 
    {
      newErrors.repeatPassword = true;
    }
    setErrors(newErrors);
  }, [email, password, repeatPassword]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) 
      {
        localStorage.setItem("token", data.token || "brodie-token");
        alert(data.message);
      } 
      else 
      {
        alert("u not welcome g");
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <div className="signup-rules">
        <ul className="signup-rules-list" style={{margin: '8px 0 0 16px', padding: 0}}>
          <li>Email must not be empty and must contain "@"</li>
          <li>Password must be at least 6 characters</li>
          <li>Repeat password must match password</li>
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
      <h5>Repeat Password:</h5>
      <input
        type="password"
        name="repeatPassword"
        placeholder="Repeat your password"
        value={repeatPassword}
        onChange={e => setRepeatPassword(e.target.value)}
        required
      />
      <button type="submit" id="signup" disabled={!isValid}>Sign Me Up.</button>
      {!isValid && (
        <div className='signup-rules-list' style={{color: 'red'}}>
          Please fix the errors above to enable login.
        </div>
      )}
      <Link to="/login" id="signup">Wait... I have an account.</Link>
    </form>
  );
}

export default SignUpForm;
