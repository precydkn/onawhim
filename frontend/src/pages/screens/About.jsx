import '../../css/screens.css'
import '../../css/ReturnBtn.css'
import ReturnBtn from '../../components/ReturnBtn'

function About() {
    return <div className="screen">
        <div className="About">
            <h3>About</h3>

            <p>Life’s too short to be bored.</p>
            <p>Get fresh activities at the push of a button.</p>
            <p>Simple. Random. Fun.</p>
            <p>Try it—on a whim.</p>
            
            <div className="catgif">
                <img src="https://i.postimg.cc/PJS1r4K6/jumping-cat.gif"/>
            </div>

            <ReturnBtn 
                cn="back-btn" 
                link_to="/start"
                src_link="https://i.postimg.cc/RC6rwTtB/backbtn.png" 
                alt_name="back"
            />
        </div>
    </div>
}

export default About