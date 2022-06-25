import OlMap from "ol/Map";
import OlView from "ol/View";
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef,  } from 'react'
import { toLonLat } from 'ol/proj';
import './Map.css'

const Map = ({ center, zoom, setCenter, setZoom }) => {

	const map = useRef(new OlMap({
		target: null,
		layers: [
			new TileLayer({
				source: new XYZ({
				  url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				})
			  })
		],
		view: new OlView({ 
			center: center, 
			zoom: zoom
		}),
	}));


	useEffect(() => {
		map.current.setTarget("map")
		map.current.on("click", (e) => {
			console.log(e.coordinate)
			setCenter(e.coordinate)
		})
		map.current.on("moveend", (e) => {
			console.log(e.target.getView().getCenter())
			setCenter(e.target.getView().getCenter())
			setZoom(e.target.getView().getZoom())
		})
	}, [setCenter, setZoom])

	useEffect(() => {
		console.log('center:', center)
		map.current.getView().setCenter(center)
	}, [center])


	useEffect(() => {
		console.log('zoom:', zoom)
		map.current.getView().setZoom(zoom)
	}, [zoom])

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