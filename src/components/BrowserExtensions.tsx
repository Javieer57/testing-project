import { useState } from "react";
import { ExtensionCard } from "./ExtensionCard";
import data from "../mock/data.json";

export const BrowserExtensions = () => {
  const [filteredExtensions, setFilteredExtensions] = useState([...data]);

  return (
    <>
      <div>
        <h1>Extensions List</h1>

        <div>
          <button onClick={() => setFilteredExtensions([...data])}>All</button>
          <button
            onClick={() =>
              setFilteredExtensions(data.filter((ext) => ext.isActive))
            }
          >
            Active
          </button>
          <button
            onClick={() =>
              setFilteredExtensions(data.filter((ext) => !ext.isActive))
            }
          >
            Inactive
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-3.5">
        {filteredExtensions.map((ext) => (
          <ExtensionCard key={ext.name} extension={ext} />
        ))}
      </ul>
    </>
  );
};
