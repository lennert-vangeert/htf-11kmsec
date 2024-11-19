import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import ProductProvider, { useProducts } from "./ProductContext";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

const MockComponent = () => {
  const { productData, isLoading, errors } = useProducts();
  return (
    <div>
      <div data-testid="productData">{JSON.stringify(productData)}</div>
      <div data-testid="isLoading">{isLoading ? "true" : "false"}</div>
      <div data-testid="errors">{errors ? errors.toString() : "false"}</div>
    </div>
  );
};

describe("ProductProvider", () => {
  it("should initialize with default values", () => {
    render(
      <ProductProvider>
        <MockComponent />
      </ProductProvider>
    );
    expect(screen.getByTestId("productData").textContent).toBe("[]");
    expect(screen.getByTestId("isLoading").textContent).toBe("false");
    expect(screen.getByTestId("errors").textContent).toBe("false");
  });

  it("should fetch products and update state", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(
      <ProductProvider>
        <MockComponent />
      </ProductProvider>
    );

    expect(screen.getByTestId("isLoading").textContent).toBe("true");

    await waitFor(() =>
      expect(screen.getByTestId("productData").textContent).toBe(
        JSON.stringify(mockProducts)
      )
    );
    expect(screen.getByTestId("isLoading").textContent).toBe("false");
    expect(screen.getByTestId("errors").textContent).toBe("false");
  });

  it("should handle fetch errors", async () => {
    const mockError = new Error("Failed to fetch");
    fetch.mockRejectedValueOnce(mockError);

    render(
      <ProductProvider>
        <MockComponent />
      </ProductProvider>
    );

    expect(screen.getByTestId("isLoading").textContent).toBe("true");

    await waitFor(() =>
      expect(screen.getByTestId("errors").textContent).toBe(
        mockError.toString()
      )
    );
    expect(screen.getByTestId("isLoading").textContent).toBe("false");
    expect(screen.getByTestId("productData").textContent).toBe("[]");
  });
});
