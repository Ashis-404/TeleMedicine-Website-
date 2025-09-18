// src/auth/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Props = {
  children: React.ReactNode;
  requiredRole?: string; // 'patient' | 'doctor' | 'healthworker'
};

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { token, user } = useAuth();

  if (!token || !user) {
    return <Navigate to="/signin" replace />;
  }
  if (requiredRole && user.role !== requiredRole) {
    // optionally you could redirect to their correct landing
    switch (user.role) {
      case "patient":
        return <Navigate to="/patient-landing" replace />;
      case "doctor":
        return <Navigate to="/doctor-landing" replace />;
      case "healthworker":
        return <Navigate to="/healthworker-landing" replace />;
      default:
        return <Navigate to="/signin" replace />;
    }
  }
  return <>{children}</>;
}
