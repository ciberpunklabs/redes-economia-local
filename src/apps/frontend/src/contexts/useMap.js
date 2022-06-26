import { createContext, useContext, useEffect, useRef, useState } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import Feature from "ol/Feature";
import { Vector as SourceVector } from "ol/source";
import { Vector as LayerVector } from  'ol/layer';
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

const MapContext = createContext();
export const MapProvider = ({ children }) => {
	const [center, setCenter] = useState([0,0]);
	const [zoom, setZoom] = useState(0);

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

	const moveTo = ([lon, lat]) => {
		setCenter(fromLonLat([lon, lat]));
	}

	const setZoomLevel = (zoomLevel) => {
		setZoom(zoomLevel);
	}

	const addMarker = () => {
		console.log("addMarker");
		const markerGeometry = new Point(center);

		const markerFeature = new Feature({
			geometry: markerGeometry
		});

		const markerStyle = new Icon({
			src: 'https://github.com/openlayers/openlayers/raw/v3.20.1/examples/resources/logo-70x70.png',
			scale: 0.4
		});
		
		markerFeature.setStyle(new Style({
			image: markerStyle,
		}));

		const vectorSource = new SourceVector({
			features: [markerFeature]
		});
		
		const markerLayer = new LayerVector({
			title: "RoutePoint",
			visible: true,
			source: vectorSource
		});

		map.current.addLayer(markerLayer);
	}

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
	

	const value = { 
		center, zoom, 
		moveTo, setZoomLevel, addMarker
	}

	return (
		<MapContext.Provider value={value}>
			{children}
		</MapContext.Provider>
	)
}

export const useMap = () => {
	const context = useContext(MapContext);
	if(context === undefined){
		console.log('device must be used within a GlobalProvider');
	}
	return context;
}

