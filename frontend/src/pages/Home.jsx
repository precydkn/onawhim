import { useEffect, useState } from 'react'
import '../css/main-wrapper.css'
import '../css/Home.css'
import GameCard from "../components/GameCard"

function Home({ setBackground }) {
    const [hoveredCard, setHoveredCard] = useState(null); // for gamecards hover styles
    const [gcMobile, setGcMobile] = useState(false); // for gamecards popup (mobile)

    const toggleGCMobile = () => setGcMobile(prev => !prev); // for toggling gamecards popup (mobile)

    /*---Resizing elements according to browser screen size---*/
    useEffect(() => {
        function scaleMainWrapper() {
            const baseWidth = 1920;
            const baseHeight = 1080;
            const wrapper = document.querySelector(".main-wrapper");

            if (!wrapper) return;

            const scale = Math.min(
                window.innerWidth / baseWidth,
                window.innerHeight / baseHeight
            );

            wrapper.style.setProperty("--base-scale", scale);
        }

        scaleMainWrapper();
        window.addEventListener("resize", scaleMainWrapper);
        return () => window.removeEventListener("resize", scaleMainWrapper);
    }, []);

    return <div className="Home">
        <div className="main-wrapper">
            {/* directs to user account */}
            <GameCard
                cn="gamecard-acc"
                link_to="/user"
                default_src="https://i.postimg.cc/vHqhqQvh/gamecard-acc.png"
                hover_src="https://i.postimg.cc/fT2C2wv5/gamecard-f-acc.png"

                dimmed_src="https://i.postimg.cc/BQYpYqCc/gamecard-dimmed-acc.png"

                bg_default="https://i.postimg.cc/fbhw6hzJ/bg-home-2.png"
                bg_hover="https://i.postimg.cc/C1jVTwH1/bg-home-dimmed.png"

                setBackground={setBackground}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                alt_name="account gamecard"
            />

            {/* directs to intro + generate */}
            <GameCard
                cn="gamecard-oaw"
                link_to="/start"
                default_src="https://i.postimg.cc/jdgcgshM/gamecard-oaw.png"
                hover_src="https://i.postimg.cc/02WnW8Ct/gamecard-f-oaw.png"

                dimmed_src="https://i.postimg.cc/9F8b8WBY/gamecard-dimmed-oaw.png"

                bg_default="https://i.postimg.cc/fbhw6hzJ/bg-home-2.png"
                bg_hover="https://i.postimg.cc/C1jVTwH1/bg-home-dimmed.png"

                setBackground={setBackground}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                alt_name="on a whim gamecard"
            />

            {/* mobile version */}
            {gcMobile && (
                <div className="gamecards-mobile-container">
                    <div className="close-gcMobile-btn" onClick={toggleGCMobile}>X</div>
                    <GameCard
                        cn="gamecard-acc mobile"
                        link_to="/user"
                        default_src="https://i.postimg.cc/vHqhqQvh/gamecard-acc.png"
                        hover_src="https://i.postimg.cc/fT2C2wv5/gamecard-f-acc.png"

                        dimmed_src="https://i.postimg.cc/BQYpYqCc/gamecard-dimmed-acc.png"

                        bg_default="https://i.postimg.cc/fbhw6hzJ/bg-home-2.png"
                        bg_hover="https://i.postimg.cc/C1jVTwH1/bg-home-dimmed.png"

                        setBackground={setBackground}
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                        alt_name="account gamecard"
                    />
                    <GameCard
                        cn="gamecard-oaw mobile"
                        link_to="/start"
                        default_src="https://i.postimg.cc/jdgcgshM/gamecard-oaw.png"
                        hover_src="https://i.postimg.cc/02WnW8Ct/gamecard-f-oaw.png"

                        dimmed_src="https://i.postimg.cc/9F8b8WBY/gamecard-dimmed-oaw.png"

                        bg_default="https://i.postimg.cc/fbhw6hzJ/bg-home-2.png"
                        bg_hover="https://i.postimg.cc/C1jVTwH1/bg-home-dimmed.png"

                        setBackground={setBackground}
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                        alt_name="on a whim gamecard"
                    />
                </div>
            )}
            
            <div className="startbtn" onClick={toggleGCMobile}></div> {/* clickable area for gamecards popup (mobile) */}
        </div>
    </div>
}

export default Home