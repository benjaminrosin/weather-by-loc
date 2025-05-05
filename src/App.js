import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import AboutPage from "./components/AboutPage";
import AllCities from "./components/AllCities";
import NotFoundPage from "./components/NotFoundPage";
import {citiesReducer} from "./reducers/citiesReducer";
import useLocalStorageReducer from "./hooks/useLocalStorageReducer";

/**
 * Main application component that sets up routing and manages global state.
 *
 * @component
 * @returns {JSX.Element} Application with routing configuration
 */
function App() {

    const INITIAL_CITIES = [
        {name: "Paris", country: "France", longitude: 2.35, latitude: 48.85, isFavorite: false},
        {name: "New York", country: "USA", longitude: -74.0059, latitude: 40.7128, isFavorite: false},
        {name: "London", country: "England", longitude: -0.1278, latitude: 51.5074, isFavorite: true},
        {name: "Madrid", country: "Spain", longitude: -3.6833, latitude: 40.4167, isFavorite: false},
        {name: "Rome", country: "Italy", longitude: 12.5, latitude: 41.9, isFavorite: true},
        {name: "Berlin", country: "Germany", longitude: 13.4, latitude: 52.52, isFavorite: false},
        {name: "Tokyo", country: "japan", longitude: 139.69, latitude: 35.68, isFavorite: false},
        {name: "Jerusalem", country: "Israel", longitude: 35.23, latitude: 31.78, isFavorite: true}
    ];

    const COUNTRIES = ["Israel", "USA", "England", "France", "Spain", "Italy", "Germany", "Japan"];

    const [countries, setCountries] = useState([]); /*temporary!!*/
    const [selectedCountry, setSelectedCountry] = useState('');
    const[cities, dispatch] = useLocalStorageReducer('cities', citiesReducer, Object.fromEntries(INITIAL_CITIES
        .map(({name, ...rest})=> [name, rest])));

    useEffect(() => {
        setCountries(COUNTRIES);
        //here we can add a dynamic country list from server
    }, []);

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
                      <Route path="about" element={
                          <AboutPage/>
                      } />
                      <Route path="*" element={
                          <NotFoundPage/>
                      } />
                  </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
