import './Sidebar.css'

const cityToCoordinates = {
	'Buenos Aires': [-58.3816, -34.6037],
	'Córdoba': [-64.18, -31.4],
	'La Plata': [-57.95, -34.92],
	'Mar del Plata': [-57.95, -34.92],
	'Mendoza': [-68.8, -32.88],
	'Rosario': [-60.95, -32.92],
	'Salta': [-65.78, -24.83],
	'San Juan': [-54.92, -37.45],
	'San Luis': [-58.37, -34.6],
	'Santa Fe': [-60.67, -31.6],
	'Santiago del Estero': [-63.65, -32.88],
	'Tucumán': [-65.42, -26.72],
	'Ushuaia': [-68.1, -54.8],
	'Viedma': [-58.8, -38.83],
	'Villa Maria': [-58.38, -34.60],
	'Bariloche': [-65.3, -42.85]
}

const Sidebar = ({ moveTo }) => {
  return (
	<div className='sidebar'>
		<h2>MARCADORES</h2>
		<ul>
			{
				Object.keys(cityToCoordinates).map((city, index) => {
					return (
						<li key={index} onClick={() => {
							console.log(cityToCoordinates[city])
							moveTo(cityToCoordinates[city]);
							}}>
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