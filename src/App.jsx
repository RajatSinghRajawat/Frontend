import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components
import Headers from './components/headers/Headers'
import Footer from './components/Footer/Footer'
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products/Products'
import Paver from './components/Products/Paver'
import Precast from './components/Products/Precast'
import Gallery from './components/Gallery'
import Blogs from './components/Blogs'
import Faq from './components/Faq'
import Testinomials from './components/Testinomials'
import HowItWorks from './components/HowItWorks'
import Contact from './components/Contact'
import ChainLinks from './components/Products/ChainLinks'
import ClienteleSlider from './components/ClienteleSlider';
import SingleBlogsDetails from './components/SingleBlogsDetails'
import AuthModal from './components/AuthModal'
import InquiryModal from './components/InquiryModal'
import FencingPoles from './components/Products/FencingPoles'
import SingleProducts from './components/Products/SingleProducts'

function AppContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [pendingInquiryProduct, setPendingInquiryProduct] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalDismissed, setModalDismissed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated on page load or route change
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
      setIsAuthenticated(false);
      setIsAuthModalOpen(!modalDismissed);
    } else {
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
    }
  }, [location, modalDismissed]);

  // Handler for inquiry button click
  const handleInquiryRequest = (productName = '') => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setPendingInquiryProduct(productName);
      setIsInquiryModalOpen(true);
    } else {
      setPendingInquiryProduct(productName);
      setIsAuthModalOpen(true);
    }
  };

  // After successful login, open InquiryModal if there was a pending inquiry
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setModalDismissed(false);
    setIsAuthenticated(true);
    if (pendingInquiryProduct) {
      setIsInquiryModalOpen(true);
    }
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
    setModalDismissed(true);
  };

  const handleCloseInquiryModal = () => {
    setIsInquiryModalOpen(false);
    setPendingInquiryProduct('');
  };

  return (
    <div className="App">
      <Headers isAuthenticated={isAuthenticated} />
      <main className="pt-20 lg:pt-9">
        <Routes>
          <Route path="/" element={<Home onInquiry={handleInquiryRequest} />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products onInquiry={handleInquiryRequest} />} />
          <Route path="/products/paver" element={<Paver onInquiry={handleInquiryRequest} />} />
          <Route path="/products/precast" element={<Precast onInquiry={handleInquiryRequest} />} />
          <Route path="/products/chainlinks" element={<ChainLinks onInquiry={handleInquiryRequest} />} />
          <Route path="/products/fencingpoles" element={<FencingPoles onInquiry={handleInquiryRequest} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/testimonials" element={<Testinomials />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/singleblogsdetails/:id" element={<SingleBlogsDetails />} />
          <Route path="/singleproducts/:id" element={<SingleProducts />} />

          
        </Routes>
      </main>
      <Footer />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={handleCloseInquiryModal}
        productName={pendingInquiryProduct}
      />
    </div>
  )
}

const App = () => (
  <Router>
    <AppContent />
    <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
  </Router>
)

export default App