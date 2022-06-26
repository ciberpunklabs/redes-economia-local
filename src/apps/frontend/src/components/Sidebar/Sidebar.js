import { useMap } from '../../contexts/useMap';
import './Sidebar.css'
import cityToCoordinates from '../assets/cityToCoordinates';

const Sidebar = () => {
	const { moveTo } = useMap();
  return (
	<div className='sidebar'>
		<h2>MARCADORES</h2>
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
	</div>
  )
}

export default Sidebar