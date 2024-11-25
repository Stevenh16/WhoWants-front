import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DonationItem from "../components/donationItem";

function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    const [donations, setDonations] = useState([]);
    const [persons, setPersons] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const donationsResponse = await fetch(`http://localhost:8080/api/v1/donations/thingName?thingName=${query}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                });

                const personsResponse = await fetch(`http://localhost:8080/api/v1/persons/name?name=${query}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!donationsResponse.ok || !personsResponse.ok) {
                    throw new Error("Error fetching search results");
                }

                setDonations(await donationsResponse.json());
                setPersons(await personsResponse.json());
            } catch (err) {
                setError(err.message);
            }
        };

        fetchResults();
    }, [query]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            <div>
                <h2>Donations</h2>
                {donations.length > 0 ? (
                    <ul>
                        {donations.map((donation) => (
                            <li key={donation.id}>
                                <DonationItem key={donation.id} donation={donation} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No donations found.</p>
                )}
            </div>
            <div>
                <h2>Persons</h2>
                {persons.length > 0 ? (
                    <ul>
                        {persons.map((person) => (
                            <li key={person.id}>
                                <h3>{person.name}</h3>
                                <p>{person.email}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No persons found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
