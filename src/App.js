import logo from './logo.svg';
import './App.css';
import IzuluReact from "izulu-react-package";

function App() {
  return (
    <div className="App">
      <IzuluReact refreshInterval={150000} apiKey="YOUR API KEY" isBackroundImageEnabled={false} isUserConfig={false}/>
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