import { renderHook, act } from "@testing-library/react";
import useMutation from "./useMutation";
import { useAuthContext } from "../contexts/AuthContainer";
import { handleErrors } from "../helpers/api";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("../contexts/AuthContainer");
jest.mock("../helpers/api");

describe("useMutation", () => {
  beforeEach(() => {
    fetch.resetMocks();
    useAuthContext.mockReturnValue({ user: { token: "dummy-token" } });
    handleErrors.mockImplementation(async (response) => {
      if (!response.ok) throw new Error("Fetch failed");
      return response.json();
    });
  });

  test("initial state", () => {
    const { result } = renderHook(() => useMutation());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  test("successful mutation", async () => {
    const mockData = { success: true };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const { result } = renderHook(() => useMutation());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("test-url", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer dummy-token",
      },
      body: "{}",
    });
  });

  test("mutation with error", async () => {
    fetch.mockRejectOnce(new Error("Fetch failed"));

    const { result } = renderHook(() => useMutation());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Error: Fetch failed");
  });

  test("mutation with onSuccess callback", async () => {
    const mockData = { success: true };
    fetch.mockResponseOnce(JSON.stringify(mockData));
    const onSuccess = jest.fn();

    const { result } = renderHook(() => useMutation());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(onSuccess).toHaveBeenCalledWith(mockData);
  });

  test("mutation with onError callback", async () => {
    const mockError = new Error("Fetch failed");
    fetch.mockRejectOnce(mockError);
    const onError = jest.fn();

    const { result } = renderHook(() => useMutation());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(onError).toHaveBeenCalledWith(mockError);
  });
});
