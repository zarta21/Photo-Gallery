import React from "react";
import { faInstagram, faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Social = () => {

    return (
        <div className="social">
            <a style={{display: "table-cell"}} href = "https://www.instagram.com" target = "_blank" 
rel = "noopener noreferrer">
                <FontAwesomeIcon className="fab fa-instagram" icon={faInstagram} />
            </a>
            <a style={{display: "table-cell"}} href = "https://www.facebook.com" target = "_blank" 
rel = "noopener noreferrer">
                <FontAwesomeIcon className="fab fa-facebook-square" icon={faFacebookSquare} />
            </a>
        </div>
    )
}

export default Social;