import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const { user } = useAuth(); // Get the current user from AuthContext
  const router = useRouter();

  console.log("hmm", user);

  useEffect(() => {
    // Redirect to the dashboard if the user is logged in
    if (user) {
      router.push("/dashboard");
    } else {
      // Redirect to the login page if the user is not logged in
      router.push("/login");
    }
  }, [user, router]);

  // Render a loading spinner or nothing while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg">Loading...</p>
    </div>
  );
}
