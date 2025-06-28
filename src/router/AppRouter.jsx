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
import WebpayForm from '../views/WebpayForm';
import PaymentResponse from '../views/PaymentResponse';
import AdminBuyPage from '../views/AdminBuyPage';

import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <UserHub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/actions"
          element={
            <ProtectedRoute>
              <ActionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/actions/:symbol"
          element={
            <ProtectedRoute>
              <ActionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchases"
          element={
            <ProtectedRoute>
              <ActionPurchases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />
        <Route path="/webpay/form" element={<WebpayForm />} />
        <Route path="/payment-response" element={<PaymentResponse />} />
        <Route path="*" element={<ErrorPage />} />

        <Route
          path="/admin-buy"
          element={
            <ProtectedRoute>
              <AdminBuyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
