import { useState } from "react";
import { ExtensionCard } from "./ExtensionCard";
import data from "../mock/data.json";

export const BrowserExtensions = () => {
  const [extensions, setExtensions] = useState([...data]);
  const [extensionStatusFilter, setExtensionStatusFilter] = useState<
    "all" | boolean
  >("all");

  return (
    <>
      <div>
        <h1>Extensions List</h1>

        <div>
          <button onClick={() => setExtensionStatusFilter("all")}>All</button>
          <button onClick={() => setExtensionStatusFilter(true)}>Active</button>
          <button onClick={() => setExtensionStatusFilter(false)}>
            Inactive
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-3.5">
        {extensions
          .filter(
            (ext) =>
              extensionStatusFilter === ext.isActive ||
              extensionStatusFilter === "all"
          )
          .map((ext) => (
            <ExtensionCard key={ext.name} extension={ext} />
          ))}
      </ul>
    </>
  );
};
