import { renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key: string) => store[key]),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("AuthContext", () => {
  const mockRouter = {
    push: jest.fn(),
    isReady: true,
    route: "/",
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  it("should redirect to /dashboard if user is in localStorage", async () => {
    const mockUser = { username: "admin", password: "admin" };
    localStorage.setItem("user", JSON.stringify(mockUser));

    renderHook(() => useAuth(), {
      wrapper,
    });

    // await act(async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 0));
    // });

    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });

  it("should redirect to /login if no user is in localStorage", async () => {
    localStorageMock.clear();

    renderHook(() => useAuth(), { wrapper });

    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });
});
