import { useState } from "react";
import type { Extension } from "../types/extension";
import { ExtensionCard } from "./ExtensionCard";
import data from "../mock/data.json";

export type Props = {
  extensions: Extension[];
};

export const BrowserExtensions = () => {
  const [extensions, setExtensions] = useState([...data]);
  const [filteredExtensions, setFilteredExtensions] = useState(extensions);

  return (
    <>
      <div>
        <h1>Extensions List</h1>

        <div>
          <button onClick={() => setFilteredExtensions(extensions)}>All</button>
          <button
            onClick={() =>
              setFilteredExtensions(extensions.filter((ext) => ext.isActive))
            }
          >
            Active
          </button>
          <button
            onClick={() =>
              setFilteredExtensions(extensions.filter((ext) => !ext.isActive))
            }
          >
            Inactive
          </button>
        </div>
      </div>

      <ul>
        {filteredExtensions.map((ext) => (
          <ExtensionCard key={ext.name} extension={ext} />
        ))}
      </ul>
    </>
  );
};
