import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Loader from "./components/Loader";

// Lazy load larger components
const Classes = lazy(() => import("./components/Classes"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FAQ = lazy(() => import("./components/Faq"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const Signup = lazy(() => import("./components/Signup"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full overflow-x-hidden bg-white text-gray-800">
                <Navbar />

                <main className="pt-20">
                  <Home />
                  <About />
                  <Suspense fallback={<Loader />}>
                    <Classes />
                  </Suspense>
                  <Suspense fallback={<Loader />}>
                    <Testimonials />
                  </Suspense>
                  <Suspense fallback={<Loader />}>
                    <FAQ />
                  </Suspense>
                  <Suspense fallback={<Loader />}>
                    <Contact />
                  </Suspense>
                </main>

                <Suspense fallback={<Loader />}>
                  <Footer />
                </Suspense>
              </div>
            }
          />
          <Route path="/login" element={<Suspense fallback={<Loader />}><LoginForm /></Suspense>} />
          <Route path="/signup" element={<Suspense fallback={<Loader />}><Signup /></Suspense>} />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute requiredRole="admin">
                  <Dashboard />
                </ProtectedRoute>
              </Suspense>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
