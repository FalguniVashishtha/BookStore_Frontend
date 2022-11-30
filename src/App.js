import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/loginpage' element={< LoginPage />}></Route>
          <Route exact path='/registerpage' element={< RegisterPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;