import { useLocation } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import '../../css/screens.css'
import '../../css/Generate.css'
import '../../css/ReturnBtn.css'
import ReturnBtn from '../../components/ReturnBtn'

function Generate() {
    const { addActivity, user } = useContext(UserContext); // retrieve functions related to user
    
    // for backbtn redirecting
    const location = useLocation();
    const cameFrom = location.state?.from;
    const backPath = cameFrom === "activities" ? "/user/activities" : "/start";

    const [screen, setScreen] = useState("select"); // default screen is select then -> loading -> display
    const [actType, setActType] = useState(null); // so user will select an act type
    const [activity, setActivity] = useState(""); // for displaying generated act
    const [showWarning, setShowWarning] = useState(false); // for message when act type is not selected

    /*---Add activity---*/
    const handleAdd = () => {
        if (!user) {
            alert("You must be logged in to add activities.");
            return;
        }
        if (!activity) return;
        addActivity(activity);
    }

    const handleSelectType = (type) => setActType(type); // for selecting act type

    /*---Generate activity---*/
    const generateActivity = () => {
        // display message when act type isnt selected
        if (!actType) {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 1200);
            return;
        }

        setScreen("loading"); // display loading screen

        // fetch activity from api
        fetch(`https://onawhim-backend.onrender.com/api/activity?type=${actType}`)
        .then(res => res.json())
        .then(data => {
            const generatedAct= data[Math.floor(Math.random() * data.length)]?.activity;
            setActivity(generatedAct|| "Couldn't fetch an activity.");
            setScreen("display");
        })
        .catch(() => {
            setActivity("Error fetching activity.");
            setScreen("display");
        })
    }
    /*---*/

    /*---Generate activity again (same type)---*/
    const generateAgain = () => generateActivity();

    return <div className="screen">
        <div className="Generate">

            {/* Select screen*/}
            {screen === "select" && (
                <div className="select-type-screen">
                    <p>Select a type of activity before generating.</p>

                    <div className="act-types">
                        <div className="ltypes">
                            {["busywork", "charity", "cooking", "education"].map(t => (
                                <div 
                                    key={t}
                                    id={t}
                                    className={actType === t ? "typeselected" : ""}
                                    onClick={() => handleSelectType(t)}
                                >
                                    <p>{t}</p>
                                    <img src="https://i.postimg.cc/pTZTx2kN/backarrow.png" />
                                </div>
                            ))}
                        </div>

                        <div className="rtypes">
                            {["recreational", "relaxation", "social"].map(t => (
                                <div 
                                    key={t}
                                    id={t}
                                    className={actType === t ? "typeselected" : ""}
                                    onClick={() => handleSelectType(t)}
                                >
                                    <p>{t}</p>
                                    <img src="https://i.postimg.cc/pTZTx2kN/backarrow.png" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="getbtn" onClick={generateActivity}>
                        <p>Get Activity</p>
                    </div>

                    {showWarning && (<div className="warningMsg">
                        <p>Please select a type first!</p>
                    </div>)}
                </div>
            )}

            {/* Loading screen */}
            {screen === "loading" && (
                <div className="loading-screen">
                    <img src="https://i.postimg.cc/kMQXBP8B/loading-cat.gif" />
                    <p>Generating activity...</p>
                </div>
            )}

            {/* Display screen */}
            {screen === "display" && (
                <div className="display-act-screen">
                    <div className="activity-type">
                        <p>Activity type: {actType}</p>
                    </div>

                    <div>
                        <p className="activity-text">{activity}</p>
                    </div>

                    <div className="actbtns">
                        <button className="addbtn" onClick={handleAdd} disabled={!activity || activity.includes("Couldn't")}>
                            Add
                        </button>

                        <button className="retrybtn" onClick={generateAgain}>
                            Again
                        </button>
                    </div>
                </div>
            )}

            <ReturnBtn 
                cn="back-btn"
                link_to={backPath}
                src_link="https://i.postimg.cc/RC6rwTtB/backbtn.png"
                alt_name="back"
            />
        </div>
    </div>
}

export default Generate