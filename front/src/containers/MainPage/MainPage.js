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
            let totalFood;
            let totalService;
            let totalInterior;
            let total;

            if (shelter && shelter.reviews) {
                totalFood = shelter.reviews.reduce((prev, next) => prev + next.food, 0);
                totalFood = totalFood / shelter.reviews.length;
            }
            if (shelter && shelter.reviews) {
                totalService = shelter.reviews.reduce((prev, next) => prev + next.service, 0);
                totalService = totalService / shelter.reviews.length;
            }
            if (shelter && shelter.reviews) {
                totalInterior = shelter.reviews.reduce((prev, next) => prev + next.interior, 0);
                totalInterior = totalInterior / shelter.reviews.length;
            }
            if (shelter && shelter.reviews) {
                total = (totalFood + totalInterior + totalService) / 3;
            }

            return (
                <PlaceCard
                    value={total ? total : 0}
                    key={shelter._id}
                    name={shelter.name}
                    img={shelter.image}
                    id={shelter._id}
                    length={shelter.images.length}
                    reviews={shelter.reviews.length}
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