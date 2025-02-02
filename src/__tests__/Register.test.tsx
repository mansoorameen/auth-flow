import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Register from "@/pages/register";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  error: jest.fn(), // Mock toast.error
  success: jest.fn(), // Mock toast.success
}));

describe("Register", () => {
  it("should display an error for duplicate username", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock register to return false for an existing user
    const mockRegister = jest.fn().mockReturnValue(false);
    (useAuth as jest.Mock).mockReturnValue({ register: mockRegister });

    render(<Register />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByText("Register"));

    expect(toast.error).toHaveBeenCalledWith("User already exists");
  });

  it("should redirect to login on successful registration", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock register to return true for successful registration
    const mockRegister = jest.fn().mockReturnValue(true);
    (useAuth as jest.Mock).mockReturnValue({ register: mockRegister });
    render(<Register />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.click(screen.getByText("Register"));

    expect(mockPush).toHaveBeenCalledWith("/login");
    expect(toast.success).toHaveBeenCalledWith(
      "Registration Success. Please login"
    );
  });
});
