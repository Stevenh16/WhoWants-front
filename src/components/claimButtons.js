import React from "react";
import "../styles/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ClaimButton() {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("");
    };

    return (
        <button className="icon-button" onClick={handleNavigation}>
            <FontAwesomeIcon icon={faHandHoldingHeart} className="icon"/>
        </button>
    );
}

export default ClaimButton;