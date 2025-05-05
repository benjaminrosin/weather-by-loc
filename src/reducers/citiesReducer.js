export const citiesReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return action.payload;

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