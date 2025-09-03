import React from 'react';
import { Link } from 'react-router-dom';
import "./SignUp.css";
import SignUpForm from '../components/SignUpForm';

function SignUp() {
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
                    Control<br/>your<br/>code.
                </h2>
            </div>
            <div className="inner-container">
                <h1 id="bigname">Git<br/>Gud</h1>
                <SignUpForm />
            </div>
            <div>
                <h2 className="wordbox" style={{ fontSize: '40px'}}>
                    Control<br/>your<br/>time.
                </h2>
            </div>
        </div>
    );
}
        
export default SignUp;