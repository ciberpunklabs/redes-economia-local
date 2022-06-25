import OlMap from "ol/Map";
import OlView from "ol/View";
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef } from 'react'
import { fromLonLat, toLonLat } from 'ol/proj';
import './Map.css'
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import { Vector as SourceVector } from "ol/source";
import { Vector as LayerVector } from  'ol/layer';
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

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

	const markerGeometry = new Point(fromLonLat([-71.6460682, -33.0501956]));

	const markerFeature = new Feature({
		geometry: markerGeometry
	});

	const markerFeature2 = new Feature({
		geometry: new Point(fromLonLat([-71.640800, -33.0501500]))
	});

	const markerStyle = new Icon({
		src: 'https://github.com/openlayers/openlayers/raw/v3.20.1/examples/resources/logo-70x70.png',
		scale: 0.4
	});
	
	markerFeature.setStyle(new Style({
		image: markerStyle,
	}));

	markerFeature2.setStyle(new Style({
		image: new Icon({
			src: 'https://github.com/openlayers/openlayers/raw/v3.20.1/examples/resources/logo-70x70.png',
			scale: 0.4
		})
	}));
	

	const vectorSource = new SourceVector({
		features: [markerFeature, markerFeature2]
	});
	
	const markerLayer = new LayerVector({
		title: "RoutePoint",
		visible: true,
		source: vectorSource
	});

	map.current.addLayer(markerLayer);

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