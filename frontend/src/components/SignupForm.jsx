import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../api/script'
import { loginUser } from '../api/script'
import { UserContext } from '../contexts/UserContext'
import '../css/LoginSignup.css'

function SignupForm({ setToggleForm }) {
    const { login } = useContext(UserContext); // retrieve login function
    const navigate = useNavigate(); // for redirect
    const [email, setEmail] = useState(''); // for email input
    const [password, setPassword] = useState(''); // for password input
    const [signupMessage, setSignupMessage] = useState(''); // for message at the bottom of screen
    const [showPassword, setShowPassword] = useState(false); // for un/hiding password input

    /*---Submit func---*/
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. signup first
        const signupResult = await signupUser(email, password);

        if (!signupResult.ok) {
            setSignupMessage(signupResult.data?.error || 'Signup failed');
            return;
        }

        // 2. automatically login after successful signup and redirect to Activities
        const loginResult = await loginUser(email, password);

        if (loginResult.ok) {
            setSignupMessage('Signup and login successful!');
            
            // wait 1.5 seconds to show the message before redirecting to Activities
            setTimeout(() => {
                login(loginResult.data); // store user in context
                setEmail('');
                setPassword('');
                navigate('/user/activities');
            }, 1500);
        } else {
            setSignupMessage('Signup successful, but login failed: ' + (loginResult.data?.error || 'Unknown error'));
        }
    };
    /*---*/

    return <div className="Signup">
        <div className="form-container signup">
            <form onSubmit={handleSubmit} id="signupForm">
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "🔒" : "🔓"}
                </button>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>

            <p>
                Already have an account?
                <button type="button" className="link-btn" onClick={() => setToggleForm(true)}>Login</button>
            </p>

            {signupMessage && <p id="errorMessage">{signupMessage}</p>}
        </div>
    </div>
}

export default SignupForm