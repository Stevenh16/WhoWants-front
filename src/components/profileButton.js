import React from "react";
import "../styles/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/me");
    };

    return (
        <button className="icon-button" onClick={handleNavigation}>
            <FontAwesomeIcon icon={faUser} className="icon" />
        </button>
    );
}

export default ProfileButton;