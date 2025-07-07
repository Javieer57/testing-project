import { ExtensionCard } from "./ExtensionCard";
import data from "../mock/data.json";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("ExtensionCard", () => {
  const extension = data[0];
  const mockToggle = vi.fn();

  beforeEach(() => {
    render(<ExtensionCard extension={extension} onToggle={mockToggle} />);
  });

  it("should shows extension's logo", () => {
    const { name, logo } = extension;

    // 'within' lets you be more specific on which
    // node are you searching:
    // https://testing-library.com/docs/dom-testing-library/api-within/
    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();

    // toHaveAttribute vs getAttribute
    // 'toHaveAttribute' validates that the attribute was rendered
    // 'getAttribute' could not be rendered with 'undefined' or 'null'
    expect(img).toHaveAttribute("src", logo);
    expect(img).toHaveAttribute("alt", `${name} logo`);

    // expect(img.getAttribute("src")).toBe(logo);
    // expect(img.getAttribute("alt")).toBe(`${name} logo`);
  });

  it("should shows extension's description", () => {
    const { description } = extension;
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should shows 'remove' button", () => {
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
  });

  it("should shows active/inactive switch button", () => {
    const switchButton = screen.getByRole("switch");

    expect(switchButton).toBeInTheDocument();

    // toHaveAttribute vs getAttribute
    // 'toHaveAttribute' validates that the attribute was rendered
    // 'getAttribute' could not be rendered with 'undefined' or 'null'
    expect(switchButton).toHaveAttribute(
      "aria-checked",
      extension.isActive ? "true" : "false"
    );
  });

  it("calls onToggle when switch is clicked", async () => {
    const user = userEvent.setup();
    const switchButton = screen.getByRole("switch");

    await user.click(switchButton);

    expect(mockToggle).toHaveBeenCalledWith(extension.name);
  });
});
