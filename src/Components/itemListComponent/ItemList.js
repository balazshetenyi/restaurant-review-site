import React from 'react'
import StarRating from 'react-star-review'
import Button from 'react-bootstrap/Button'


function ItemList(props) {

    const {item, filter} = props

    return item.map(restaurant => {
        // Stars and comments array
        const starArrays = restaurant.ratings.filter(star => star.stars)
        // Only the stars
        const numbers = starArrays.map(star => star.stars)
        // Get the average rating
        const average = numbers.reduce((a, b) => a + b) / numbers.length

        const itemContainer = () => {
            const comment = restaurant.ratings[0].comment
                return (
                    <div className="item" key={restaurant.key}>
                        <div className="item-header">
                            <h3>{restaurant.restaurantName}</h3>
                            <p>{restaurant.address}</p>
                        </div>
                        <div className="item-rating">
                            <StarRating
                                size={20}
                                borderThickness={.5}
                                rating={average}
                                />
                            <p id="number-of-rates">({numbers.length})</p>
                        </div>
                        <div className="comment">
                            {
                                comment ? <p>"{comment}"</p> : <p>View more to add a comment...</p>
                            }
                        </div>
                        <div className="button-view-more">
                            <Button onClick={() => props.onModalClick(restaurant)} size="sm" variant="info">View more...</Button>
                        </div>
                    </div>
                )
            
        }

        const withFilter = (func) => {
            if ((average - filter) >= -.5 && (average - filter) < .5) {
                return func
            }
        }


        return (
            filter ? withFilter(itemContainer()) : itemContainer()
        )
    })  
}

export default ItemList
