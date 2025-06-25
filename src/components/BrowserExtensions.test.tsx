import { render, screen } from "@testing-library/react";
import data from "../mock/data.json";
import { BrowserExtensions } from "./BrowserExtensions";

describe("BrowserExtensions", () => {
  it("should render correct title", () => {
    render(<BrowserExtensions extensions={data} />);
    // testing library priority recommendations:
    // https://testing-library.com/docs/queries/about#priority
    const heading = screen.getByRole("heading", { level: 1 });

    // using a RegExp matchs the exact content, otherwise
    // "Extensions Listasdfad" would pass the test.
    // https://github.com/testing-library/jest-dom?tab=readme-ov-file#tohavetextcontent
    expect(heading).toHaveTextContent(/^Extensions List$/);
  });

  it("should render the list of extensions", () => {
    render(<BrowserExtensions extensions={data} />);
    const list = screen.getByRole("list");
    const items = screen.getAllByRole("listitem");

    expect(list).toBeInTheDocument();
    expect(items).toHaveLength(data.length);

    data.forEach((ext) => {
      expect(screen.getByText(ext.name)).toBeInTheDocument();
    });
  });
});
