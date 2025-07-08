import type { Extension } from "../types/extension";

export const removeExtension = (
  extensions: Extension[],
  name: string,
): Extension[] => {
  return extensions.filter((ext) => ext.name !== name);
};
