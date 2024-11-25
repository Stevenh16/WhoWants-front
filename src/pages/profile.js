import React, {useState, useEffect}from "react";
import DonationList from "../components/donationList";
import ProfileButton from '../components/profileButton';
import NotiButton from '../components/notiButton';
import BarButton from '../components/barButton';
import SearchBar from '../components/searchBar';
import '../styles/profile.css';
function Profile() {
    const [person, setPerson] = useState(null);
    const [donations, SetDonations] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para la carga

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch person data
                const personResponse = await fetch(`http://localhost:8080/api/v1/persons/id?id=${localStorage.getItem("id")}`, {
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
                setPerson(personData);
    
                // Fetch donations data
                const donationsResponse = await fetch(`http://localhost:8080/api/v1/donations/personId?personId=${localStorage.getItem("id")}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    },
                });
    
                if (!donationsResponse.ok) {
                    throw new Error("Error fetching donations data");
                }
                const donationsData = await donationsResponse.json();
                SetDonations(donationsData);
    
                setLoading(false);
            } catch (err) {
                console.error(err.message);
                setLoading(false); // Asegúrate de detener el estado de carga en caso de error
            }
        };
    
        fetchData();
    }, []); // Añadir dependencias si es necesario
    

    if(loading){
        return <div>loading...</div>
    }

    return (
        <div>
            <header>
                <div id = "left" className='left'>
                    <h1>WHO WANTS?</h1>
                    <div id="searchBar" className="searchBar">
                        <SearchBar/>
                    </div>
                </div>
                <nav id="nav" class="responsive">
                    <ul>
                        <li><NotiButton/></li>
                        <li><ProfileButton/></li>
                        <li><BarButton/></li>
                    </ul>
                </nav>
            </header>
            <div className="profile-data-container">
            {person ? (
                <div className="profile-data">
                    <h2>Name: </h2><p>{person.name}</p>
                    <h4>Email: </h4><p>{person.email}</p>
                </div>
            ) : (
                <p>Loading person data...</p>
            )}
            </div>
            <DonationList donations={donations || []} />
        </div>
    );
}

export default Profile;
