import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './Pages/SignInPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import { TokenProvider } from './Context/TokenContext'; 
import HomePage from './Pages/HomePage.jsx';
import OrderPage from './Pages/OrderPage.jsx';
import AddressPage from './Pages/AddressPage.jsx';
import PaymentPage from './Pages/PaymentPage.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import PublicOrderPage from './Pages/PublicOrderPage.jsx';
import OrderSuccessfulPage from './Pages/OrderSuccessfulPage.jsx';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes.js';

function App() {
  return (
    <Router>
      <TokenProvider>
        <Routes>
          <Route path="/" element={<SignInPage/>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/homepage" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
          <Route path="/productpage/:restaurantName" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
          <Route path="/productpage" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
          <Route path="/orderpage" element={<ProtectedRoute><OrderPage/></ProtectedRoute>} />
          <Route path="/addresspage" element={<ProtectedRoute><AddressPage/></ProtectedRoute>} />
          <Route path="/paymentpage" element={<ProtectedRoute><PaymentPage/></ProtectedRoute>} />
          <Route path="/profilepage" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
          <Route path="/publicorderpage" element={<ProtectedRoute><PublicOrderPage/></ProtectedRoute>} />
          <Route path="/ordersuccess" element={<ProtectedRoute><OrderSuccessfulPage/></ProtectedRoute>} />
        </Routes>
      </TokenProvider>
    </Router>
  );
}

export default App;
