import React, { useState, useEffect, Fragment } from 'react'
import { useLoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import icon from '../../Assets/icons/iconfinder_Map-Marker-Bubble-Azure_73024.png'
import user from '../../Assets/icons/iconfinder_map-marker_299087.png'
// Components
import InfoWindowContent from './subComponents/infoContent'
import ItemList from '../itemListComponent/ItemList'
import ItemListFilter from '../itemListComponent/ItemListFilter'
import MyModal from '../ModalComponent/Modal';

// Google API Key
const apiKey = "AIzaSyCRW2D7OIkv7vkfdvoFkpH9vuB4wJeH4cQ"

function NewGoogleMap(props) {
    // Database
    const {restaurants} = props
    // Google map 
    const [mapRef, setMapRef] = useState(null)
    const [libraries] = useState(["places"])
    const [center, setCenter] = useState({ lat: 51.7626, lng: -1.1986 })
    const [isMapClicked, setIsMapClicked] = useState(false)
    const [usersPosition, setUsersPosition] = useState(null)
    const [placesAroundUser, setPlacesAroundUser] = useState(null)
    const [userClicked, setUserClicked] = useState(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    // Adding new restaurant to the database
    const [restaurantName, setRestaurantName] = useState("")
    const [newCoordinates, setNewCoordinates] = useState(null)
    const [address, setAddress] = useState("")
    const [newRating, setNewRating] = useState(null)
    const [comment, setComment] = useState("")
    // Filtering
    const [filterValue, setFilterValue] = useState(null)
    // Modal window
    const [modalShow, setModalShow] = useState(false)
    const [streetView, setStreetView] = useState(null)

    // Load google maps scripts
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: libraries
    })

    
    // Places request
    const fetchPlaces = (map) => {
        setMapRef(map)
        
        var request = {
            location: usersPosition,
            radius: '4500',
            type: ['restaurant']
        };
        
        var service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }
    function callback(results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(element => {
                const newPlace = {
                    key: element.id,
                    restaurantName: element.name,
                    address: element.vicinity,
                    position: {
                        lat: element.geometry.location.lat(),
                        lng: element.geometry.location.lng()
                    },
                    ratings: [
                        {
                            stars: element.rating,
                            comment: ""
                        }
                    ]
                }
                restaurants.push(newPlace)
            })
        }
    }
    

    useEffect(() => {
        if (usersPosition) {
            setCenter(usersPosition)
            fetchPlaces(mapRef)
        }
            setPlacesAroundUser(restaurants)
    }, [usersPosition])

    
    // Reverse geolocation to retrieve
    const geoCodeLatLng = async (map, latLng) => {
        const geocoder = new window.google.maps.Geocoder();
            await geocoder.geocode({'location': latLng}, function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        setAddress(results[0].formatted_address)
                    } else {
                        console.log(results)
                    }
                } else {
                    console.log(status)
                }
            })
    }

    
    // Marker clickhandler
    const handleMarkerClick = (event, rest) => {
        // If we clicked on the map, but we just want to click on a marker instead
        if (newCoordinates) {
            setNewCoordinates(null)
        }
        // Remember which place was clicked
        setSelectedRestaurant(rest)
        setIsMapClicked(true)
    }
    
    // Map click handler
    const handleMapClick = (event, map) => {
        // If we clicked on a marker, but we just want to click on the map instead
        if (selectedRestaurant) {
            setSelectedRestaurant(null)
            setNewCoordinates(null)
        }
        // Remember new coordinates
        setNewCoordinates(event.latLng.toJSON())
        geoCodeLatLng(mapRef, event.latLng.toJSON())
        setIsMapClicked(true)
        setUserClicked(false)
    }


    // Info window handler
    const handleCloseClick = () => {
        // Clear all on close
        setIsMapClicked(false)
        setSelectedRestaurant(null)
        setNewCoordinates(null)
        setAddress('')
    }
    
    // Handling form submit
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (restaurantName && newRating) {
            // New object to be pushed
            const newRestaurantDetails = {
                key: address,
                restaurantName: restaurantName,
                address: address,
                position: newCoordinates,
                ratings: [
                    {
                        stars: newRating,
                        comment: comment
                    }
                ]
            }
            restaurants.push(newRestaurantDetails)
            setIsMapClicked(false)
            setRestaurantName("")
            setAddress("")
            setNewCoordinates(null)
            setNewRating(null)
            setComment("")
            alert(`Thank you. We have added ${restaurantName} to our database.`)
        } 
    }

    // Geolocation --- user's location
    const locateUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const position = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
                setUsersPosition(position)
            })
        }
        return (
            <Marker
                icon={user}
                position={usersPosition}
                animation={window.google.maps.Animation.DROP}
                onClick={(e) => geoClickHandler(e)}
            />
        )
    }
    // Location click handler
    const geoClickHandler = () => {
        setUserClicked(true)
        setIsMapClicked(true)
    }


    // Filter change handler
    const handleFilterChange = (event) => {
        const { value } = event.target
        value ? setFilterValue(value) : setFilterValue(null)
    }


    // Position of the info window
    const infoWindowPosition = selectedRestaurant ? selectedRestaurant.position : userClicked ? usersPosition : newCoordinates

    
    // Modalcontent
    const clickHandler = (restaurant) => {
        setIsMapClicked(false)
        setAddress(null)
        setModalShow(true)
        setSelectedRestaurant(restaurant)
        // Fetching Street view image
        fetch(`https://maps.googleapis.com/maps/api/streetview?size=360x240&location=${restaurant.address}&key=AIzaSyCRW2D7OIkv7vkfdvoFkpH9vuB4wJeH4cQ`)
            .then(res => setStreetView(res))
    }

    // Modal close handler
    const modalClose = () => {
        setSelectedRestaurant(null)
        setModalShow(false)
    }

    
    // Render google maps
    const renderMap = () => {
        return (
            <Fragment>
                    <GoogleMap
                        onLoad={map => setMapRef(map)}
                        onCenterChanged={() => setCenter(mapRef.getCenter().toJSON())}
                        center={center}
                        zoom={13}
                        mapContainerClassName="map"
                        onClick={(event, map) => handleMapClick(event, map)}
                        options={{streetViewControl: true}}
                        >
                        {locateUser()}

                        {restaurants.map(rest => (
                            <Marker
                                className="icon"
                                icon={icon}
                                key={rest.key}
                                position={rest.position}
                                animation={window.google.maps.Animation.DROP}
                                onClick={event => handleMarkerClick(event, rest)}
                            />
                        ))}


                        {isMapClicked && (
                            <InfoWindow
                                position={infoWindowPosition}
                                onCloseClick={handleCloseClick}
                            >
                            
                                <InfoWindowContent
                                    userClicked={userClicked}
                                    selectedRestaurant={selectedRestaurant}
                                    setRestaurantName={e => setRestaurantName(e.target.value)}
                                    setAddress={address}
                                    onRatingChanged={r => setNewRating(r)}
                                    setComment={e => setComment(e.target.value)}
                                    onSubmit={handleFormSubmit}
                                    onModalClick={clickHandler}
                                />
                            </InfoWindow>
                        )}


                    </GoogleMap>

                <div className="item-list-container">
                    <ItemListFilter 
                        onChange={handleFilterChange}
                    />

                    <ItemList
                        item={placesAroundUser}
                        filter={filterValue}
                        onModalClick={clickHandler}
                    />

                    <MyModal 
                        show={modalShow}
                        onHide={modalClose}
                        restaurant={selectedRestaurant}
                        streetView={streetView}
                    />
                </div>

            </Fragment>
        )
    }

    return isLoaded ? renderMap() : usersPosition ? renderMap() : <p>Loading...</p>
}

export default NewGoogleMap