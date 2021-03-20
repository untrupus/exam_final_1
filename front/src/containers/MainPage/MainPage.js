import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getShelters} from "../../store/actions/shelterActions";
import PlaceCard from "../../components/PlaceCard/PlaceCard";
import './MainPage.css';

const MainPage = () => {
    const shelters = useSelector(state => state.shelters.shelters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShelters());
    }, [dispatch]);

    let sheltersList;

    if (shelters.length === 0) {
        sheltersList = (
            <h2>Add first place...</h2>
        );
    } else {
        sheltersList = shelters.map(shelter => {
            return (
                <PlaceCard
                    key={shelter._id}
                    name={shelter.name}
                    img={shelter.image}
                    id={shelter._id}
                />
            );
        })
    }

    return (
        <div className='mainPageInner'>
            {sheltersList}
        </div>
    );
};

export default MainPage;