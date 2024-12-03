import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'; 
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css'; 
import { useParams } from 'react-router-dom';
import Styles from './Leaflet.module.css';

const MapComponent = () => {
  let position = [12.85864747594246, 74.83975521716955]; // Default position
  const { restaurantName } = useParams();

  if (restaurantName === 'McDonalds') {
    position = [12.85864747594246, 74.83975521716955];
  } else if (restaurantName === 'Papajohns') {
    position = [38.99357203829018, -122.24487923316534];
  } else if (restaurantName === 'KFC') {
    position = [12.974359769854841, 74.86455277259924];
  } else if (restaurantName === 'Texas') {
    position = [10.946975085610967, 106.82468873119947];
  } else if (restaurantName === 'Burger King') {
    position = [10.805543848737097, 106.73747900046214];
  } else if (restaurantName === 'Shaurma') {
    position = [40.374779426875676, 49.832023179306766];
  }

  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              height: "50vh", 
              width: "95%", 
              margin: "0 auto",
              borderRadius: "12px", 
              backgroundColor: "lightblue", 
            }}
            className="MapContainer"
          >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <strong>{restaurantName}</strong>
          </Popup>
          <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
            {restaurantName} South London
          </Tooltip>
        </Marker>
        <div className={Styles.container}>
          <h1>{restaurantName}</h1>
          <h2>South London</h2>
          <h3>Tooley St, London Bridge, London SE1 2TF,United Kingdom</h3>
          <span>Phone number</span>
          <h4>+934443-43</h4>
          <span>Website</span>
          <h4>http://{restaurantName}.uk/</h4>
        </div>
      </MapContainer>
    </>
  );
};

export default MapComponent;
