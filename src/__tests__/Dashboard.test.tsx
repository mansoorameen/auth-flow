import { render, screen } from "@testing-library/react";
import Dashboard from "@/pages/dashboard";

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: { username: "testuser" },
    logout: jest.fn(),
    users: [{ username: "testuser" }, { username: "admin" }],
  }),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Dashboard", () => {
  it("should display welcome message for logged-in user", () => {
    render(<Dashboard />);

    expect(screen.getByText("Welcome, testuser!")).toBeInTheDocument();
  });

  it("should display registered users for admin", () => {
    jest.spyOn(require("../context/AuthContext"), "useAuth").mockReturnValue({
      user: { username: "admin" },
      logout: jest.fn(),
      users: [{ username: "testuser" }, { username: "admin" }],
    });

    render(<Dashboard />);

    expect(screen.getByText("Registered Users")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });
});
