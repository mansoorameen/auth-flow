import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (register(username, password)) {
      toast.success("Registration Success. Please login");
      router.push("/login");
    } else {
      toast.error("User already exists");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded border border-gray-300 shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600">REGISTER</h2>

        <div className="w-full mb-4 flex flex-col">
          <label htmlFor="username" className="text-gray-700 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full mb-4 flex flex-col">
          <label htmlFor="password" className="text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Register
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already registered? </span>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
