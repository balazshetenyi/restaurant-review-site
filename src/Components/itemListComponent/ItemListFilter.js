import React from 'react'

function ItemListFilter(props) {

    return (
        <div className="item-list-filter-container">
            <select 
                value={props.value}
                name="filter"
                onChange={props.onChange}
                className="filter"
            >
                <option value={""}>Show all</option>
                <option value="5">4 - 5 stars</option>
                <option value="4">3 - 4 stars</option>
                <option value="3">2 - 3 stars</option>
                <option value="2">1 - 2 stars</option>
                <option value="1">1 star only</option>
            </select>

        </div>
    )
}


export default ItemListFilter