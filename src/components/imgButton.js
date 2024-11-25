import React, { useState } from "react";
import "../styles/imgbutton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function ImgButton({setImg}) {
    const [preview, setPreview] = useState(null); // Estado para almacenar la previsualización

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImg(reader.result); // Enviar la imagen como base64
            reader.readAsDataURL(file);
            setPreview(URL.createObjectURL(file)); // Crea una URL de la imagen seleccionada
        }
    };

    return (
        <div className="container-input">
            <input
                type="file"
                name="file-5"
                id="file-5"
                className="inputfile inputfile-5"
                accept="image/*"
                onChange={handleFileChange}
            />
            <label htmlFor="file-5">
                <FontAwesomeIcon icon={faImage} className="icon" />
            </label>
            {preview && (
                <div>
                    <img src={preview} alt="Preview" className="preview-image"/>
                </div>
            )}
        </div>
    );
}

export default ImgButton;
