import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import '../css/main-wrapper.css'
import Start from './screens/Start'
import User from './screens/User'
import About from './screens/About'
import Generate from './screens/Generate'
import Account from './screens/Account'
import Activities from './screens/Activities'

function Zoom() {
    const [zoomed, setZoomed] = useState(false); // for zooming screen
    const location = useLocation(); // for directing to diff pages

    /*---Resizing elements according to browser screen size---*/
    useEffect(() => {
        function scaleMainWrapper() {
            const baseWidth = 1920;
            const baseHeight = 1080;
            const wrapper = document.querySelector(".main-wrapper");

            if (!wrapper) return; // safety check

            const scale = Math.min(
                window.innerWidth / baseWidth,
                window.innerHeight / baseHeight
            );

            wrapper.style.setProperty("--base-scale", scale);
        }

        // Run once on mount
        scaleMainWrapper();

        // Add event listener
        window.addEventListener("resize", scaleMainWrapper);

        // Cleanup on unmount
        return () => window.removeEventListener("resize", scaleMainWrapper);
    }, []);
    /*---*/

    /*---Zoom after delay---*/
    useEffect(() => {
        const timer = setTimeout(() => {
            setZoomed(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
    /*---*/

    return <div className="Zoom">
        <div className={`main-wrapper ${zoomed ? "zoomed" : ""}`}> {/* add 'zoomed' class if setZoomed(true) */}
            {location.pathname === "/start" && <Start />}
            {location.pathname === "/user" && <User />}
            {location.pathname === "/start/about" && <About />}
            {location.pathname === "/start/generate" && <Generate />}
            {location.pathname === "/user/account" && <Account />}
            {location.pathname === "/user/activities" && <Activities />}
        </div>
    </div>
}

export default Zoom