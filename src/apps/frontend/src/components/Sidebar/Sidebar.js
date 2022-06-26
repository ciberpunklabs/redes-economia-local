import { useMap } from '../../contexts/useMap';
import './Sidebar.css'
import cityToCoordinates from '../assets/cityToCoordinates';

const Sidebar = () => {
	const { moveTo, addMarker } = useMap();
	return (
		<div className='sidebar'>
			<div className='user'>
				<img src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200' alt='user'/>
				<h3>User</h3>
			</div>

			<h2>Ciudades</h2>
			<ul>
				{
					Object.keys(cityToCoordinates).map((city, index) => {
						return (
							<li key={index} onClick={() => moveTo(cityToCoordinates[city])}>
								{city}
							</li>
						)
					})
				}
			</ul>
			<button onClick={() => addMarker()}>Agregar marcador</button>
		</div>
	)
}

export default Sidebar