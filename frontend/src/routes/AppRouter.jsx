import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import Navbar from '../components/Navbar';


function AppRouter() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*more pages here*/}
      </Routes>
    </Router>
  );
}

export default AppRouter;