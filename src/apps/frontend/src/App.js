import './App.css';
import Map from './components/Map/Map';
import Sidebar from './components/Sidebar/Sidebar';
import { MapProvider } from './contexts/useMap';

function App() {
  return (
    <div className="App">
		<MapProvider>
			<Sidebar/>
			<Map/>
		</MapProvider>
    </div>
  );
}

export default App;
