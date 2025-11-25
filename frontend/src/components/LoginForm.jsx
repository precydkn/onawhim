import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/script'
import { UserContext } from '../contexts/UserContext'
import '../css/LoginSignup.css'

function LoginForm({ setToggleForm }) {
    const { login } = useContext(UserContext); // retrieve login function
    const navigate = useNavigate(); // for redirect
    const [email, setEmail] = useState(''); // for email input
    const [password, setPassword] = useState(''); // for passworrd input
    const [errorMessage, setErrorMessage] = useState(''); // for message at the bottom of screen
    const [showPassword, setShowPassword] = useState(false); // for un/hiding password input

    /*---Submit func---*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser(email, password); // get user input

        if (result.ok) {
            setErrorMessage('Login successful!');
            
            // wait 1.5 seconds to show the message before redirecting to Activities
            setTimeout(() => {
                login(result.data); // store user in context
                navigate('/user/activities');
            }, 1500);
        } else {
            setErrorMessage(result.data?.error || "Login failed");
        }
    }
    /*---*/

    return <div className="Login">
        <div className="form-container login">
            <form onSubmit={handleSubmit} id="loginForm">
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
                    <button type="submit">Log In</button>
                </div>
            </form>

            <p>
                Don’t have an account?
                <button type="button" className="link-btn" onClick={() => setToggleForm(false)}>Sign up</button>
            </p>

            {errorMessage && <p id="errorMessage">{errorMessage}</p>}
        </div>
    </div>
}

export default LoginForm