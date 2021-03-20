import React, {useState, useRef} from 'react';
import {addShelter} from "../../store/actions/shelterActions";
import {useDispatch} from "react-redux";
import './AddShelter.css';

const AddShelter = () => {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const [place, setPlace] = useState({
        name: '',
        description: '',
        image: '',
        agree: 'false'
    })

    const inputChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPlace(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const checked = e => {
        setPlace(prevState => {
            return {...prevState, agree: 'true'};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setPlace(prevState => ({
            ...prevState, [name]: file
        }));
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(place).forEach(key => {
            formData.append(key, place[key]);
        });
        dispatch(addShelter(formData));
        setPlace(prevState => {
            return {...prevState, agree: 'false'};
        });
    };

    return (
        <div className='addShelterPage'>
            <div className='addBlock'>
                <h3>Add Yor Place</h3>
                <input
                    type='text'
                    name='name'
                    className='signUpField'
                    value={place.name}
                    onChange={inputChangeHandler}
                    placeholder='Name'
                    required={true}
                />
                <input
                    type='text'
                    name='description'
                    className='signUpField'
                    value={place.description}
                    onChange={inputChangeHandler}
                    placeholder='Description'
                    required={true}
                />
                <input
                    type='file'
                    ref={inputRef}
                    name="image"
                    className='signUpField'
                    required={true}
                    onChange={fileChangeHandler}
                />

                <label htmlFor="agree" className='check'>
                    <input type="checkbox" id='agree' name='agree' onChange={checked}/>
                    Agree with terms
                </label>

                <button
                    type='button'
                    className='signBtn'
                    disabled
                    onClick={formSubmit}
                >
                    Add
                </button>
            </div>


        </div>
    );
};

export default AddShelter;