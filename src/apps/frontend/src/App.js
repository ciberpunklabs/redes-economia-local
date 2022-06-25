import { fromLonLat } from 'ol/proj';
import { useState } from 'react';
import './App.css';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';

const initialCenter = fromLonLat([-71.6460682, -33.0501956]);
const initialZoom = 14;

function App() {
	const [center, setCenter] = useState(initialCenter);
	const [zoom, setZoom] = useState(initialZoom)

	const moveTo = ([lon, lat]) => {
		setCenter(fromLonLat([lon, lat]))
	}

  return (
    <div className="App">
      	<Sidebar moveTo={moveTo}/>
		<Map center={center} zoom={zoom} setZoom={setZoom} setCenter={setCenter}/>
    </div>
  );
}

export default App;
