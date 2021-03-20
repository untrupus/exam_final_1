import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {addShelter, getSingleShelter, deleteShelter} from "../../store/actions/shelterActions";
import {addReview, addReviewPhoto, deleteReview, deleteReviewPhoto} from "../../store/actions/revActions";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import './SingleShelter.css';

const SingleShelter = (props) => {
    const inputRef = useRef();
    const user = useSelector(state => state.users.user);
    const singleShelter = useSelector(state => state.shelters.singleShelter);
    const dispatch = useDispatch();

    const [review, setReview] = useState({
        from: user ? user.user._id : null,
        fromName: user ? user.user.displayName : null,
        to: props.match.params.id,
        text: '',
        food: '',
        interior: '',
        service: ''
    });

    const [image, setImage] = useState({
        to: props.match.params.id,
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

    const addRev = data => {
        dispatch(addReview(data));
        dispatch(getSingleShelter(props.match.params.id));
        window.location.reload();
    }

    const removePhoto = async (id) => {
        await dispatch(deleteReviewPhoto(id, props.match.params.id));

        dispatch(getSingleShelter(props.match.params.id));
    };

    const inputChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReview(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        if (image.image !== '') {
            const formData = new FormData();
            Object.keys(image).forEach(key => {
                formData.append(key, image[key]);
            });
            await dispatch(addReviewPhoto(formData));
            dispatch(getSingleShelter(props.match.params.id));
            setImage(prevState => ({
                ...prevState, image: ''
            }));
        }
    };

    let gallery;
    if (singleShelter && singleShelter.images && singleShelter.images.length === 0) {
        gallery = (
            <h2>Add first photo...</h2>
        )
    } else if (singleShelter && singleShelter.images) {
        gallery = singleShelter.images.map(img => {
            return (
                <div className='singleImage' key={img._id}>
                    <img
                        src={'http://localhost:8000/uploads/' + img.image}
                        className='imgInner'
                        alt='galleryImage'
                    />
                    {user && user.user.role === 'admin' ?
                        <button
                            type='button'
                            onClick={() => removePhoto(img._id)}
                        >
                            remove
                        </button>
                        : null}
                </div>
            )
        });
    }

    let reviews;
    if (singleShelter && singleShelter.reviews && singleShelter.reviews.length === 0) {
        reviews = (
            <h2>Add first review...</h2>
        )
    } else if (singleShelter && singleShelter.reviews) (
        reviews = singleShelter.reviews.map(review => {
            return (
                <div className='singleReview'>
                    <h4 className='reviewerName'>{review.fromName}</h4>
                    <span className='label'>Service: </span>
                    <Rating
                        className='rate'
                        readOnly
                        defaultValue={review.service}
                        precision={0.1}
                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                    />
                    <span className='label'>Food: </span>
                    <Rating
                        className='rate'
                        readOnly
                        defaultValue={review.food}
                        precision={0.1}
                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                    />
                    <span className='label'>Interior: </span>
                    <Rating
                        className='rate'
                        readOnly
                        defaultValue={review.interior}
                        precision={0.1}
                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                    />
                </div>
            )
        })
    )

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
                {gallery}
            </div>
            <div className='ratings'>
                ratings
            </div>
            <div className='reviews'>
                {reviews}
            </div>
            {user ?
                <div className='reviewForm'>
                    <h3>Add review</h3>
                    <textarea
                        className='textarea'
                        name='text'
                        value={review.text}
                        onChange={inputChangeHandler}
                    />
                    <div className='selects'>
                        <p className='label'>Service: </p>
                        <Rating
                            name="service"
                            defaultValue={review.service}
                            precision={1}
                            onChange={inputChangeHandler}
                            emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                        />
                        <p className='label'>Food: </p>
                        <Rating
                            name="food"
                            defaultValue={review.food}
                            precision={1}
                            onChange={inputChangeHandler}
                            emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                        />
                        <p className='label'>Interior: </p>
                        <Rating
                            name="interior"
                            defaultValue={review.interior}
                            precision={1}
                            onChange={inputChangeHandler}
                            emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                        />

                    </div>
                    <button
                        type='button'
                        className='signBtn'
                        onClick={() => addRev(review)}
                    >
                        Add
                    </button>
                    <div className='addFileBlock'>
                        <input
                            type='file'
                            ref={inputRef}
                            name="image"
                            // style={{display: 'none'}}
                            id="raised-button-file"
                            className='signUpField'
                            required={true}
                            onChange={fileChangeHandler}
                        />
                        <button
                            type='button'
                            className='addImage'
                            onClick={formSubmit}
                        >
                            Send Image
                        </button>
                    </div>
                </div>
                : null}

        </div>
    );
};

export default SingleShelter;