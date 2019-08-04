import React from 'react'
import StarRating from 'react-star-review'


function AddNewRatingForm(props) {

    return (
        <div className="add-new-rating-form">
            <div className="new-users-rating">
                Your Rating: <StarRating
                                size={20}
                                rating={0}
                                interactive={true}
                                onRatingChanged={props.onRatingChanged}
                            />
                            <hr />
            </div>
            <textarea 
                style={{width: "100%", height: 150}} 
                placeholder="Tell us your experience..." 
                type="text"
                name="newRating"
                value={props.value}
                onChange={props.onChange}
                required
            >
            </textarea>
        </div>
    )
}

export default AddNewRatingForm