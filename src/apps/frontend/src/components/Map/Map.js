import './Map.css'
import { toLonLat } from 'ol/proj';
import { useMap } from "../../contexts/useMap";

const Map = () => {
	const { center, zoom } = useMap();

 	return (
		<div id="map" >
			<div className="data">
				<h1>Longitud: {toLonLat(center)[0]}</h1>
				<h1>Latitud: {toLonLat(center)[1]}</h1>
				<h1>Zoom: {Math.floor(zoom)}</h1>
			</div>
		</div>
  	)
}

export default Map