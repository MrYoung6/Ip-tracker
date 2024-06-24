import React from 'react';
import { UserLocationProvider } from './UserLocationContext';
import Header from './Header/Header';
import Map from './Map/Map';
import './App.css';

function App() {
  return (
    <UserLocationProvider>
      <div className="App">
        <Header />
        <Map />
      </div>
    </UserLocationProvider>
  );
}

export default App;
