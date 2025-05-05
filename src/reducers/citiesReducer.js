/**
 * Reducer function to manage city state, including saving, deleting, and toggling favorites.
 *
 * @param {Object} state - The current state object, with city names as keys and city data as values.
 * @param {Object} action - The action to perform on the state.
 * @param {string} action.type - The type of action to execute.
 * @param {Object} [action.payload] - The payload for actions like SAVE_CHANGES or DELETE_CITY.
 * @param {string} [action.cityName] - The name of the city to toggle in TOGGLE_FAVORITE.
 * @returns {Object} The updated state after applying the action.
 */
export const citiesReducer = (state, action) => {
    switch (action.type) {
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