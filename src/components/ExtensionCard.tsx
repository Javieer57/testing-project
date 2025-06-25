import type { Extension } from "../types/extension";

export const ExtensionCard = ({ extension }: { extension: Extension }) => {
  return (
    <li>
      <img src={extension.logo} alt={`${extension.name} logo`} />
      {extension.name}
    </li>
  );
};
