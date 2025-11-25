import { Link } from "react-router-dom"
import '../css/NavBtn.css'

function NavBtn({navbtn_name, link_to}) {
    return <div className="NavBtn">
        <img src="https://i.postimg.cc/vB2ftLn2/forwardarrow.png" />
        <Link to={link_to} className="NavBtnLink">{navbtn_name}</Link>
        <img src="https://i.postimg.cc/pTZTx2kN/backarrow.png" />
    </div>
}

export default NavBtn