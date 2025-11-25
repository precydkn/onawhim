import { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import '../../css/screens.css'
import '../../css/Activities.css'
import '../../css/ReturnBtn.css'
import ReturnBtn from '../../components/ReturnBtn'
import ActivitiesFilter from '../../components/ActivitiesFilter'

function Activities() {
    const { user, activities, toggleActivityStatus, deleteActivity } = useContext(UserContext); // retrieve functions related to user
    const [filter, setFilter] = useState("all"); // for displaying activities; default is all
    const [deleteConfirmation, setDeleteConfirmation] = useState(false); // for delete act popup
    const [activityToDelete, setActivityToDelete] = useState(null);  // store activity to delete

    // toggle delete act popup (for delete-btn and No btn)
    const toggleDeletePopup = (activityId = null) => {
        if (activityId) {
            setActivityToDelete(activityId);
        }
        setDeleteConfirmation(prev => !prev);
    };

    // filter activities based on filter state
    const filteredActs = activities.filter(act => {
        if (filter === "all") return true;
        if (filter === "undone") return act.status === "undone";
        if (filter === "done") return act.status === "done";
        return true;
    })

    return <div className="screen">
        <div className="Activities">
            <h3>Activities</h3>

            <ActivitiesFilter filter={filter} setFilter={setFilter} />

            <div className="activities-container">
                {/* if user has no activities, display text; else display activities list */}
                {filteredActs.length === 0 ? (
                    <p className="no-acts-text">
                        {/* if user is not logged in tell user to log in; else just show no acts yet */}
                        { !user 
                            ? `No activities yet. Log in to add activities.` 
                            : "No activities yet."
                        }
                    </p>
                ) : (
                    <ul>
                        {filteredActs.map(act => (
                            <li key={act._id || act.name}>
                                <input 
                                    type="checkbox" 
                                    checked={act.status === "done"} 
                                    onChange={() => toggleActivityStatus(act._id)} 
                                />
                                <span className={act.status === "done" ? "done-text" : ""}>
                                    {act.name}
                                </span>
                                <button 
                                    className="delete-btn"
                                    onClick={() => toggleDeletePopup(act._id)}
                                >
                                    🗑
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* show the confirmation popup only if deleteConfirmation is true */}
            {deleteConfirmation && activityToDelete && (
                <div className="delete-confirmation-container">
                    <p>Delete Activity</p>
                    <p>Are you sure you want to delete this activity?</p>
                    <div className="confirm-btns">
                        <button onClick={toggleDeletePopup}>No</button>
                        <button onClick={() => {
                            deleteActivity(activityToDelete);
                            toggleDeletePopup();
                        }}>
                            Yes
                        </button>
                    </div>
                </div>
            )}

            <ReturnBtn 
                cn="back-btn" 
                link_to="/user"
                src_link="https://i.postimg.cc/RC6rwTtB/backbtn.png" 
                alt_name="back"
            />
        </div>

        {/* only show generate btn if user is logged in */}
        {user && <ReturnBtn 
            cn="to-gen-btn"
            link_to="/start/generate"
            src_link="https://i.postimg.cc/g2R9nBfG/genactsbtn.png"
            alt_name="generate"
            state={{ from: "activities" }}
        />}
    </div>
}

export default Activities