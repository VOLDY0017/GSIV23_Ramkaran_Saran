import logo from './logo.svg';
import './App.scss';
import RouteForPage from './RouteForPage';
import { BrowserRouter } from 'react-router-dom';
//import "../node_modules/bootstrap/scss/bootstrap.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteForPage />
      </BrowserRouter>

    </div>
  );
}

export default App;
