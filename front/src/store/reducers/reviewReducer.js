import {
    ADD_REVIEW_FAILURE,
    ADD_REVIEW_PHOTO_FAILURE,
    ADD_REVIEW_PHOTO_SUCCESS,
    ADD_REVIEW_SUCCESS,
    DELETE_REVIEW_FAILURE,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_PHOTO_FAILURE,
    DELETE_REVIEW_PHOTO_SUCCESS
} from "../actionTypes";

const initialState = {
    addReviewError: null,
    addReviewPhotoError: null,
    deleteReviewError: null,
    deleteReviewPhotoError: null,
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REVIEW_FAILURE:
            return {...state, addReviewError: action.error};
        case ADD_REVIEW_PHOTO_FAILURE:
            return {...state, addReviewPhotoError: action.error};
        case DELETE_REVIEW_FAILURE:
            return {...state, deleteReviewError: action.error};
        case DELETE_REVIEW_PHOTO_FAILURE:
            return {...state, deleteReviewPhotoError: action.error};
        case ADD_REVIEW_SUCCESS:
            return {...state, addReviewError: null};
        case ADD_REVIEW_PHOTO_SUCCESS:
            return {...state, addReviewPhotoError: null};
        case DELETE_REVIEW_SUCCESS:
            return {...state, deleteReviewError: null};
        case DELETE_REVIEW_PHOTO_SUCCESS:
            return {...state, deleteReviewPhotoError: null};
        default:
            return {...state};
    }
};

export default reviewReducer;