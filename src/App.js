import React, { useState } from 'react';
import "./Assets/css/app.min.css"
import data from '../src/Assets/RestaurantsData/restaurants.json'


// Components
import NewGoogleMap from "./Components/mapComponent/GoogleMap"


function App() {
  // Existing restaurants in the database
  let [restaurants] = useState(data)

  return (
    <div className="App">
      <main>
        <NewGoogleMap 
          restaurants={restaurants}
        />
      </main>
    </div>
  );
}

export default App;
