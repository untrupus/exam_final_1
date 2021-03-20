import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {addShelter, getSingleShelter, deleteShelter} from "../../store/actions/shelterActions";
import {addReview, addReviewPhoto, deleteReview, deleteReviewPhoto} from "../../store/actions/revActions";
import './SingleShelter.css';

const SingleShelter = (props) => {
    const inputRef = useRef();
    const user = useSelector(state => state.users.user);
    const singleShelter = useSelector(state => state.shelters.singleShelter);
    const dispatch = useDispatch();
    const [review, setReview] = useState({
        text: '',
        food: '',
        interior: '',
        service: ''
    })
    const [image, setImage] = useState({
        to: props.match.params.id,
        // from: user._id,
        image: ''
    });

    useEffect(() => {
        dispatch(getSingleShelter(props.match.params.id));
    }, [dispatch, props.match.params.id]);


    const remove = id => {
      dispatch(deleteShelter(id))
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setImage(prevState => ({
            ...prevState, [name]: file
        }));
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(image).forEach(key => {
            formData.append(key, image[key]);
        });
        dispatch(addReviewPhoto(formData));
    };

    return (
        <div className='singleShelterPage'>
            <div className='shelterInfo'>
                <div className='shelterDescription'>
                    <h1>{singleShelter.name}</h1>
                    <p><b>Description:</b> {singleShelter.description}</p>
                    {(user && user.user.role === 'admin') ?
                        <button
                            type='button'
                            className='signBtn'
                            onClick={() => remove(props.match.params.id)}
                        >
                            Remove
                        </button>
                        : null}
                </div>
                <img src={'http://localhost:8000/uploads/' + singleShelter.image}
                     className='shelterPageImage' alt='shelterPageImage'/>
            </div>
            <div className='shelterGallery'>
                gallery
            </div>
            <div className='ratings'>
                ratings
            </div>
            <div className='reviews'>
                review
            </div>
            {user ?
                <div className='reviewForm'>
                    <h3>Add review</h3>
                    <textarea
                        className='textarea'
                        name='text'
                        value={review.text}
                    />
                    <button
                        type='button'
                        className='signBtn'
                    >
                        Add
                    </button>
                    <div className='addFileBlock'>
                        <input
                            type='file'
                            ref={inputRef}
                            name="image"
                            className='signUpField'
                            required={true}
                            onChange={fileChangeHandler}
                        />
                        <button
                            type='button'
                            className='addImage'
                            onClick={formSubmit}
                        >
                            Add Image
                        </button>
                    </div>
                </div>
                : null}

        </div>
    );
}
;

export default SingleShelter;