import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './pages/Profile';
import Home from "./pages/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App
