import { render, screen } from "@testing-library/react";

const BrowserExtensions = () => {
  return <h1>Extensions List</h1>;
};

describe("BrowserExtensions", () => {
  it("should render", () => {
    render(<BrowserExtensions />);
  });

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
});
