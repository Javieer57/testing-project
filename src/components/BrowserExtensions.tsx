import type { Extension } from "../types/extension";
import { ExtensionCard } from "./ExtensionCard";

export type Props = {
  extensions: Extension[];
};

export const BrowserExtensions = ({ extensions }: Props) => {
  return (
    <>
      <h1>Extensions List</h1>

      <ul>
        {extensions.map((ext) => (
          <ExtensionCard key={ext.name} extension={ext} />
        ))}
      </ul>
    </>
  );
};
