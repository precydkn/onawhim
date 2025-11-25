import '../css/ActivitiesFilter.css'

function ActivitiesFilter({ filter, setFilter }) {
    return <div className="ActivitiesFilter">
        {/* set filter by div clicked */}
        <div 
            className={filter === "all" ? "current-filter" : ""}
            onClick={() => setFilter("all")}
        >
            <p>All</p>
        </div>

        <div 
            className={filter === "undone" ? "current-filter" : ""}
            onClick={() => setFilter("undone")}
        >
            <p>Side Quests</p>
        </div>

        <div 
            className={filter === "done" ? "current-filter" : ""}
            onClick={() => setFilter("done")}
        >
            <p>Achievements</p>
        </div>
    </div>
}

export default ActivitiesFilter