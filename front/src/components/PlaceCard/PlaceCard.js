import React from 'react';
import {Link} from "react-router-dom";

import './PlaceCard.css';

const PlaceCard = (props) => {
    return (
        <div className='placeCard'>
            <Link to={"/shelters/" + props.id}>
                <img
                    src={'http://localhost:8000/uploads/' + props.img}
                    alt='place'
                    className='placeImage'/>
            </Link>
            <div className='placeInfo'>
                <h3>{props.name}</h3>
            </div>
        </div>
    );
};

export default PlaceCard;