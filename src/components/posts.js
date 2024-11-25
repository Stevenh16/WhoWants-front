import React, { useState, useEffect } from "react";
import DonationList from "./donationList"; // Importa tu componente DonationList

function Publicaciones() {
    const [donations, setDonations] = useState([]); // Estado para las donaciones
    const [loading, setLoading] = useState(true); // Estado para la carga

    useEffect(() => {
        // Llamada al backend para obtener donaciones
        fetch("http://localhost:8080/api/v1/donations", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setDonations(data); // Almacena las donaciones en el estado
            setLoading(false); // Cambia el estado de carga
        })
        .catch((error) => {
            console.error("Error fetching donations:", error);
        });
    }, []); // Se ejecuta solo al montar el componente

    
    if (loading) {
        return <p>Loading...</p>; // Muestra un mensaje mientras carga
    }

    return (
        <div>
            <DonationList donations={donations} /> {/* Renderiza la lista */}
        </div>
    );
}

export default Publicaciones;

