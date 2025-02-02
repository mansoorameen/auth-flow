import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

describe("AuthContext", () => {
  it("should register a new user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register("testuser", "testpassword");
    });

    expect(result.current.users).toContainEqual({
      username: "testuser",
      password: "testpassword",
    });
  });

  it("should not allow duplicate users to register", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register("testuser", "testpassword");
    });

    const duplicateRegistration = result.current.register(
      "testuser",
      "testpassword"
    );
    expect(duplicateRegistration).toBe(false);
  });

  it("should log in a user with valid credentials", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register("testuser", "testpassword");
      result.current.login("testuser", "testpassword");
    });

    expect(result.current.user).toEqual({
      username: "testuser",
      password: "testpassword",
    });
  });

  it("should not log in a user with invalid credentials", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register("testuser", "testpassword");
      const loginResult = result.current.login("wronguser", "wrongpassword");
      expect(loginResult).toBe(false);
    });

    expect(result.current.user).toBeNull();
  });

  it("should log out a user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    act(() => {
      result.current.register("testuser", "testpassword");
      result.current.login("testuser", "testpassword");
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});
