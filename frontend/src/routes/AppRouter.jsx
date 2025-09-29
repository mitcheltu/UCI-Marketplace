import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import CreateItem from '../pages/CreateItem';
import TradeItem from '../pages/TradeItem';
import Navbar from '../components/Navbar';
import Login from '../pages/Login';
import ItemInfo from '../pages/ItemInfo';


function AppRouter() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CreateItem" element={<CreateItem />} />
        <Route path="/TradeItem" element={<TradeItem />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ItemInfo" element={<ItemInfo />} />
        {/*more pages here*/}
      </Routes>
    </Router>
  );
}

export default AppRouter;