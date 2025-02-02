import { useState } from "react";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">REGISTER</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already registered? </span>
          <button
            type="button"
            onClick={() => router.push("/login")} // Replace with your registration route
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
