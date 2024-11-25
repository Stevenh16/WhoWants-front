import React, { useEffect, useState } from "react";
import ClaimButton from "./claimButtons";
import CommentButton from "./commentButton";
import ShareButton from "./shareButton";
import '../styles/donationitem.css';

function DonationItem({ donation }) {
    const [thing, setThing] = useState(null);
    const [donor, setDonor] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [error, setError] = useState(null);
    const options = {
        weekday: 'long',   // Día de la semana completo (Lunes, Martes, etc.)
        hour: 'numeric',   // Hora en formato 12 horas
        minute: 'numeric', // Minutos
        hour12: true       // Para mostrar AM/PM
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Thing data
                const thingResponse = await fetch(`http://localhost:8080/api/v1/things/id?id=${donation.thing}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!thingResponse.ok) {
                    throw new Error("Error fetching thing data");
                }

                const thingData = await thingResponse.json();
                setThing(thingData);

                // Fetch Donor data
                const donorResponse = await fetch(`http://localhost:8080/api/v1/persons/id?id=${donation.donor}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!donorResponse.ok) {
                    throw new Error("Error fetching donor data");
                }

                const donorData = await donorResponse.json();
                setDonor(donorData);

                // Fetch Ratings with person details
                const enrichedRatings = await Promise.all(
                    donation.ratings.map(async (rating) => {
                        const personResponse = await fetch(`http://localhost:8080/api/v1/persons/id?id=${rating.person}`, {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                                "Content-Type": "application/json",
                            },
                        });

                        if (!personResponse.ok) {
                            throw new Error("Error fetching person data");
                        }

                        const personData = await personResponse.json();
                        return { ...rating, person: personData };
                    })
                );

                setRatings(enrichedRatings);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [donation]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!thing || !donor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="donation-item">
            <div className="top">
                <h2>{donor.name} ({donor.email})</h2>
                <h4>{new Date(donation.date).toLocaleString('en-EN', options)}</h4>
                <h2>{thing.name}</h2>
                <p>{thing.description}</p>
            </div>
            <div className="img-container">
                {donation.img && <img src={donation.img} alt="Donation Item" className="img" />}
            </div>
            <nav id="nav" className="responsive">
                <ul>
                    <li><ClaimButton /></li>
                    <li>
                        <CommentButton
                            onSubmit={async (newRating) => {
                                const rating = {
                                    id: null,
                                    comment: newRating.comment,
                                    stars: newRating.value,
                                    donation: donation.id,
                                    person: localStorage.getItem("id"),
                                };

                                console.log("Rating:", rating);

                                // Update ratings locally
                                const updatedRatings = [...ratings, rating];
                                setRatings(updatedRatings);

                                // Send new rating to the server
                                await fetch(`http://localhost:8080/api/v1/ratings`, {
                                    method: "POST",
                                    headers: {
                                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(rating),
                                });
                            }}
                        />
                    </li>
                    <li><ShareButton donationId={donation.id} /></li>
                </ul>
            </nav>
            {ratings.length > 0 && (
                <div className="container-comments">
                    <h4>Ratings:</h4>
                    <ul>
                        {ratings.map((rating, index) => (
                            <li key={index}>
                                [{rating.person.name}] ({rating.person.email}) : [{rating.stars}/5] "{rating.comment}"
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DonationItem;
