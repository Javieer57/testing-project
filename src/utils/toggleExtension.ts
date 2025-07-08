import type { Extension } from "../types/extension";

export const toggleExtension = (
  extensions: Extension[],
  name: string
): Extension[] => {
  return extensions.map((ext) =>
    ext.name === name ? { ...ext, isActive: !ext.isActive } : ext
  );
};
