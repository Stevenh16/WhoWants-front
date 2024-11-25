import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../styles/searchbar.css";

function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        if (searchText.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchText)}`);
        }
    };

    return (
        <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearch} />
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Redirige al presionar Enter
                className="search-input"
            />
        </div>
    );
}

export default SearchBar;
