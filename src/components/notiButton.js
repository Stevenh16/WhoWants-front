import React from "react";
import "../styles/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function NotiButton() {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("");
    };

    return (
        <button className="icon-button" onClick={handleNavigation}>
            <FontAwesomeIcon icon={faBell} className="icon"/>
        </button>
    );
}

export default NotiButton;