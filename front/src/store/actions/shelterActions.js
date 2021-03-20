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

import axios from "../../axiosApi";
import {push} from "connected-react-router";

const addShelterSuccess = (data) => {
    return {type: ADD_SHELTER_SUCCESS, data};
};

const addShelterFailure = error => {
    return {type: ADD_SHELTER_FAILURE, error};
};

const deleteShelterSuccess = id => {
    return {type: DELETE_SHELTER_SUCCESS, id};
};

const deleteShelterFailure = error => {
    return {type: DELETE_SHELTER_FAILURE, error};
};

const getSheltersSuccess = data => {
    return {type: GET_SHELTERS_SUCCESS, data};
};

const getSheltersFailure = error => {
    return {type: GET_SHELTERS_FAILURE, error};
};

const getSingleShelterSuccess = data => {
    return {type: GET_SINGLE_SHELTER_SUCCESS, data};
};

const getSingleShelterFailure = error => {
    return {type: GET_SINGLE_SHELTER_FAILURE, error};
};

export const getShelters = () => {
    return async dispatch => {
        try {
            const response = await axios.get("/shelters");
            dispatch(getSheltersSuccess(response.data));
        } catch (e) {
            dispatch(getSheltersFailure(e));
        }
    }
};

export const addShelter = data => {
    return async dispatch => {
        try {
            const response = await axios.post("/shelters", data);
            dispatch(addShelterSuccess(response.data));
            dispatch(push("/"));
        } catch (e) {
            dispatch(addShelterFailure(e));
        }
    }
};

export const deleteShelter = id => {
    return async dispatch => {
        try {
            await axios.delete("/shelters/" + id);
            dispatch(deleteShelterSuccess(id));
            dispatch(push("/"));
        } catch (e) {
            dispatch(deleteShelterFailure(e));
        }
    }
};

export const getSingleShelter = id => {
    return async dispatch => {
        try {
            const response = await axios.get("/shelters/" + id);
            dispatch(getSingleShelterSuccess(response.data))
        } catch (e) {
            dispatch(getSingleShelterFailure(e))
        }
    }
}