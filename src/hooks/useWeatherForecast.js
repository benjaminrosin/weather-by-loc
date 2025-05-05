import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook that fetches and returns weather forecast data for a given location.
 *
 * @param {number} lat - Latitude of the location
 * @param {number} lon - Longitude of the location
 * @returns {Object} Object containing forecast data, loading state, and error state
 * @returns {Array} returns.forecast - Array of daily weather forecast objects
 * @returns {boolean} returns.loading - Loading state indicator
 * @returns {Object|null} returns.error - Error object if request failed, null otherwise
 */
function useWeatherForecast(lat, lon) {
    const [forecast, setForecast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    const weatherIconMap = {
        clear: 'sun',
        pcloudy: 'cloud-sun',
        mcloudy: 'cloud-sun',
        cloudy: 'cloud',
        humid: 'moisture',
        lightrain: 'cloud-rain',
        oshower: 'cloud-rain',
        ishower: 'cloud-drizzle',
        lightsnow: 'cloud-snow',
        rain: 'cloud-rain-heavy',
        snow: 'snowflake',
        rainsnow: 'cloud-snow',
    };

    const parseDate = (yyyymmdd) => {
        const year = parseInt(yyyymmdd.toString().slice(0, 4));
        const month = parseInt(yyyymmdd.toString().slice(4, 6)) - 1;
        const day = parseInt(yyyymmdd.toString().slice(6, 8));
        return new Date(year, month, day);
    };

    useEffect(() => {
        let isCancelled = false;

        const fetchForecast = async () => {
            if(isCancelled){
                return;
            }
            setIsLoading(true);
            try {
                const res = await axios.get(
                    `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`
                );

                const data = res.data?.dataseries;

                if(!isCancelled){
                    const formatted = data.map(day => ({
                        date: parseDate(day.date),
                        weather: day.weather,
                        icon: weatherIconMap[day.weather] || 'question',
                        tempMin: day.temp2m.min,
                        tempMax: day.temp2m.max,
                        wind: day.wind10m_max
                    }));

                    setForecast(formatted);
                    setIsError(null);
                }

            } catch (err) {
                if (!isCancelled) {
                    setIsError(err);
                    setForecast([]);
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchForecast();

        return () => {
            isCancelled = true;
        };
    }, [lat, lon]);

    return { forecast, loading: isLoading, error: isError };
}

export default useWeatherForecast;
