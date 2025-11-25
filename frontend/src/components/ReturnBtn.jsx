import { Link } from "react-router-dom"
import '../css/ReturnBtn.css'

function ReturnBtn({ cn, link_to, src_link, alt_name, state, resetTitle }) {
    // make tracker forget the titlescreen was shown if user went to Home
    const handleClick = () => {
        if (resetTitle) {
            localStorage.removeItem("startTitleShown")
            localStorage.removeItem("userTitleShown")
        }
    }

    return <div className={`ReturnBtn ${cn}`} onClick={handleClick}>
        <Link to={link_to} state={state}><img src={src_link} alt={alt_name} /></Link>
    </div>
}

export default ReturnBtn