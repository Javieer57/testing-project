import { useState } from "react";
import { ExtensionCard } from "./ExtensionCard";
import data from "../mock/data.json";
import { toggleExtension } from "../utils/toggleExtension";

export const BrowserExtensions = () => {
  const [extensions, setExtensions] = useState([...data]);
  const [extensionStatusFilter, setExtensionStatusFilter] = useState<
    "all" | boolean
  >("all");

  const handleToggle = (name: string) => {
    setExtensions((prev) => toggleExtension(prev, name));
  };

  return (
    <main className="mx-auto grid max-w-[75.625rem] gap-9 px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-[2rem] font-bold">Extensions List</h1>

        <div className="flex gap-2.5">
          <button
            className="pill-button"
            onClick={() => setExtensionStatusFilter("all")}
          >
            All
          </button>
          <button
            className="pill-button"
            onClick={() => setExtensionStatusFilter(true)}
          >
            Active
          </button>
          <button
            className="pill-button"
            onClick={() => setExtensionStatusFilter(false)}
          >
            Inactive
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-3.5">
        {extensions
          .filter(
            (ext) =>
              extensionStatusFilter === ext.isActive ||
              extensionStatusFilter === "all",
          )
          .map((ext) => (
            <ExtensionCard
              key={ext.name}
              extension={ext}
              onToggle={handleToggle}
            />
          ))}
      </ul>
    </main>
  );
};
