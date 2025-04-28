import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useState} from "react";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";

function App() {
    const [cities, setCities] = useState([
        {name: "Paris", country: "France", longitude: 2.35, latitude: 48.85},
        {name: "New York", country: "USA", longitude: -74.0059, latitude: 40.7128},
        {name: "London", country: "England", longitude: -0.1278, latitude: 51.5074},
        {name: "Madrid", country: "Spain", longitude: -3.6833, latitude: 40.4167},
        {name: "Rome", country: "Italy", longitude: 12.5, latitude: 41.9},
        {name: "Berlin", country: "Germany", longitude: 13.4, latitude: 52.52},
        {name: "Tokyo", country: "japan", longitude: 139.69, latitude: 35.68},
        {name: "Jerusalem", country: "Israel", longitude: 35.23, latitude: 31.78}
    ]);

    const [countries, setCountries] = useState(["Israel", "USA", "England", "France", "Spain", "Italy", "Germany", "Japan"]); /*temporary!!*/
    const [selectedCountry, setSelectedCountry] = useState('');


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
                  </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
