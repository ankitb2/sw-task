import './App.css';
import Planets from '../Planets';
import { Provider } from 'react-redux';
import store from '../../app/store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Star Wars Planets!</h1>
        <Planets />
      </div>
    </Provider>

  );
}

export default App;
