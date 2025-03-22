import DataScreen from "./pages/DataScreen";
import MainPage from "./pages/MainPage"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  

  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/data" element={<DataScreen/>}/>
          </Routes>
    </Router>
    
    </>
  )
}

export default App
