// citiesReducer.js
export const citiesReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return action.payload;
        /*
        case 'ADD_CITY':
            if (state.some(city => city.name === action.payload.name )) {
                return state;
            }
            return [...state, {...action.payload, isFavorite: false}];

        case 'UPDATE_CITY':
            return state.map(city =>
                city.name === action.oldCityName ? { ...action.payload, isFavorite: city.isFavorite ?? false } : city
            );
*/
        case 'SAVE_CHANGES': {
            let {name, ...rest} = action.payload;
            rest = {isFavorite: false, ...rest};
            return {...state, [name]: rest};
        }

        case 'DELETE_CITY': {
            const {[action.payload]:_, ...rest} = state;
            return rest;
        }

        case 'TOGGLE_FAVORITE':
            const city = state[action.cityName];
            const updatedCity = {...city, isFavorite: !city.isFavorite};
            return {...state, [action.cityName]: updatedCity};

        default:
            return state;
    }
};