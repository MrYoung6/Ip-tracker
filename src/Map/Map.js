import React, { useEffect } from 'react';
import "./Map.css";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useUserLocation } from '../UserLocationContext';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);

  return null;
};


const Map = () => {
  const { userLocation } = useUserLocation();
  const center = userLocation || [0, 0];
  console.log('userLocation:', userLocation);



  return (
    <div className='map'>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && (
          <>
            <ChangeView center={userLocation} />
            <Marker position={userLocation} >
              <Popup>
                User Location <br /> Latitude: {userLocation[0]} <br /> Longitude: {userLocation[1]}
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>

  )
}

export default Map;