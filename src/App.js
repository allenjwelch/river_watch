import logo from './logo.svg';
import './App.scss';
import { getConditions, getWeather } from './utils/axios';
import { RIVER_LOCATIONS } from './constants';

function App() {
  console.log(getConditions(RIVER_LOCATIONS.CHATT_ATL));
  console.log(getWeather(RIVER_LOCATIONS.CHATT_ATL));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
