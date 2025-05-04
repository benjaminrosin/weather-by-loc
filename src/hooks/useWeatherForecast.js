/*
import { useState, useEffect } from 'react';
import axios from 'axios';

function useWeatherForecast(cityName) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);

                if (response.data && response.data.data) {
                    const countryList = Object.values(response.data.data)
                        .map(country => country.country)
                        .sort();

                    setCountries(countryList);
                } else {
                    setCountries(fallbackCountries);
                    console.warn('Invalid response format, using fallback countries');
                }
            } catch (err) {
                console.error('Error fetching countries:', err);
                setCountries(fallbackCountries);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return { countries, loading, error };
}

export default useWeatherForecast;



 */