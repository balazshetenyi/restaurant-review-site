import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import StarRating from 'react-star-review'
import AddNewRatingForm from '../formComponents/AddNewRatingForm';


function MyModal(props) {
    // New ratings states
    const [addNew, setAddNew] = useState(false)
    const [newRating, setNewRating] = useState(null)
    const [newComment, setNewComment] = useState("")


    const {restaurant, onHide, streetView} = props

    // Getting the title for the modal window
    const title = restaurant ? restaurant.restaurantName : ""
    
    // Getting the reviews for the modal window
    const reviews = []
    if (restaurant) {
        restaurant.ratings.forEach( (review, index) => {
            reviews.push(
                <div key={index} className="ratings-section">
                    <StarRating 
                        size={15} 
                        rating={review.stars} 
                        /> 
                    {
                        review.comment ? <p>"{review.comment}"</p> : <p></p>
                    }
                    <hr/>
                </div>
            )
        });
    }

    
    
    const handleClick = () => {
        setAddNew(true)
    }
    
    const handleSend = () => {
        if (newRating && newComment) {
            const newRatings = {
                stars: newRating,
                comment: newComment
            }
            restaurant.ratings.push(newRatings)
            setNewRating(null)
            setNewComment("")
            setAddNew(false)
        } else {
            alert("Please fill in the required fields.")
        }
    }
    
    const onCloseClick = () => {
        onHide()
        setAddNew(false)
    }
    

    return (
        <Modal
            show={props.show}
            onHide={onCloseClick}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                    <div className="modal-header-container">
                        <div className="street-view-image-container">
                            { streetView ? <img src={streetView.url} alt="Street view of the restaurant"/> : <p>Loading..</p>}
                        </div>
                        <div className="modal-header-restaurant-name">
                            {title}
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!addNew ?
                    reviews :
                        <AddNewRatingForm 
                            onRatingChanged={r => setNewRating(r)}
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                        />
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseClick}>Close</Button>
                {!addNew ?
                <Button variant="info" onClick={handleClick}>Add New Review</Button> :
                <Button variant="info" onClick={handleSend}>Send</Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default MyModal