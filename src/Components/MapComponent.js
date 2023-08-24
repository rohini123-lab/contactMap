import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import pin from "../Assets/img/marker-icon.png";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        setCountriesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching COVID-19 data:", error);
      });
  }, []);

  const customIcon = new L.Icon({
    iconUrl: pin,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Container sx={{ py: 2 }} maxWidth="md">
      <Typography variant="h4">Map</Typography>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {countriesData.map((country) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <p>Total Cases: {country.cases}</p>
                <p>Total Deaths: {country.deaths}</p>
                <p>Total Recovered: {country.recovered}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
};

export default MapComponent;
