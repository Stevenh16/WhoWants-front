import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "../styles/topostbar.css"; 
import ImgButton from "./imgButton";
import PublishButton from "./publishButton";

function ToPostBar() {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [img, setImg] = useState(null); // Imagen cargada

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Crear el thing
        const thingResponse = await fetch(`http://localhost:8080/api/v1/things`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: null,
                name: title,
                description: comment,
            }),
        });

        if (!thingResponse.ok) {
            throw new Error("Error creating thing");
        }

        const thing = await thingResponse.json();
        console.log(thing);

        const donorId = localStorage.getItem("id");
        if (!donorId) {
            alert("Donor ID is missing. Please log in again.");
            return;
        }
        if (!thing.id) {
            alert("Failed to create thing. Please try again.");
            return;
        }
        // Construir el objeto DonationDto
        const donationData = {
            id: null, // Esto puede ser generado por el backend
            date: new Date().toISOString(), // Fecha actual
            img, // Imagen cargada
            donor: donorId, // Cambia según la lógica de tu aplicación
            beneficiary: null,
            thing: String(thing.id), // Representa el título y comentario
            ratings: [] // Inicialmente vacío
        };
        // Enviar datos al backend
        try {
            const response = await fetch("http://localhost:8080/api/v1/donations", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donationData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Donation created:", result);
                alert("Donation created successfully!");
            } else {
                console.error("Error creating donation:", response.statusText);
                alert("Failed to create donation. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <div>
            <form className = "bar" onSubmit={handleSubmit}>
                <FontAwesomeIcon icon={faPenToSquare} className = "icon"/>
                <input
                    type="text"
                    placeholder="Title: "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="title"
                />
                <div className="hr"/>
                <input 
                    type = "text" 
                    placeholder= "Comment:"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="comment"
                />
                <ImgButton setImg = {setImg}/>
                <PublishButton/>
            </form>
        </div>
    );
}

export default ToPostBar;