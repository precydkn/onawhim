import { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import '../../css/screens.css'
import '../../css/Account.css'
import '../../css/ReturnBtn.css'
import LoginForm from '../../components/LoginForm'
import SignupForm from '../../components/SignupForm'
import ReturnBtn from "../../components/ReturnBtn"

function Account() {
    const { user, logout, deleteUser } = useContext(UserContext); // retrieve functions related to user
    const [toggleForm, setToggleForm] = useState(true); // for toggling between login/signup forms
    const [deleteAccPopup, setDeleteAccPopup] = useState(); // for delete acc popup
    const [userToDelete, setUserToDelete] = useState(null);  // store activity to delete

    // toggle delete acc popup (for delete-btn and Nevermind btn)
    const toggleDeletePopup = (userId = null) => {
        if (userId) {
            setUserToDelete(userId);
        }
        setDeleteAccPopup(prev => !prev);
    };

    return <div className="screen Account">
        {user ? <h3>Account</h3> : ""} {/* only display heading if user is logged in */}
        
        {/* if user is logged in, display user email + logout btn; else display login form */}
        {user ? (
            <div className="user-info-container">
                <div className="user-email-container">
                    <p>{user?.email}</p>
                </div>
                <div className="btns-container">
                    <button className="delete-acc-btn" onClick={() => toggleDeletePopup(user._id)}>Delete Account</button>
                    <button className="logout-btn" onClick={logout}>Log out</button>
                </div>
                <div className="user-gif">
                    <img src="https://i.postimg.cc/TPNBTZCr/user-gif.gif" />
                </div>

                {/* show the popup when btn is clicked */}
                {deleteAccPopup && (
                    <div className="delete-acc-popup">
                        <p>Delete Account</p>
                        <p>Deleting your account result in losing your profile and all of your saved activities. This cannot be undone.</p>
                        <div className="confirm-btns">
                            <button onClick={toggleDeletePopup}>Nevermind</button>
                            <button 
                                onClick={() => {
                                    deleteUser(userToDelete);
                                    toggleDeletePopup();
                                }}
                            >
                                Farewell
                            </button>
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="LoginSignup">
                <div className="h">
                    <h1>On A Whim</h1>
                    <h2>User</h2>
                </div>

                {/* toggle between login/signup */}
                {toggleForm ? (
                    <LoginForm setToggleForm={setToggleForm} />
                ) : (
                    <SignupForm setToggleForm={setToggleForm} />
                )}
            </div>
        )}

        <ReturnBtn 
            cn="back-btn" 
            link_to="/user"
            src_link="https://i.postimg.cc/RC6rwTtB/backbtn.png" 
            alt_name="back"
        />
    </div>
}

export default Account