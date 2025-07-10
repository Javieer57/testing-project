// ThemeBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeBar } from "./ThemeBar";

describe("ThemeBar", () => {
  beforeEach(() => {
    // Limpia estado entre pruebas
    document.documentElement.classList.remove("dark");
    localStorage.clear();
    vi.resetAllMocks();
  });

  it("aplica el tema 'dark' si localStorage.theme es 'dark'", () => {
    localStorage.theme = "dark";

    render(<ThemeBar />);

    const button = screen.getByRole("button");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(button.textContent).toBe("Change to light mode");
  });

  it("usa prefers-color-scheme si no hay localStorage", () => {
    vi.spyOn(window, "matchMedia").mockReturnValueOnce({
      matches: true,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);

    render(<ThemeBar />);
    const button = screen.getByRole("button");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(button.textContent).toBe("Change to light mode");
  });

  it("al hacer clic, cambia a tema 'dark' y actualiza el botón", () => {
    localStorage.theme = "";

    render(<ThemeBar />);

    const button = screen.getByRole("button");
    expect(button.textContent).toBe("Change to dark mode");

    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(button.textContent).toBe("Change to light mode");
    expect(localStorage.theme).toBe("dark");
  });

  it("al hacer clic en tema 'dark', cambia a claro", () => {
    localStorage.theme = "dark";

    render(<ThemeBar />);
    const button = screen.getByRole("button");

    expect(button.textContent).toBe("Change to light mode");

    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(button.textContent).toBe("Change to dark mode");
    expect(localStorage.theme).toBe("");
  });
});
