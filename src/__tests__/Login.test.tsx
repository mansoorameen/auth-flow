import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Login from "@/pages/login";
import toast from "react-hot-toast";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn((username: string, password: string) => {
      if (username === "admin" && password === "admin") {
        return true; // Valid credentials
      }
      return false; // Invalid credentials
    }),
  }),
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

describe("Login", () => {
  it("should display an error for invalid credentials", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<Login />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
  });

  it("should redirect to dashboard on successful login", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<Login />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });
});
