import React, { useEffect, useState, useCallback } from 'react';
import "./Header.css";
import { useUserLocation } from '../UserLocationContext';
import FadeLoader from "react-spinners/FadeLoader";


const Header = () => {

    const apiKey = 'at_qSuppOXKFV5I2yopTF1YIv9kNybiW';
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const { setUserLocation } = useUserLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchMyInfo = useCallback(async (ipAddress = '') => {
        setIsLoading(true);
        setError(null)
        const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${ipAddress ? `&ipAddress=${ipAddress}` : ''}`;

        try {


            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();

            if (!data) {
                throw new Error('Empty response from API');
            }

            console.log('API response data:', data);
            setUserLocation([data.location.lat, data.location.lng]);
            setSearchResults(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }

    },[apiKey, setUserLocation]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchMyInfo();
            },
            (error) => {
                console.error('Error getting geolocation:', error);
                fetchMyInfo(); // Fetch user location using IP data
            }

        );
    }, [fetchMyInfo]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(setSearchTerm);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!searchTerm) return;
        const fetchSearchInfo = async (term) => {
            setIsLoading(true);
            setError(null);
            const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&${/^\d+\.\d+\.\d+\.\d+$/.test(term) ? `ipAddress=${term}` : `domain=${term}`}`;
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();

                if (!data) {
                    throw new Error('Empty response from API');
                }

                console.log('API response data:', data);
                setSearchResults(data);
                setUserLocation([data.location.lat, data.location.lng]);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }

        };
        fetchSearchInfo(searchTerm);
    };


    return (
        <div className='head'>
            <h1>IP Address Tracker</h1>
            <div className='ip-section'>
                <form onSubmit={handleSubmit}>
                    <input type="search"
                        className="search"
                        onChange={handleChange}
                        placeholder='Search for any IP address or domain'></input>
                    <button className='search-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" /></svg>
                    </button>
                </form>
            </div>
            {isLoading && !searchResults && (
                <div className="loader-container">
                    <FadeLoader
                    color="white"
                    size={60}
                    />
                </div>
                    )}
            {searchResults && (
                <div className='results'>
                    <div className='section-info'>
                        <p className='section-title'>Ip Address</p>
                        <h2 className='section-h'>{searchResults.ip}</h2>
                    </div>
                    <div className='section-info'>
                        <p className='section-title'>Location</p>
                        <h2 className='section-h'>{`${searchResults?.location?.city}, ${searchResults?.location?.region} `}</h2>
                    </div>
                    <div className='section-info'>
                        <p className='section-title'>Timezone</p>
                        <h2 className='section-h'>UTC {searchResults?.location?.timezone}</h2>
                    </div>
                    <div className='section-info'>
                        <p className='section-title'>ISP</p>
                        <h2 className='section-h isp'>{searchResults.isp}</h2>
                    </div>
                </div>
            )}
            {error && <p className="error-message">{error}. Please try again</p>}
        </div>
    )

}

export default Header;