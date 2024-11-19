import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AuthContainer, { useAuthContext } from "./AuthContainer";

beforeEach(() => {
  fetch.resetMocks();
  localStorage.getItem.mockClear();
  localStorage.setItem.mockClear();
  localStorage.removeItem.mockClear();
  localStorage.clear.mockClear();
});

const MockComponent = () => {
  const { user, logout, login } = useAuthContext();
  return (
    <div>
      <div data-testid="user">{JSON.stringify(user)}</div>
      <button onClick={() => login({ id: 1, name: "Test User" })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthContainer", () => {
  it("should initialize with default values", () => {
    localStorage.getItem.mockReturnValueOnce(null);

    render(
      <AuthContainer>
        <MockComponent />
      </AuthContainer>
    );

    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(localStorage.getItem).toHaveBeenCalledWith("LOGGEDIN_USER");
  });

  it("should fetch and update user data", async () => {
    const user = { id: 1, name: "Test User" };
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(user));
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: "Updated User" }),
    });

    render(
      <AuthContainer>
        <MockComponent />
      </AuthContainer>
    );

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe(
        JSON.stringify({ id: 1, name: "Updated User" })
      )
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle login and logout", async () => {
    render(
      <AuthContainer>
        <MockComponent />
      </AuthContainer>
    );

    // Perform login
    screen.getByText("Login").click();
    expect(screen.getByTestId("user").textContent).toBe(
      JSON.stringify({ id: 1, name: "Test User" })
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "LOGGEDIN_USER",
      JSON.stringify({ id: 1, name: "Test User" })
    );

    // Perform logout
    screen.getByText("Logout").click();
    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(localStorage.removeItem).toHaveBeenCalledWith("LOGGEDIN_USER");
  });

  it("should clear interval on logout", async () => {
    jest.useFakeTimers();

    const user = { id: 1, name: "Test User" };
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(user));

    render(
      <AuthContainer>
        <MockComponent />
      </AuthContainer>
    );

    // Perform logout
    screen.getByText("Logout").click();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(clearInterval).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
