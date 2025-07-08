import data from "../mock/data.json";
import { removeExtension } from "./removeExtension";

it("remove extension from the array", () => {
  const original = [...data];
  const toRemove = original[0];

  const result = removeExtension(original, toRemove.name);

  expect(result.find((ext) => ext.name === toRemove.name)).toBeUndefined();
});
