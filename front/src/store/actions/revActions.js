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

const addReviewSuccess = (data) => {
    return {type: ADD_REVIEW_SUCCESS, data};
};

const addReviewFailure = error => {
    return {type: ADD_REVIEW_FAILURE, error};
};

const deleteReviewSuccess = id => {
    return {type: DELETE_REVIEW_SUCCESS, id};
};

const deleteReviewFailure = error => {
    return {type: DELETE_REVIEW_FAILURE, error};
};

const addReviewPhotoSuccess = data => {
    return {type: ADD_REVIEW_PHOTO_SUCCESS, data};
};

const addReviewPhotoFailure = error => {
    return {type: ADD_REVIEW_PHOTO_FAILURE, error};
};

const deleteReviewPhotoSuccess = id => {
    return {type: DELETE_REVIEW_PHOTO_SUCCESS, id};
};

const deleteReviewPhotoFailure = error => {
    return {type: DELETE_REVIEW_PHOTO_FAILURE, error};
};

export const addReview = data => {
    return async dispatch => {
        try {

            dispatch(addReviewSuccess());
        } catch (e) {
            dispatch(addReviewFailure(e));
        }
    }
};

export const addReviewPhoto = data => {
    return async dispatch => {
        try {

            dispatch(addReviewPhotoSuccess());
        } catch (e) {
            dispatch(addReviewPhotoFailure(e));
        }
    }
};

export const deleteReview = id => {
    return async dispatch => {
        try {

            dispatch(deleteReviewSuccess());
        } catch (e) {
            dispatch(deleteReviewFailure(e))
        }
    }
};

export const deleteReviewPhoto = id => {
    return async dispatch => {
        
    }
}