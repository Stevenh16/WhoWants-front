import React from "react";
import "../styles/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function SendCommentButton() {

    return (
        <button type="submit" className="icon-button">
           <FontAwesomeIcon icon={faPaperPlane} className="icon"/>
        </button>
    );
}

export default SendCommentButton;