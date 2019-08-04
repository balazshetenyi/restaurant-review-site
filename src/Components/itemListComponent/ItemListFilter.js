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
                <option value="5">5 stars only</option>
                <option value="4">4 stars only</option>
                <option value="3">3 stars only</option>
                <option value="2">2 stars only</option>
                <option value="1">1 star only</option>
            </select>

        </div>
    )
}


export default ItemListFilter