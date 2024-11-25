import React from "react";
import "../styles/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

function ShareButton({donationId}) {

    const handleShare = () => {
        const url = `${window.location.origin}`;
        navigator.clipboard.writeText(url).then(() => {
            alert("Link copied to clipboard!");
        });
    };

    return (
        <button className="icon-button" onClick={handleShare}>
            <FontAwesomeIcon icon={faShare} className="icon"/>
        </button>
    );
}

export default ShareButton;