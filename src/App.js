import React, { useState } from 'react';
import "./Assets/css/app.min.css"
import data from '../src/Assets/RestaurantsData/restaurants.json'


// Components
import Header from './Components/headerComponent/header'
import NewGoogleMap from "./Components/mapComponent/GoogleMap"
import Footer from './Components/footerComponent/footer'


function App() {
  // Existing restaurants in the database
  let [restaurants] = useState(data)

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <NewGoogleMap 
          restaurants={restaurants}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
