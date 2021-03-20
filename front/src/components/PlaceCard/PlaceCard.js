import React from 'react';
import {Link} from "react-router-dom";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
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
                <p><b>{props.length > 0 ? props.length : 0}</b> photos</p>
                    <Rating
                        readOnly
                        name="customized-empty"
                        defaultValue={props.value}
                        precision={0.5}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    />
                <p><b>{props.reviews > 0 ? props.reviews : 0} reviews</b></p>
            </div>
        </div>
    );
};

export default PlaceCard;