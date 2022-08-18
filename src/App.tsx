import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
