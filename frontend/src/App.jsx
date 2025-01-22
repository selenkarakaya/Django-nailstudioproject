import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import OurServices from "./pages/OurServices";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import ApptForm from "./components/ApptForm";
import ApptBook from "./pages/ApptBook";
import Appointments from "./components/Appointments";
import Appointment from "./components/Appointment";
import ApptUpdateForm from "./components/ApptUpdateForm";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/ourservices" element={<OurServices />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment-form" element={<ApptForm />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route
              path="/editAppointment-form/:id"
              element={<ApptUpdateForm />}
            />
            <Route
              path="feedbackForm"
              element={
                <ProtectedRoute>
                  <FeedbackForm />
                </ProtectedRoute>
              }
            />
            <Route path="/appointmentBook" element={<ApptBook />} />
            <Route path="/feedbackList" element={<FeedbackList />} />
          </Routes>

          <Footer />
        </Router>
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
