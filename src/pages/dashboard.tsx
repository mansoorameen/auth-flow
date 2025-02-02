import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Dashboard() {
  const { user, logout, users } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
        {user.username === "admin" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Registered Users</h2>
            <ul>
              {users.map((u, index) => (
                <li key={index} className="mb-2">
                  {u.username}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={logout}
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
