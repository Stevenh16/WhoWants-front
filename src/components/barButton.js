import React, { useState } from "react";
import "../styles/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function BarButton() {
    const navigate = useNavigate();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        // Aquí podrías realizar acciones adicionales como limpiar el token, cerrar sesión, etc.
        localStorage.clear();
        navigate("/login"); // Redirige al login o la página deseada.
    };

    return (
        <div className="bar-button-container">
            <button className="icon-button" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faBars} className="icon" />
            </button>
            {isDropdownVisible && (
                <ul className="dropdown-menu">
                    <li onClick={handleLogout}>Cerrar Sesión</li>
                    {/* Agrega más opciones aquí */}
                </ul>
            )}
        </div>
    );
}

export default BarButton;
