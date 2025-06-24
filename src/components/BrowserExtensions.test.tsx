import { render, screen, within } from "@testing-library/react";
import data from "../mock/data.json";

type Extension = {
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

type Props = {
  extensions: Extension[];
};

const BrowserExtensions = ({ extensions }: Props) => {
  return (
    <>
      <h1>Extensions List</h1>

      <ul>
        {extensions.map((ext) => (
          <li key={ext.name}>
            <img src={ext.logo} alt={`${ext.name} logo`} />
            {ext.name}
          </li>
        ))}
      </ul>
    </>
  );
};

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

  it("should shows each extension's logo", () => {
    render(<BrowserExtensions extensions={data} />);

    const items = screen.getAllByRole("listitem");

    items.forEach((item, index) => {
      const { name, logo } = data[index];

      // 'within' lets you be more specific on which
      // node are you searching:
      // https://testing-library.com/docs/dom-testing-library/api-within/
      const img = within(item).getByRole("img");

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", logo);
      expect(img).toHaveAttribute("alt", `${name} logo`);
    });
  });
});
