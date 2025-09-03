import React from 'react';
import { Link } from 'react-router-dom';
import "./SignUp.css";
import LoginForm from '../components/LoginForm';

function Login() {
  React.useEffect(() => {
    document.body.style.backgroundImage = "url('/assets/images/BNS.png')";
    document.body.style.backgroundSize = "cover";
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);
    return (
        <div className="container">
            <div><img id="logospot" src={'/assets/images/logo.png'} width="50" height="40" /></div>
            <div>
                <h2 className="wordbox" style={{ fontSize: '40px'}}>
                    Welcome<br/>back.
                </h2>
            </div>
            <div className="inner-container">
                <h1 id="bigname">Git<br/>Gud</h1>
                <LoginForm />
            </div>
            <div>
                <h2 className="wordbox" style={{ fontSize: '40px'}}>
                    Got work<br/>to do?
                </h2>
            </div>
        </div>
    );
}
        
export default Login;