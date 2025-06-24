import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import InitialViteComponent from "./InitialViteComponent";

describe("InitialViteComponent", () => {
  it("should display the Vite and React logos", () => {
    render(<InitialViteComponent />);
    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();
  });

  it("should display the main title", () => {
    render(<InitialViteComponent />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });

  it("should display the button with the initial counter", () => {
    render(<InitialViteComponent />);
    expect(screen.getByRole("button")).toHaveTextContent("count is 0");
  });

  it("should increment the counter when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<InitialViteComponent />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(button).toHaveTextContent("count is 1");
  });
});
