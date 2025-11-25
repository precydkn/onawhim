import { useEffect, useState } from 'react'
import '../../css/screens.css'
import '../../css/ReturnBtn.css'
import TitleScreen from './Title'
import NavBtn from '../../components/NavBtn'
import ReturnBtn from "../../components/ReturnBtn"

function User() {
    const [displayUser, setDisplayUser] = useState(false); // for tracking if its the first load of page to display titlescreen
    
    // track if titlescreen was shown already
    const [showTitle, setShowTitle] = useState(() => {
        return !localStorage.getItem("startTitleShown");
    });

    /*---Titlescreen display---*/
    useEffect(() => {
        // if from Home, show title screen first; otherwise skip title screen
        if (showTitle) {
            const timer = setTimeout(() => {
                setDisplayUser(true);
                setShowTitle(false);
                localStorage.setItem("startTitleShown", "true");
            }, 2000);

            return () => clearTimeout(timer);
        } else {
            setDisplayUser(true);
        }
    }, [showTitle]);
    /*---*/

    return <div className="screen">
        {showTitle && !displayUser && <TitleScreen htext="On A Whim" h2text="User" c2="user" />}

            {displayUser && (
                <div className="User">
                    <div className="h">
                        <h1>On A Whim</h1>
                        <h2>User</h2>
                    </div>

                    <div className="nav">
                        <NavBtn link_to="/user/account" navbtn_name="Account" />
                        <NavBtn link_to="/user/activities" navbtn_name="Activities" />
                    </div>

                </div>
            )}
            
            <ReturnBtn 
                cn="home-btn" 
                link_to="/"
                src_link="https://i.postimg.cc/ZYBk6LNm/homebtn2.png" 
                alt_name="home"
                resetTitle={true}
            />
    </div>
}

export default User