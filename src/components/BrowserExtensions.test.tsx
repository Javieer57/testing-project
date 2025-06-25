import { render, screen, within } from "@testing-library/react";
import data from "../mock/data.json";
import { BrowserExtensions } from "./BrowserExtensions";
import userEvent from "@testing-library/user-event";

describe("BrowserExtensions", () => {
  it("should render correct title", () => {
    render(<BrowserExtensions />);
    // testing library priority recommendations:
    // https://testing-library.com/docs/queries/about#priority
    const heading = screen.getByRole("heading", { level: 1 });

    // using a RegExp matchs the exact content, otherwise
    // "Extensions Listasdfad" would pass the test.
    // https://github.com/testing-library/jest-dom?tab=readme-ov-file#tohavetextcontent
    expect(heading).toHaveTextContent(/^Extensions List$/);
  });

  it("should render the list of all extensions", () => {
    render(<BrowserExtensions />);
    const list = screen.getByRole("list");
    const items = screen.getAllByRole("listitem");

    expect(list).toBeInTheDocument();
    expect(items).toHaveLength(data.length);

    data.forEach((ext) => {
      expect(screen.getByText(ext.name)).toBeInTheDocument();
    });
  });
});

describe("Filters", () => {
  it("should filter active extensions", async () => {
    const user = userEvent.setup();
    render(<BrowserExtensions />);

    const button = screen.getByRole("button", { name: /^active$/i });
    await user.click(button);

    const items = screen.getAllByRole("listitem");

    items.forEach((item) => {
      const switchButton = within(item).getByRole("switch");
      expect(switchButton).toHaveAttribute("aria-checked", "true");
    });
    expect(items).toHaveLength(data.filter((ext) => ext.isActive).length);
  });

  it("should filter inactive extensions", async () => {
    const user = userEvent.setup();
    render(<BrowserExtensions />);

    const button = screen.getByRole("button", { name: /^inactive$/i });
    await user.click(button);

    const items = screen.getAllByRole("listitem");

    items.forEach((item) => {
      const switchButton = within(item).getByRole("switch");
      expect(switchButton).toHaveAttribute("aria-checked", "false");
    });
    expect(items).toHaveLength(data.filter((ext) => !ext.isActive).length);
  });

  it("should show inactive extensions after filter the active ones", async () => {
    const user = userEvent.setup();
    render(<BrowserExtensions />);

    const inactiveButton = screen.getByRole("button", { name: /^inactive$/i });
    await user.click(inactiveButton);

    const activeButton = screen.getByRole("button", { name: /^active$/i });
    await user.click(activeButton);

    const items = screen.getAllByRole("listitem");

    items.forEach((item) => {
      const switchButton = within(item).getByRole("switch");
      expect(switchButton).toHaveAttribute("aria-checked", "true");
    });

    expect(items).toHaveLength(data.filter((ext) => ext.isActive).length);
  });

  it("should show all extensions again", async () => {
    const user = userEvent.setup();
    render(<BrowserExtensions />);

    const initialItemsLenght = screen.getAllByRole("listitem").length;

    const activeFilterButton = screen.getByRole("button", {
      name: /^active$/i,
    });
    await user.click(activeFilterButton);

    const allFilterButton = screen.getByRole("button", { name: /^all$/i });
    await user.click(allFilterButton);

    const finalItemsLength = screen.getAllByRole("listitem").length;

    expect(initialItemsLenght).toBe(finalItemsLength);
  });
});
