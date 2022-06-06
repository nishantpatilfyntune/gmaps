import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MapComponent from './components/Map/MapComponent';

import WeatherData from './components/Weather/WeatherData';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapComponent />}></Route>
          <Route path="/weather" element={<WeatherData />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
