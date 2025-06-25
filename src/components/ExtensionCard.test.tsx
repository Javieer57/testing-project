import { ExtensionCard } from "./ExtensionCard";
import data from "../mock/data.json";
import { render, screen, within } from "@testing-library/react";

describe("ExtensionCard", () => {
  it("should shows each extension's logo", () => {
    render(<ExtensionCard extension={data[0]} />);

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
