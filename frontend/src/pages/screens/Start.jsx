import { useEffect, useState } from 'react'
import '../../css/screens.css'
import '../../css/ReturnBtn.css'
import TitleScreen from './Title'
import NavBtn from '../../components/NavBtn'
import ReturnBtn from "../../components/ReturnBtn"

function Start() {
    const [displayStart, setDisplayStart] = useState(false); // for tracking if its the first load of page to display titlescreen

    // track if titlescreen was shown already
    const [showTitle, setShowTitle] = useState(() => {
        return !localStorage.getItem("startTitleShown");
    });

    /*---Titlescreen display---*/
    useEffect(() => {
        // if from Home, show title screen first; otherwise skip title screen
        if (showTitle) {
            const timer = setTimeout(() => {
                setDisplayStart(true);
                setShowTitle(false);
                localStorage.setItem("startTitleShown", "true");
            }, 2000);

            return () => clearTimeout(timer);
        } else {
            setDisplayStart(true);
        }
    }, [showTitle]);
    /*---*/

    return <div className="screen">
        {showTitle && !displayStart && <TitleScreen htext="On A Whim" />} {/* display titlescreen every first load of page */}

        {/* dont display titlescreen after */}
        {displayStart && (
            <div className="Start">
                <div className="h">
                    <h1>On A Whim</h1>
                </div>
                <div className="nav">
                    <NavBtn link_to="/start/about" navbtn_name="About" />
                    <NavBtn link_to="/start/generate" navbtn_name="Generate" />
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

export default Start