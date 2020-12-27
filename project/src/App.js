import Main from './components/mainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';

const store = ConfigureStore();
function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main/>
        </div> 
      </BrowserRouter>
    </Provider>
  );  
  /*const items = [...Array(100)].map((val, i) => `Item ${i}`);
  return(
     <div className="container">
    <div className="left-col">
      Left col
    </div>
    
    <div className="center-col">
      <span>List</span>
      <ul>
        {items.map((item, i) => (<li key={`item_${i}`}>{ item }</li>))}
      </ul>
    </div>
    
    <div className="right-col">
      Right col
    </div>
  </div>
  )*/

}

export default App;
