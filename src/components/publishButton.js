import React from "react";
import "../styles/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function PublishButton() {

    return (
        <button type="submit" className="icon-button">
            <FontAwesomeIcon icon={faUpload} className="icon"/>
        </button>
    );
}

export default PublishButton;