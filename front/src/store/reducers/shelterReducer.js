import {
    ADD_SHELTER_FAILURE,
    ADD_SHELTER_SUCCESS,
    DELETE_SHELTER_FAILURE,
    DELETE_SHELTER_SUCCESS,
    GET_SHELTERS_FAILURE,
    GET_SHELTERS_SUCCESS,
    GET_SINGLE_SHELTER_FAILURE,
    GET_SINGLE_SHELTER_SUCCESS
} from "../actionTypes";

const initialState = {
    getShelterError: null,
    deleteShelterError: null,
    addShelterError: null,
    getSingleShelterError: null,
    shelters: [],
    singleShelter: {}
};

const sheltersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SHELTERS_SUCCESS:
            return {...state, shelters: action.data, getShelterError: null};
        case GET_SHELTERS_FAILURE:
            return {...state, getShelterError: action.error};
        case ADD_SHELTER_FAILURE:
            return {...state, addShelterError: action.error};
        case DELETE_SHELTER_FAILURE:
            return {...state, deleteShelterError: action.error};
        case DELETE_SHELTER_SUCCESS:
            return {...state, deleteShelterError: null};
        case ADD_SHELTER_SUCCESS:
            return {...state, addShelterError: null};
        case GET_SINGLE_SHELTER_SUCCESS:
            return {...state, singleShelter: action.data, getSingleShelterError: null};
        case GET_SINGLE_SHELTER_FAILURE:
            return {...state, getSingleShelterError: action.error};
        default:
            return state;
    }
};

export default sheltersReducer;