// citiesReducer.js
export const citiesReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return action.payload;

        case 'ADD_CITY':
            if (state.some(city => city.name === action.payload.name )) {
                return state;
            }
            return [...state, {...action.payload, favorite: false}];

        case 'UPDATE_CITY':
            return state.map(city =>
                city.name === action.oldCityName ? { ...action.payload, favorite: city.favorite ?? false } : city
            );

        case 'DELETE_CITY':
            return state.filter(city => city.name !== action.name);

        case 'TOGGLE_FAVORITE':
            return state.map(city =>
                city.name === action.name ? { ...city, favorite: !city.favorite ?? false } : city
            );

        default:
            return state;
    }
};