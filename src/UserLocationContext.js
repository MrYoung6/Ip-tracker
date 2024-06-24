import React, { createContext, useState, useContext } from 'react';

const UserLocationContext = createContext();

export const useUserLocation = () => {
    return useContext(UserLocationContext);
};

export const UserLocationProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState(null);

    return (
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
            {children}
        </UserLocationContext.Provider>
    );
};
