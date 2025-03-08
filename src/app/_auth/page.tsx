"use client";
import { useAuth } from "../_context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const withAuth = (Component: React.ComponentType) => {
  const AuthenticatedComponent = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check localStorage directly for authentication
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const token = localStorage.getItem("token");

      if (!isLoggedIn || !token) {
        // Not authenticated according to localStorage, redirect
        router.replace("/");
      } else {
        // User is authenticated according to localStorage
        setLoading(false);
      }
    }, [router]);

    // Show loading state while checking authentication
    if (loading) {
      return <Loader />;
    }

    // Only render the protected component if user is authenticated
    return <Component />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
