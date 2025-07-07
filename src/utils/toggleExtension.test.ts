import { toggleExtension } from "./toggleExtension";
import data from "../mock/data.json";

it("toggles the isActive status of the correct extension", () => {
  const original = data[0];
  const updatedList = toggleExtension(data, original.name);

  const updated = updatedList.find((e) => e.name === original.name);
  expect(updated?.isActive).toBe(!original.isActive);

  const unchanged = updatedList.filter((e) => e.name !== original.name);
  unchanged.forEach((e, i) => {
    expect(e.isActive).toBe(data[i + 1].isActive);
  });
});
