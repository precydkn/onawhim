import { useEffect, useState } from 'react'
import '../../css/Title.css'

function TitleScreen({htext, h2text, c2}) {
    const [displayTitleScreen, setDisplayTitleScreen] = useState(true);

    /*---Hide titlescreen after delay---*/
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayTitleScreen(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!displayTitleScreen) return null;
    /*---*/

    return <div className={`TitleScreen ${c2}`}>
        <img src="https://i.postimg.cc/9fZGgsLP/bg-titlescreen.png" />
        <h1>{htext}</h1>
        <h2>{h2text}</h2>
    </div>
}

export default TitleScreen