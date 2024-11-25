import React, {useState} from "react";
import "../styles/button.css";
import "../styles/commentButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import SendCommentButton from "./sendCommentButon";

function CommentButton({onSubmit}) {
    const [showInput, setShowInput] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ value: rating, comment });
        setRating(0); // Resetear rating
        setComment(""); // Resetear comentario
        setShowInput(false); // Ocultar input
    };

    return (
        <div className="comment-button-container">
            <button className="icon-button" onClick={() => setShowInput(!showInput)}><FontAwesomeIcon icon={faCommentDots} className="icon"/></button>
            {showInput && (
                <form onSubmit={handleSubmit} className="comment-form">
                    <label>
                        Stars:
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            {[0, 1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>
                                    {star}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="comment-label">
                        Comment:
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                    <SendCommentButton/>
                </form>
            )}
        </div>
    );
}

export default CommentButton;