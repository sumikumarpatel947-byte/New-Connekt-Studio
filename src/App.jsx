import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { X, Star } from "lucide-react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Classes from "./components/Classes";
import Loader from "./components/Loader";

// Lazy load larger components that are not immediately visible
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
  const [showReviewReminder, setShowReviewReminder] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if user has enrolled but hasn't reviewed
    try {
      const shouldShowReminder = localStorage.getItem("showReviewReminder");
      if (shouldShowReminder === "true") {
        // Show popup after a short delay
        const reminderTimer = setTimeout(() => {
          setShowReviewReminder(true);
        }, 2000);
        return () => clearTimeout(reminderTimer);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }

    // Listen for enrollment events
    const handleEnrollmentEvent = () => {
      try {
        const shouldShowReminder = localStorage.getItem("showReviewReminder");
        if (shouldShowReminder === "true") {
          const reminderTimer = setTimeout(() => {
            setShowReviewReminder(true);
          }, 2000);
          return () => clearTimeout(reminderTimer);
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    };

    window.addEventListener('enrollment-triggered', handleEnrollmentEvent);
    return () => window.removeEventListener('enrollment-triggered', handleEnrollmentEvent);
  }, []);

  const handleDismissReminder = () => {
    setShowReviewReminder(false);
    localStorage.removeItem("showReviewReminder");
  };

  const handleGoToReview = () => {
    setShowReviewReminder(false);
    localStorage.removeItem("showReviewReminder");
    window.location.href = "/#testimonials";
  };

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
                  <Classes />
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

      {showReviewReminder && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="surface-card shadow-2xl max-w-sm">
            <div className="flex items-start justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
                  <Star size={20} className="text-teal-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Share Your Experience</h3>
              </div>
              <button onClick={handleDismissReminder} className="text-gray-400 hover:text-gray-600 transition">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600">
                You recently enrolled in a class. We'd love to hear about your experience! Please share your review to help others.
              </p>
              <div className="mt-4 flex gap-3">
                <button onClick={handleGoToReview} className="primary-btn flex-1 px-4 py-2 text-sm">
                  Add Review
                </button>
                <button onClick={handleDismissReminder} className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition">
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
