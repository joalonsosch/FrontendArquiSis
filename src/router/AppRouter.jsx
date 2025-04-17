import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../views/LandingPage';
import SignIn from '../views/SignIn';
import LogIn from '../views/LogIn';
import UserHub from '../views/UserHub';
import ActionList from '../views/ActionList';
import ActionDetail from '../views/ActionDetail';
import ActionPurchases from '../views/ActionPurchases';
import Wallet from '../views/Wallet';
import ErrorPage from '../views/ErrorPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<UserHub />} />
        <Route path="/actions" element={<ActionList />} />
        <Route path="/actions/:symbol" element={<ActionDetail />} />
        <Route path="/purchases" element={<ActionPurchases />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
