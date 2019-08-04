import React from 'react'
import StarRating from 'react-star-review'

function AddNewForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
                <input
                    className="input-field"
                    type="text"
                    name="restaurantName"
                    placeholder="Restaurant name..."
                    value={props.restaurantName}
                    onChange={props.setRestaurantName}
                    required
                />
                <input
                    className="input-field"
                    type="text"
                    name="address"
                    placeholder="Address..."
                    value={props.address}
                    onChange={props.setAddress}
                    required
                />
                <div>
                Your rating: {<StarRating 
                    size={15}
                    rating={0}
                    interactive={true}
                    onRatingChanged={props.onRatingChanged}
                    />}
                </div>
                <textarea
                    className="input-field"
                    style={{width: "100%", height: 50}}
                    type="text"
                    name="comment"
                    value={props.comment}
                    placeholder="Tell us your experience..."
                    onChange={props.setComment}
                />
            <button>Submit</button>
        </form>
    )
}

export default AddNewForm