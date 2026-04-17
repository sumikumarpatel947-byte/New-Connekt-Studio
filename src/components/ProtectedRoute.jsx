import { Navigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, requiredRole = "admin" }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="card-surface p-8 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" />
          <p className="mt-4 font-semibold text-stone-700">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== requiredRole) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="card-surface max-w-md p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
            <ShieldAlert size={28} />
          </div>
          <h1 className="mt-5 font-['Outfit'] text-3xl font-semibold text-stone-950">Access denied</h1>
          <p className="mt-3 text-base leading-7 text-stone-600">
            You don&apos;t have permission to access this page. Only {requiredRole}s can view this resource.
          </p>
          <a href="/" className="btn-primary mt-6 px-6 py-3 text-sm">
            Go back home
          </a>
        </div>
      </div>
    );
  }

  return children;
}
