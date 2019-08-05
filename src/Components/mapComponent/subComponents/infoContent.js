import React from 'react'
import StarRating from 'react-star-review'
import AddNewForm from '../../formComponents/AddNewForm'
import Button from 'react-bootstrap/Button'


const InfoWindowContent = (props) => {
    const { selectedRestaurant, onModalClick, userClicked } = props
        
    
    if (selectedRestaurant) {
        // // Get the average rating
        const starArrays = selectedRestaurant.ratings.filter(star => star.stars)
        const numbers = starArrays.map(star => star.stars)
        const average = numbers.reduce((a, b) => a + b, 0) / numbers.length
        return (
            // For existing restaurants
            <div>
                <h3>{selectedRestaurant.restaurantName}</h3>
                <p>{selectedRestaurant.address}</p>
                <p>{selectedRestaurant.contact}</p>
                <div>
                    <StarRating
                        size={15}
                        rating={average}
                    />

                </div>
                <Button onClick={() => onModalClick(selectedRestaurant)} size="sm" variant="outline-info">View more...</Button>

            </div>
        )
    } else if (userClicked) {
        return <p>You are here!</p>
    } else {
        return (
            // New restaurants to add
            <div>
                <h3>Add a new restaurant</h3>
                <AddNewForm
                    setRestaurantName={props.setRestaurantName}
                    setAddress={props.setAddress}
                    onSubmit={props.onSubmit}
                    onRatingChanged={props.onRatingChanged}
                    setComment={props.setComment}
                />
            </div>
        )
    }
}

export default InfoWindowContent