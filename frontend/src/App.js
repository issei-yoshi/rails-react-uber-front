import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { Restaurants } from './containers/Restaurants';
import { Orders } from './containers/Orders';
import { Foods } from './containers/Foods';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="restaurants" element={<Restaurants />}></Route>
        <Route path="orders" element={<Orders />}></Route>
        <Route path="/restaurants/:restaurantId/foods" element={<Foods />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
