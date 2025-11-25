import { Link } from "react-router-dom"
import { useState } from "react"

function GameCard({
    cn, link_to, default_src, alt_name,
    hover_src, dimmed_src,
    bg_default, bg_hover, setBackground,
    hoveredCard, setHoveredCard
}) {
    const [isHoveringSelf, setIsHoveringSelf] = useState(false); // for gamecards hovering

    let imgToShow = default_src; // for setting which image should be shown currently

    // setting images on hover
    if (isHoveringSelf) {
        imgToShow = hover_src;
    } else if (hoveredCard && hoveredCard !== cn) {
        imgToShow = dimmed_src;
    }

    return <div
        className={cn}
        onMouseEnter={() => {
            setIsHoveringSelf(true);
            setHoveredCard(cn);
            setBackground(bg_hover);
        }}
        onMouseLeave={() => {
            setIsHoveringSelf(false);
            setHoveredCard(null);
            setBackground(bg_default);
        }}
        onClick={() => {
            setIsHoveringSelf(false);
            setHoveredCard(null);
            setBackground(bg_default)
        }}
    >
        <Link to={link_to}>
            <img
                src={imgToShow}
                alt={alt_name}
            />
        </Link>
    </div>
}

export default GameCard