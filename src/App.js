import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import AllCities from "./components/AllCities";
import {citiesReducer} from "./reducers/citiesReducer";

function App() {

    const initialCities = [
        {name: "Paris", country: "France", longitude: 2.35, latitude: 48.85, favorite: false},
        {name: "New York", country: "USA", longitude: -74.0059, latitude: 40.7128, favorite: false},
        {name: "London", country: "England", longitude: -0.1278, latitude: 51.5074, favorite: false},
        {name: "Madrid", country: "Spain", longitude: -3.6833, latitude: 40.4167, favorite: false},
        {name: "Rome", country: "Italy", longitude: 12.5, latitude: 41.9, favorite: false},
        {name: "Berlin", country: "Germany", longitude: 13.4, latitude: 52.52, favorite: false},
        {name: "Tokyo", country: "japan", longitude: 139.69, latitude: 35.68, favorite: false},
        {name: "Jerusalem", country: "Israel", longitude: 35.23, latitude: 31.78, favorite: true}
    ];

    const [cities, dispatch] = useReducer(citiesReducer, initialCities);
    const [countries, setCountries] = useState(["Israel", "USA", "England", "France", "Spain", "Italy", "Germany", "Japan"]); /*temporary!!*/
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        const storedCities = localStorage.getItem('cities');
        if (storedCities) {
            dispatch({ type: 'INITIALIZE', payload: JSON.parse(storedCities) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(cities));
    }, [cities]);

    return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout />}>
                      <Route index element={
                          <HomePage
                              cities={cities}
                              countries={countries}
                              selectedCountry={selectedCountry}
                              setSelectedCountry={setSelectedCountry}
                          />
                      } />
                      <Route path="all-cities" element={
                          <AllCities
                              cities={cities}
                              countries={countries}
                              dispatch={dispatch}
                          />
                      } />
                  </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
