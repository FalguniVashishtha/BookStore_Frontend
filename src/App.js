import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Order from "./Pages/Order";
import Cart from "./Pages/Cart";
import Book from "./Pages/BookList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route default path='/login' element={< LoginPage />}></Route>
          <Route exact path='/register' element={< RegisterPage />}></Route>
          <Route exact path='/BookList' element={<Book />}></Route>
          <Route exact path='/Cart' element={<Cart />}></Route>
          <Route exact path='/Order' element={<Order />}></Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;