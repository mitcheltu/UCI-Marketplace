import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';


function AppRouter() {
  return (
    <Router>
        {/*navbar here*/}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*more pages here*/}
      </Routes>
    </Router>
  );
}

export default AppRouter;